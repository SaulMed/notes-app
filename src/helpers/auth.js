const helpers = {}

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();  //En caso sea correcto que continue con su navegacion normal
    }
    req.flash('error_msg','Not Authorized.')
    res.redirect('/users/signin')   //Si no esta autenticado redireccionar al login
}

module.exports = helpers.isAuthenticated;