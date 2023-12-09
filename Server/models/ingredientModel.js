const mongoose = require('mongoose')

const quantityUnits = ['ml', 'liter', 'mg', 'kg']

const ingredientModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        value: {
            type: Number,
            required: true,
            default: 1,
        },
        unit: {
            type: String,
            validate: function(v){
                return quantityUnits.includes(v);
            },
            message: props => `${props.value} is not valid quantity unit. Choose from ${quantityUnits.join(', ')}`
        },
        default: 'ml'
    }
})

module.exports = mongoose.model('Ingredient', ingredientModel)