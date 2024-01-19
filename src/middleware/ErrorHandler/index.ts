import { Request, Response, NextFunction } from "express";
import CustomError from "../../error/CustomError";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.SerializeErrors()
    });
  }

  return res.status(400).send({
    message: err.message,
    success: false
  });
}