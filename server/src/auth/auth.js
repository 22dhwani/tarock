import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import crypto from 'crypto';
import express from 'express';
import User from '../api/models/user.js' ;

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
    })
);

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
  }), async function(req, res) {
    const state = req.authInfo.state;
    const email = req.user.email;
    const hash = crypto.createHash('md5').update(email).digest("hex");
    try {
      const data = await User.queryReal(hash);
      if (data.length == 0) {
        const data1 = await User.query(state.id);
        if (data1.length > 0) {
          const user = new User({
            id: hash,
            email: email,
            name: data1[0].name,
            gender: data1[0].gender,
            avatarIndex: data1[0].avatar_index
          });
          await User.createReal(user);
          await User.createTmpIdToRealId(state.id, hash);
          res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));     
        }
    
      } else {
        // Found existing real user, build connection.
        const data2 = await User.queryRealId(state.id);
        if (data2.length == 0 || data2[0].real_user_id != hash) {
          // Lastest connection needs to be updated.
          await User.createTmpIdToRealId(state.id, hash);
          res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
        } else {
          res.redirect(process.env['CLIENT_BASE_URL'] + decodeURIComponent(state.redirect));
        }
      }
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

export default router;