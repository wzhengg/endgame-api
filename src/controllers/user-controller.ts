import { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

function generateToken(id: string) {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
}

async function createUser(req: Request, res: Response) {
  const { first_name, last_name, email, password } = req.body;

  // Find a user with the provided email
  let user = await User.findOne({ email });

  // Send 400 response if user with provided email already exists
  if (user) {
    res.status(400);
    throw new Error(`A user with email '${email}' already exists`);
  }

  // Create user with provided information
  user = await User.create({
    first_name,
    last_name,
    email,
    password,
  });

  // Send 500 response if user wasn't created
  if (!user) {
    res.status(500);
    throw new Error('Failed to create user');
  }

  res.status(201).json({
    _id: user.id,
    first_name,
    last_name,
    email,
    token: generateToken(user.id),
  });
}

function bodyValidation() {
  return [
    body('first_name', 'First name is required').trim().notEmpty().escape(),
    body('last_name', 'Last name is required').trim().notEmpty().escape(),
    body('email', 'Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .escape(),
    body('password', 'Password must be at least 8 characters long')
      .trim()
      .isLength({ min: 8 })
      .escape(),
  ];
}

export { createUser, bodyValidation };
