const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

//Configuracion de passport
require('./config/passport')

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4500)
app.set('views', path.join(__dirname + '/views'))
//Configuracion del motor de plantillas => Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
    //Despues de session SIEMPRE colocar passport, ya que se basa en ese modulo para trabajar
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error = req.flash('error')   //Passport
    res.locals.user = req.user || null
    res.locals.error_msg = req.flash('error_msg')
    next();
})

//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

//Static Files
app.use(express.static(path.join(__dirname + '/public')))

//Start
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'))
})


module.exports = app;