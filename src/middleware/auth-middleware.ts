import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

interface JwtPayload {
  id: string;
}

const addUserToReq: RequestHandler = async (req, res, next) => {
  // Authorization has already been validated
  const token = req.headers.authorization!.split(' ')[1];

  // Destructure id from JWT payload
  const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

  // Find user with id and add to req
  req.user = await User.findById(id).select('-password');

  next();
};

export { addUserToReq };
