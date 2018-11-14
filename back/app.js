//REQUIREMENTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

//MODELS & SYNC
// const User = require('./db/models/User');
const db = require('./db/index');
db.sync({force : false});


//APP
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(session({ secret: "dogs" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../front/dist')));
console.log(path.join(__dirname, '../front/dist'))
// app.use(express.static('../front/dist'));
// app.use(express.static(path.resolve(__dirname,'/../front/dist')));

//ROUTERS
// const userRouter = require('./routes/userRouter');


//ROUTES

// app.use('/api/user', userRouter);


app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

//PASSPORT
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(username, password, done) {
    User.findOne({ where: { email: username }})
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.passwordHash(password, user.salt) != user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');