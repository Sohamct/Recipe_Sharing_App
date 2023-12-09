const mongoose = require('mongoose')

const mongoUri = 'mongodb://127.0.0.1:27017/recipe'

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoUri);
        console.log("successfully connected to mongodb");
    }catch(err){
        console.log("Failed to connect with mongodb");
    }
}
module.exports = connectToMongo;