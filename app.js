var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
var expressSession = require('express-session')
var logger = require('morgan');
var flash = require('connect-flash')
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var passport = require('./auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    // console.log(JSON.stringify(req.session))
    if (req.user) {
        res.locals.usn = req.user.dispName
    }
    else {
        res.locals.usn = 'Not logged in'
    }
    next()
})

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.get('/login',
    function(req, res) {
        res.render('login', { messages: req.flash('error') })
    }
)

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login',
        failureFlash: true,
    })// ,
    // function(req, res) {
    //     res.redirect('/')
    // }
)

app.get('/logout',
    function(req, res) {
        req.logout()
        res.redirect('/')
    }
)

app.get('/secret',
    ensureLoggedIn('/login'),
    function(req, res) {
        res.render('secret')
    }
)

app.get('/ang',
    function(req, res) {
        res.render('ang')
    }
)

app.get('/profile',
    ensureLoggedIn('/login'),
    function(req, res) {
        res.render('profile', { user: req.user })
    }
)

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

app.listen(3000)

module.exports = app;
