const { body, check, validationResult } = require('express-validator');

const validateRecipe = [
  body('title').trim().notEmpty().withMessage('Recipe title cannot be empty'),
  body('description').trim().notEmpty().withMessage('Recipe description cannot be empty'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),

  body('ingredients.*.ingredient_name').trim().notEmpty().withMessage('Ingredient name cannot be empty'),
  body('ingredients.*.quantity').isNumeric().withMessage('Quantity must be a number'),
  body('ingredients.*.quantity_type').isIn(['ml', 'litre', 'gm', 'kg']).withMessage('Invalid quantity type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body)
      console.error(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = validateRecipe;
