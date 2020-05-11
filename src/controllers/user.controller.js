const userCtrl = {}
//Model
const User = require('../models/User')
//Module
const passport = require('passport')

userCtrl.renderFormSignUp = (req, res) => {
    res.render('users/signup')
}

userCtrl.signUp = async (req, res) => {
    const errors = []
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {  //Comparar contrase;as
        errors.push({ text: 'Passwords do not match' })
    }
    if (password.length < 4) {    //Solicitar contrase;a mayor a 4 caracteres
        errors.push({ text: 'Password must be at least 4 characters.' })
    }
    //Comparar si existe ese usuario en la DB
    const emailUser = await User.findOne({ email: email })
    if (emailUser) {
        errors.push({text: 'This email already is used.'})
    }
    if (errors.length > 0) {  //Si hay un error regresar al signup con los datos cargados
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    } else{
        /*
        //Comparar si existe ese usuario en la DB
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            //errors.push({text: 'This email already is used.'})
            req.flash('error_msg', 'This email already is used.')
            res.redirect('/users/signup')
        }
        */ 
        //Si todo sale bien agregar usuario a DB 
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password)//Encriptar contrase;a
        await newUser.save()
        req.flash('success_msg','You are registered.')
        res.redirect('/users/signin')
    }
}

userCtrl.renderFormSinIn = (req, res) => {
    res.render('users/signin')
}

userCtrl.signin = passport.authenticate('local',{   //Trabajar con el LocalStrategy
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
})

userCtrl.logout = (req, res) => {
    req.logout()     //Borrar sesion del servidor
    req.flash('success_msg','You are logged out now.')
    res.redirect('/users/signin')
}

module.exports = userCtrl;