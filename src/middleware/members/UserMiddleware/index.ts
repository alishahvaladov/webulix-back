import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { UserType, UserSchema } from "../../../validations/user-dto";
import { ZodError } from "zod";

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
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).send({
          success: false,
          message: "Missing Fields"
        });
      } else {
        return res.status(500);
      }
    }
  }
}

export const { validateUserID, validateUserRegister } = new UserMiddleware();