import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Determine and set status code
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  // Send JSON response with error message
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
