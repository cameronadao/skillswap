// backend/middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const offerValidationRules = () => {
  return [
    body('title')
      .notEmpty().withMessage('Le titre est requis')
      .isLength({ min: 3, max: 100 }).withMessage('Le titre doit contenir entre 3 et 100 caractères'),
    
    body('description')
      .notEmpty().withMessage('La description est requise')
      .isLength({ min: 10, max: 1000 }).withMessage('La description doit contenir entre 10 et 1000 caractères'),
    
    body('skillsOffered')
      .isArray().withMessage('Les compétences offertes doivent être un tableau')
      .notEmpty().withMessage('Au moins une compétence offerte est requise'),
    
    body('skillsWanted')
      .isArray().withMessage('Les compétences recherchées doivent être un tableau')
      .notEmpty().withMessage('Au moins une compétence recherchée est requise'),
    
    body('availability')
      .optional()
      .isIn(['Full-time', 'Part-time', 'Weekends', 'Flexible'])
      .withMessage('La disponibilité doit être une valeur valide')
  ];
};

module.exports = {
  validateRequest,
  offerValidationRules
};