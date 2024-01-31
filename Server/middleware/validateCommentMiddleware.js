const { body, validationResult} = require('express-validator');

const validateCommentMiddleware = [
  body('text').isString().trim().escape().withMessage("Comment can't be empty"),
  body('repliedTo').isIn(['recipe', 'user']).withMessage("Comment must be replied 'user' or 'recipe'"),
  body('_to').isMongoId("recipent must be as id"),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

module.exports = validateCommentMiddleware;
