const mongoose = require('mongoose')

 const mongoUri ="mongodb://localhost:27017/recipe";
// const mongoUri = "mongodb+srv://kevint11:Kevinmongodb%4011@cluster0.tdcbq1g.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoUri);
        console.log("successfully connected to mongodb");
    }catch(err){
        // console.log(err);
        console.log("Failed to connect with mongodb");
    }
}
module.exports = connectToMongo; 