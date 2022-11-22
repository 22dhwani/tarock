import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import crypto from 'crypto';
import express from 'express';
import User from '../api/models/user.js' ;
import Result from '../api/models/result.js';
import EmailValidator from 'email-validator';
import LocalStrategy from 'passport-local';
import user from '../api/routers/user.js';

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
    return cb(null, realUsers[0]);
  } catch (error) {
    return cb(error);
  }
}));

router.post('/login',passport.authenticate('local',{
  //successRedirect: process.env['CLIENT_BASE_URL'] + decodeURIComponent('/home'),
  //failureRedirect: process.env['CLIENT_BASE_URL'] + decodeURIComponent('/login'),
  failureMessage: true
}), function(req, res, next) {
  res.status(200).json(req.user);
});

//Apply transaction in the future
router.post('/register', async function(req, res, next) {
  try {
    const state = req.body.state;
    const email = req.body.email;
    const password = req.body.password;
    const hashEmail = crypto.createHash('md5').update(email).digest("hex");
    const hashPassword = crypto.createHash('md5').update(password).digest('hex');

    if (!EmailValidator.validate(email)) {
      res.status(400).json({error_msg: "Please enter a valid email"});
      return;
    }
    if (password.length < 6 || password.length > 20) {
      res.status(400).json({error_msg: "Please enter a valid password, length withing 6 or 20"});
      return;
    }
    const realUsers = await User.queryReal(hashEmail);
    if (realUsers.length > 0) {
      res.status(400).json({error_msg: "Email already in use"});
      return;
    }

    const queryPromises = [];

    const tempUsers = await User.query(state.id);
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

    const oldResults = await Result.getByUser(state.id);
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

    const updateIsPermanentUserPromise = User.updateIsPermanentUser(state.id, 1);
    queryPromises.push(updateIsPermanentUserPromise);
    //Waiting parrllely
    await Promise.all(queryPromises);

    req.login({id: hashEmail, email: email}, function(err) {
      if (err) { 
        return next(err); 
      }
      res.status(200).send("Signup Successfully");
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
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
        const data1 = await User.query(state.id);
        if (data1.length > 0) {
          // Copy info from tmp_user.
          const user = new User.User({
            id: hash,
            email: email,
            password: null,
            name: data1[0].name,
            gender: data1[0].gender,
            avatarIndex: data1[0].avatar_index
          });
          await User.createReal(user);
        }
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