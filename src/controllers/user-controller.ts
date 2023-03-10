import { Request, Response } from 'express';
import { body, header } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  // Find a user with the provided email
  const user = await User.findOne({ email });

  // Send 400 response if user with provided email doesn't exist
  if (!user) {
    res.status(400);
    throw new Error(`Could not find a user with email '${email}'`);
  }

  // Compare passwords
  const isValidPassword = await bcrypt.compare(password, user.password);

  // Send 400 response if password is wrong
  if (!isValidPassword) {
    res.status(400);
    throw new Error('Wrong password');
  }

  res.json({
    _id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email,
    token: generateToken(user.id),
  });
}

async function getMe(req: Request, res: Response) {
  // Find user with id from request
  const user = await User.findById(req.user!._id);

  // Send 404 response if user with id not found
  if (!user) {
    res.status(404);
    throw new Error(`Could not find user with id '${req.user!._id}'`);
  }

  res.json({
    _id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
}

const headerValidation = () => {
  return header('authorization', 'Token is required')
    .exists()
    .custom((value) => {
      const [bearer, token] = value.split(' ');
      return bearer && token;
    })
    .withMessage("authorization value must have form 'Bearer <token>'");
};

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

export { createUser, loginUser, getMe, headerValidation, bodyValidation };
