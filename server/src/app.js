import './config/config.js';
import express from 'express';
import cors from "cors";
import path from 'path';
import passport from 'passport';
import session from 'express-session';
// import csurf from 'csurf';
import router from './auth/auth.js';
import assessment from './api/routers/assessment.js';
import credential from './api/routers/credential.js';
import user from './api/routers/user.js';
import result from './api/routers/result.js';
import card from './api/routers/card.js';
import match from './api/routers/match.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


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
const dir = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(dir, 'views'));
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

const publicPath = path.join(dir, '../public');
app.use(express.static(publicPath));
app.get("/", (req, res) => {
  res.sendFile(publicPath + '/index.html');
});

assessment(app);
credential(app);
user(app);
result(app);
card(app);
match(app);


app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});