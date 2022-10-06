require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const passport = require('passport');
// const csrf = require('csurf');

const corsOptions = {
  origin: "*",
  credentials: true // allow session cookie from browser to pass through
};

app.use(session({
  secret: 'zanetarock',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(csrf());
// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use(passport.authenticate('session'));
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Welcome!' });
  } else {
    res.redirect('/login');
  }
});

require("./api/routers/assessment")(app);
require("./api/routers/credential")(app);
require("./api/routers/user")(app);
require("./api/routers/result")(app);

var authRouter = require('./auth/auth');
app.use('/', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});