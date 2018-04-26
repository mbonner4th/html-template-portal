var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var session =  require("client-sessions");

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth.js');
var editUser = require('./routes/edit-user.js');
var editPage = require('./routes/edit-page.js');
var content = require('./routes/content.js');
var adminpanel = require('./routes/admin-panel.js')

var userModel = require('./models/user');

// var requireLogin = require('./utils/auth').requireLogin;

var app = express();

var mongoose = require('mongoose');
var urlString = process.env.MONGODB_URI || 'mongodb://127.0.0.1/site';

console.log("DB sitting at:", urlString);
mongoose.connect(urlString, {useMongoClient:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// client-sessions middle ware

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 10000,
  activeDuration: 5 * 60 * 100000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    userModel.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user.toObject();
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// uncomment after placing; your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//https://stackoverflow.com/questions/29357305/nodejs-express-include-local-js-file
app.use(express.static(path.join(__dirname, 'node_modules/jsoneditor/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/clipboard/dist')));
app.use(express.static(path.join(__dirname, 'public')));



//Checks if user is logged in
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/auth');
  } else {
    next();
  }
};

app.use('/users', users);
app.use('/auth', auth);
app.use('/edit-user', requireLogin, editUser);
app.use('/edit-page', requireLogin, editPage);

app.use('/admin-panel', requireLogin, adminpanel);
app.use('/', content);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
