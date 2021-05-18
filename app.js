var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var signUpRouter = require('./routes/signUp.js')
var taskRouter = require('./routes/task')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const CONNECTION_URL =
  'mongodb+srv://debendu-das:debendu6@to-do-app.skrpa.mongodb.net/To-Do-App?retryWrites=true&w=majority'

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000
    console.log(`Server Running on Port: http://localhost:${PORT}`)
  })
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)

app.use('/login', loginRouter)
app.use('/signUp', signUpRouter)
app.use('/task', taskRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
