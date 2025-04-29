// middleware/validation.js
const { check, validationResult } = require('express-validator');
const { ErrorResponse } = require('../utils/errorHandler');

// Validation for signup
exports.validateSignup = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('country', 'Country is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];

// Validation for login
exports.validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];

// Validation for project creation
exports.validateProject = [
  check('name', 'Project name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];

// Validation for task creation
exports.validateTask = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('project', 'Project ID is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];
// Validation for task update
exports.validateTaskUpdate = [
  check('title', 'Title is required').optional().not().isEmpty(),
  check('description', 'Description is required').optional().not().isEmpty(),
  check('status', 'Invalid status')
    .optional()
    .isIn(['Not Started', 'In Progress', 'Completed']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];
