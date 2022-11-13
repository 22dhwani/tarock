import * as dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import authRouter from './auth/auth';
// import csurf from 'csurf';
import assessment from './api/routers/assessment';
import credential from './api/routers/credential';
import user from './api/routers/user';
import result from './api/routers/result';
import card from './api/routers/card';
import match from './api/routers/match';


dotenv.config();
const app = express();
const corsOptions = {
  origin: process.env['CLIENT_BASE_URL'],
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

assessment(app);
credential(app);
user(app);
result(app);
card(app);
match(app);


app.use('/', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});