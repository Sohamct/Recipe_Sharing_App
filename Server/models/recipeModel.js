const mongoose = require('mongoose')


const recipeModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    recipeImage: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }
})
module.exports = mongoose.model('Recipe', recipeModel)