const mongoose = require('mongoose')


const authActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Reference to the User model
    activityType: { type: String, enum: ['Login', 'Signup'], required: true }, // Type of activity: Login or Signup
    timestamp: { type: Date, default: Date.now } ,// Timestamp of the activity,
    status: {type:String, enum: ['Successful', 'Failure']}
});

module.exports = mongoose.model('AuthActivity', authActivitySchema);