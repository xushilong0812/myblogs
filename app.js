var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/article');

var app = express();
//导入session
var session = require('express-session')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'userInfo',//自己的session 名
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*2 }//存储多长时间
}))
app.get('*',function(req,res, next){
  var username=req.session.username
  var path=req.path
  if(path!='/login'&&path!='/regist'){
    if(!username){
      res.redirect('/login')
    }
  }
  next()
})
app.use
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',articlesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//设置 session
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
