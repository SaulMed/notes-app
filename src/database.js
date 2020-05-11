const mongoose = require('mongoose')

const { MONGODB_HOST, MONGODB_DATABASE} = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;    

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log('Error connection Database'+err))


module.exports = mongoose;
