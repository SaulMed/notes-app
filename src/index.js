if(process.env.NODE_ENV == 'development'){
    //Permitir trabajar con las variables de entorno
require('dotenv').config(); 
}    
    //Aplicacion
require('./server');
    //Database
require('./database')

console.log(process.env.NODE_ENV)

