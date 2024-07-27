import express from 'express';
import { check, validationResult } from 'express-validator';
import { register, login, resetPassword, updatePassword } from '../controllers/auth.controller.js';

const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  validate,
  login
);
      
router.post(
  '/reset-password',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  validate,
  resetPassword
);


router.post(
  '/update-password',
  [
    check('token', 'Token is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  validate,
  updatePassword
);

export default router;
