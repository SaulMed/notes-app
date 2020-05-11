const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Model
const User = require('../models/User')

passport.use(new LocalStrategy({    //Recibir datos
    usernameField: 'email'
}, async (email, password, done) => {   //Validar Logueo
    const user = await User.findOne({ email: email })   //Comprobar existencia del correo
    if (!user) {       //Error , Usuario , Options   
        return done(null, false, { message: 'User Not Found.' })    //Utilizar CallBack para terminar con autenticacion y regresar a la vista
    } else {
        //Validar password
        const match = await user.matchPassword(password)  //Returna un True o False si se cumple
        if (match) {      //Error, Usuario    
            return done(null, user);  //Passport guarda la sesion en el servidor
        } else {           //Error, Usuario, Option
            return done(null, false, { message: 'Incorrect Password' })
        }
    }
}))

passport.serializeUser((user, done) => {   //Guardar en la sesion del servidor
    done(null, user.id)
})

passport.deserializeUser((id, done) => {//Verificar autenticacion del usuario
    User.findById(id, (err, user) => {
        done(err, user)   //Retornar un error o el usuario
    })
})