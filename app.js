var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login_student = require('./routes/login_student');
var login_testsetter = require('./routes/login_testsetter');

var register_student = require('./routes/register_student');
var register_testsetter = require('./routes/register_testsetter');

var dashboard_student = require('./routes/dashboard_student');
var dashboard_testsetter = require('./routes/dashboard_testsetter');

var logout = require('./routes/logout');
var homepage = require('./routes/homepage');

var create = require('./routes/create');
var create_question = require('./routes/create_question');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login_student', login_student);
app.use('/login_testsetter', login_testsetter);

app.use('/register_student',register_student);
app.use('/register_testsetter',register_testsetter);

app.use('/dashboard_student',dashboard_student);
app.use('/dashboard_testsetter',dashboard_testsetter);

app.use('/create', create);
app.use('/create_question', create_question);

app.use('/logout', logout);
app.use('/',homepage);

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
