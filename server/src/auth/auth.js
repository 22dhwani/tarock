import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import crypto from 'crypto';
import express from 'express';
import User from '../api/models/user.js' ;
import Result from '../api/models/result.js';
import EmailValidator from 'email-validator';
import LocalStrategy from 'passport-local';
import nodemailer from 'nodemailer';

const router = express.Router();

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});

passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
})

passport.use(new LocalStrategy.Strategy({usernameField: 'email', session: true}, async function verify(email, password, cb) {
  try {
    const hashEmail = crypto.createHash('md5').update(email).digest("hex");
    const hashPassword = crypto.createHash('md5').update(password).digest('hex');
    const realUsers = await User.queryReal(hashEmail);
    if (realUsers.length == 0) {
      return cb(null, false, {message: 'Username not found.'});
    }
    if (realUsers[0].password != hashPassword) {
      return cb(null, false, {error_msg: "Password incorrect."});
    }
    const user = {
      email: realUsers[0].email,
      name: realUsers[0].name,
      id: hashEmail
    }
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}));

router.post('/login',passport.authenticate('local',{
  failureMessage: true
}), function(req, res, next) {
  res.status(200).json(req.user);
});

//Apply transaction in the future
router.post('/register', async function(req, res, next) {
  try {
    const tempId = req.body.tempId;
    const email = req.body.email;
    const password = req.body.password;
    const hashEmail = crypto.createHash('md5').update(email).digest("hex");
    const hashPassword = crypto.createHash('md5').update(password).digest('hex');

    if (!EmailValidator.validate(email)) {
      res.status(400).json({error_msg: "Please enter a valid email"});
      return;
    }
    if (password.length < 6 || password.length > 20) {
      res.status(400).json({error_msg: "Please enter a valid password, length within 6 to 20"});
      return;
    }
    const realUsers = await User.queryReal(hashEmail);
    if (realUsers.length > 0) {
      res.status(400).json({error_msg: "Email already in use"});
      return;
    }

    const queryPromises = [];

    const tempUsers = await User.query(tempId);
    if (tempUsers.length > 0) {
      const user = new User.User({
        id: hashEmail,
        email: email,
        password: hashPassword,
        name: tempUsers[0].name,
        gender: tempUsers[0].gender,
        avatarIndex: tempUsers[0].avatar_index
      });
      const createRealPromise = User.createReal(user);
      queryPromises.push(createRealPromise);
    } else {
      res.status(400).json({error_msg: "User info does not exist"});
      return;      
    }

    const oldResults = await Result.getByUser(tempId);
    if (oldResults.length > 0) {
      const newResult = new Result.Result({
        userId: hashEmail,
        assessmentGroupId: oldResults[0].question_group_id,
        numOfQuestions: oldResults[0].num_of_questions,
        duration: oldResults[0].duration,
        code: oldResults[0].result_code
      });
      const createResultPromise = Result.create(newResult);
      queryPromises.push(createResultPromise);
    }

    const updateIsPermanentUserPromise = User.updateIsPermanentUser(tempId, 1);
    queryPromises.push(updateIsPermanentUserPromise);
    //Waiting parrllely
    await Promise.all(queryPromises);

    req.login({id: hashEmail, name: tempUsers[0].name, email: email}, function(err) {
      if (err) { 
        return next(err); 
      }
      res.status(200).json(
        {
          id: hashEmail
        }     
      );
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: (process.env['SERVER_BASE_URL'] ? process.env['SERVER_BASE_URL'] : '') + '/oauth2/redirect/google',
    scope: [ 'email', 'profile' ],
    store: true // to store state data
  }, function verify(accessToken, refreshToken, profile, cb) {
      const user = {
        email: profile._json.email,
        name: profile.displayName,
        id: crypto.createHash('md5').update(profile._json.email).digest("hex")
      };
      cb(null, user);
    })
);

router.get('/login/federated/google', function(req, res) {
  passport.authenticate('google', { state: { id: req.query.id, redirect: req.query.redirect, type: req.query.type } })(req, res)
});

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    failureRedirect: process.env['CLIENT_BASE_URL'] + '/signin'
  }), async function(req, res) {
    try {
      const state = req.authInfo.state;
      const email = req.user.email;
      const hash = crypto.createHash('md5').update(email).digest("hex");
      const data = await User.queryReal(hash);
      if (data.length == 0) {
        // User not found in database, create one.
        const user = new User.User({
          id: hash,
          email: email,
          password: null,
          name: req.user.name,
          gender: 'Other',
          avatarIndex: 2,
        });
        const data1 = await User.query(state.id);
        if (data1.length > 0) {
          // Copy info from tmp_user.
          user.name = data1[0].name;
          user.gender = data1[0].gender;
          user.avatarIndex = data1[0].avatar_index;
        }
        await User.createReal(user);
        // Copy test data.
        const data2 = await Result.getByUser(state.id);
        if (data2.length > 0) {
          const result = new Result.Result({
            userId: hash,
            assessmentGroupId: data2[0].question_group_id,
            numOfQuestions: data2[0].num_of_questions,
            duration: data2[0].duration,
            code: data2[0].result_code
          });
          await Result.create(result);
        }
      }
      // Update tmp user is_permanent_user.
      await User.updateIsPermanentUser(state.id, 1);
      res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));  
    } catch (error) {
      res.status(400).send(error);
    }
  });
  


// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.json({message: "signed out"});
    });
});


router.get('/password/forget', async (req, res) => {

  const email = req.query.email;
  if (!email) {
      res.status(400).json({
          err_msg: 'Please provide a valid email address.'
      })
  } else {
      const id = crypto.createHash('md5').update(email).digest("hex");
      const realUsers = await User.queryReal(id);

      const sender = {
        email: "account@tarock.me",
        password: "eqlhjrmaxiflsxjs"
      }

      if (realUsers.length !== 0) {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            auth: {
                user: sender.email,
                pass: sender.password
            }
          });

          const credential = realUsers[0].password;
          const url = process.env['SERVER_BASE_URL'] + `/password/form?id=${id}&credential=${credential}`;
        
          const mailOptions = {
              from: sender.email,
              to: email,
              subject: 'Your Tarock Password',
              html: `Hello, <b>${realUsers[0].name}</b> <div>Please follow the link to reset your password for ${email}</div> <div>${url}</div>`
          };
        
          transporter.sendMail(mailOptions);
          res.status(200).json({msg: `An email will be sent to ${email} within 5 mintues, please check your email box.`});
        
      } else {
          res.status(401).json({
              err_msg: 'The user does not exist.'
          })
      }        
  }
});

router.get('/password/form', async (req, res) => {

  const id = req.query.id;
  const credential = req.query.credential;
  if (!id || !credential) {
      res.status(400).json({
          err_msg: `Wrong parameters to reset password id:${id} credential:${credential}.`
      })
  } else {
      res.send(`
    <b>Please enter your new password</b>
    <br></br>
    <form id="f1" method="post">
      <div>
      <label>New Password</label>
      <input id="p1" type="password" name="password">
      </div>
      <div>
      <label>Re-type Password</label>
      <input id="p2" type="password">
      </div>
    </form>
    <div>
      <button type="submit" onclick="check()">Reset password</button>
    </div>
    <script>
        function check() {
          let p1 = document.getElementById("p1").value;
          let p2 = document.getElementById("p2").value;
          if (p1!==p2) {
            alert("Two passwords must be identical");
          } else if (p1.length < 6 || p1.length > 20) {
            alert("Please enter a valid password, length within 6 to 20");
          } else {
            document.getElementById("f1").submit(); 
            alert("Your password has been changed !!!");         
          }
        }
    </script>
    </div>
      `);
  }
});

router.post('/password/form', async (req, res) => {
  const id = req.query.id;
  const oldHashPassword = req.query.credential;
  const newPassword = req.body.password;
  if (!id || !oldHashPassword || !newPassword) {
      res.status(400).json({
          err_msg: `Wrong parameters to reset password email:${id} credential:${oldHashPassword} password:${newPassword}.`
      })
  } else {
    const realUsers = await User.queryReal(id);
    if (realUsers.length == 0) {
      res.status(401).json({
        err_msg: `The user ${id} does not exist to reset password.`
      });
    } else if (realUsers[0].password !== oldHashPassword) {
      res.status(401).json({
        err_msg: `The credential is not correct ${oldHashPassword}.`
      });      
    } else {
      const newHashPassword = crypto.createHash('md5').update(newPassword).digest("hex");
      await User.updateReal({id: id, password: newHashPassword});
      res.status(200).json({
        msg: `Password successfully reset!`
      });
    }
  }
});


/**
router.get('/test', function(req, res, next) {
  User.test();
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({message: "signed out"});
  });
  res.json({message: "Finish Clean Up"});
});
*/

export default router;