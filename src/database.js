const mongoose = require('mongoose')

const { MONGODB_URI } = process.env;


mongoose.connect(`${MONGODB_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log('Error connection Database'+err))


module.exports = mongoose;
