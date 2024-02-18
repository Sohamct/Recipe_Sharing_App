const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    profileImage: {
        type: String
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            default: [], 
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            default: [], 
        }
    ],
})

module.exports = mongoose.model('User', userSchema)
