const bcrypt = require('bcryptjs');
const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    name:{ type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required: true}
},{
    timestapms: true
})
    //Encriptar contrase;a
UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);  //Salt => Seguridad de Key
    return await bcrypt.hash(password,salt);    //Regresar contrase;a encriptada
}

    //Decifrar contrase;a
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password); //Retorna un true o false deacuerdo a la compatibilidad de los passwords
}

module.exports = model('User', UserSchema);