const mongoose = require('mongoose')


const ingredientSchema = new mongoose.Schema({
    ingredient_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantity_type: { type: String, enum: ['ml', 'litre', 'gm', 'kg'], required: true },
  });

  const recipeSchema = new mongoose.Schema({
    image: { type: String }, 
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: ingredientSchema }],
    owner: { 
        type: String,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Recipe', recipeSchema)