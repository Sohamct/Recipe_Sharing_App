const mongoose = require('mongoose')


const ingredientSchema = new mongoose.Schema({
    ingredient_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantity_type: { type: String, enum: ['ml', 'litre', 'gm', 'kg', 'unit'], required: true },
  });

  const dishTypes = ['Italian', 'American', 'Chinese', 'Mexican', 'Kathiyawadi', 'Rajasthani', 'South Indian', 'Punjabi', 'Hydrabadi', 'Gujrati', 'Maharashtriyan', 'Indian', 'Jammu Kashmiri', 'Uttar predesh'];
  const categories = ['Breakfast', 'Fast food', 'Sabji', 'Ice cream', 'Ice cream cake', 'Beverages', 'Snacks', 'Sweets', 'Jain', 'Deserts', 'Cookies'];
  const vegNonVegOptions = ['Veg', 'Non-Veg'];
  const recipeSchema = new mongoose.Schema({
    image: { 
      public_id: {
        type: String,
        required: false  
      },
      url: {
        type: String,
        required: false
      }
    }, 
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: ingredientSchema }],
    owner: { 
        type: String,
        ref: 'User',
        required: true
    },
    vegNonVeg: {type: String},
    dishType : {type: String, enum: dishTypes},
    category: {type: String, enum: categories},
    date: { type: Date, enum: vegNonVegOptions },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now}
  }, {timestamps: false});
  
module.exports = mongoose.model('Recipe', recipeSchema);