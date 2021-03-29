var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressSession = require('express-session');



var app = express();


app.disable('x-powerd-by');

const sessionStore = new expressSession.MemoryStore();
const session = expressSession({
  store: sessionStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  proxy: false,
  cookie: {
    secure: false,
    httpOnly: true,
    rolling: true,
    maxAge: 3600000,
  },
});
app.use(session);





// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
  limit: '10mb',
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




var indexRouter = require('./routes');
app.use('/', indexRouter);
// var usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
  res.render('error', {
    param: {
      status: 404,
      url: req.url,
      message: 'not found',
    },
  });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403);
    res.json(err);
    return;
  }
  if (req.method !== 'GET' || /\/api\.*/.test(req.url)) {
    res.status(500 || err.status);
    res.json(err);
    return;
  }
  // render the error page
  // res.status(err.status || 500);
  res.render('error');
});

module.exports = app;