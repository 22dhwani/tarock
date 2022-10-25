const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../api/models/db');

const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'email', 'profile' ],
    store: true // to store state data
  }, function verify(accessToken, refreshToken, profile, cb) {
    const user = {
      emails: profile._json.email,
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
  passport.authenticate('google', { state: { id: req.query.id, redirect: req.query.redirect } })(req, res)
});

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    failureRedirect: process.env['CLIENT_BASE_URL'] + '/signin'
  }), function(req, res) {
    const state = req.authInfo.state;
    res.redirect(decodeURIComponent(state.redirect));
  });

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("/login/success");
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.json({message: "signed out"});
    });
  });

module.exports = router;