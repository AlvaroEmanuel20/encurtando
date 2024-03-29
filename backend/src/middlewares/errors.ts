import { NextFunction, Request, Response } from 'express';
import HttpBusinessError from '../utils/errors/HttpBusinessError';

export default function errors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpBusinessError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      context: error.context,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    statusCode: 500,
  });

  next(error);
}
