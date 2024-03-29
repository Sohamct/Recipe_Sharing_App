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
    profileImage:{ 
        public_id: {
          type: String,
          required: false
        },
        url: {
          type: String,
          required: false
        }
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
    favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
})

module.exports = mongoose.model('User', userSchema)