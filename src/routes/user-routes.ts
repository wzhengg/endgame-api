import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation-middleware';
import {
  createUser,
  loginUser,
  bodyValidation,
} from '../controllers/user-controller';

const router = express.Router();

// POST request for creating a user
router.post('/', bodyValidation(), validateRequest, createUser);

// POST request for logging in a user
router.post(
  '/login',
  body('email', 'Email is required').trim().isEmail().normalizeEmail().escape(),
  body('password', 'Password is required').trim().escape(),
  validateRequest,
  loginUser
);

export default router;
