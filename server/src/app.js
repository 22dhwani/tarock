require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const passport = require('passport');
const session = require('express-session');
// const csrf = require('csurf');

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true // allow session cookie from browser to pass through
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'zanetarock',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  // cookie: { httpOnly: true, secure: false }
}));

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(csrf());
// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   if ('OPTIONS' == req.method) {
//        res.send(200);
//    } else {
//        next();
//    }
// });

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
require("./api/routers/card")(app);

const authRouter = require('./auth/auth');
app.use('/', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});