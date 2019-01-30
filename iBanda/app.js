var createError = require('http-errors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var mongoose = require('mongoose')
var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')

require('./autenticacao/aut')


var indexRouter = require('./routes')
var adminRouter = require('./routes/admin')
var adminAPIRouter = require('./routes/api/admin')
var produtorRouter = require('./routes/produtor')
var produtorAPIRouter = require('./routes/api/produtor')
var consumidorRouter = require('./routes/consumidor')
var consumidorAPIRouter = require('./routes/api/consumidor')



var app = express();

// Base de Dados (Falta editar conexão)

// Base de Dados (Falta editar conexão)
const config = {
  autoIndex: false,
  useNewUrlParser: true,
};

mongoose
  .connect('mongodb://127.0.0.1:27017/iBanda',config)
  .then(() => console.log('Mongo status: ' + mongoose.connection.readyState))
  .catch(() => console.log('Mongo: erro na conexão.'))

// Sessions

app.use(session({
  genid: () =>{
    return uuid()
  },
  store: new FileStore(),
  secret: 'pri2018',
  resave: false,
  saveUninitialized: true
}))

// Inicialização do passport
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/admin', adminAPIRouter)
app.use('/admin', adminRouter)
app.use('/api/produtor',produtorAPIRouter)
app.use('/produtor',produtorRouter)
app.use('/api/consumidor',consumidorAPIRouter)
app.use('/consumidor',consumidorRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
