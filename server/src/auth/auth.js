import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import crypto from 'crypto';

const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'email', 'profile' ],
    store: true // to store state data
  }, function verify(accessToken, refreshToken, profile, cb) {
    const user = {
      email: profile._json.email,
      name: profile.displayName
    };
    cb(null, user);
  }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', function(req, res) {
  passport.authenticate('google', { state: { id: req.query.id, redirect: req.query.redirect, type: req.query.type } })(req, res)
});

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    failureRedirect: process.env['CLIENT_BASE_URL'] + '/signin'
  }), function(req, res) {
    const state = req.authInfo.state;
    const email = req.user.email;
    const hash = crypto.createHash('md5').update(email).digest("hex");
    User.queryReal(hash, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else if (data.length == 0) {
        // No existing real user, create one.
        User.query(state.id, (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if (data.length > 0) {
              const user = new User({
                id: hash,
                email: email,
                name: data[0].name,
                gender: data[0].gender,
                avatarIndex: data[0].avatar_index
              });
              User.createReal(user, (err, data) => {
                if (err) {
                  res.status(400).send(err);
                } else {
                  User.createTmpIdToRealId(state.id, hash, (err, data) => {
                    if (err) {
                      res.status(400).send(err);
                    } else {
                      res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
                    }
                  }); 
                }
              });
            }
          }
        });
      } else {
        // Found existing real user, build connection.
        User.queryRealId(state.id, (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if (data.length > 0) {
              if (data[0].real_user_id != hash) {
                // Lastest connection needs to be updated.
                User.createTmpIdToRealId(state.id, hash, (err, data) => {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
                  }
                });
              } else {
                res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
              }
            } else {
              res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
            }
          }
        });
      }
    });
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


export default router;