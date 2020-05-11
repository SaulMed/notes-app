const {Router} = require('express');

//Controller
const {
    renderFormSignUp,
    signUp,
    renderFormSinIn,
    signin,
    logout
} = require('../controllers/user.controller')

class userRoutes{

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/users/signup', renderFormSignUp)
        this.router.post('/users/signup', signUp)
        this.router.get('/users/signin', renderFormSinIn)
        this.router.post('/users/signin', signin)
        this.router.get('/users/logout', logout)
    }

}

const routesUser = new userRoutes();
module.exports=  routesUser.router;