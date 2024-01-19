import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { UserType, UserSchema } from "../../../validations/user-dto";
import { ZodError } from "zod";
import BadRequestError from "../../../error/BadRequestError";

class UserMiddleware {
  validateUserID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User ID must be provided"
      });
    }

    isValidObjectId(id) ? next() : res.status(400).send({
      success: false,
      message: "ID is not valid"
    });
  }
  validateUserRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const body = UserSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // const errorCode = ;
        const serializedErrors = error.errors.map(err => {
          const field = Array.isArray(err.path) ? err.path.map(String) : [String(err.path)];
          return {
            message: err.message,
            field,
            errorCode: "NET-ERROR-USER-1002",
          }
        });
        throw new BadRequestError(serializedErrors);
      } else {
        return res.status(500);
      }
    }
  }
}

export const { validateUserID, validateUserRegister } = new UserMiddleware();