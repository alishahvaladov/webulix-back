import { Request, Response } from "express";
import { addCustomErrorService, getAllCustomErrorService } from "../../../services/CustomErrorService";
import { ZodError } from "zod";
import BadRequestError from "../../../error/BadRequestError";
import SomethingWentWrongError from "../../../error/SomethingWentWrongError";
import { CustomErrorSchema } from "../../../validations/error-dto";

class CustomErrorController {
  async addCustomErrorController(req: Request, res: Response) {
    try {
      const body = CustomErrorSchema.parse(req.body);
      const addedCustomError = await addCustomErrorService(body);
      return res.status(200).send({
        success: true,
        customError: addedCustomError
      });
    } catch(error) {
      console.log(error);
      if (error instanceof ZodError) {
        const serializedErrors = error.errors.map(err => {
          const field = Array.isArray(err.path) ? err.path.map(String) : [String(err.path)];
          return {
            message: err.message,
            errorCode: "ERROR-01-001-0001",
            field: field
          }
        });
        throw new BadRequestError(serializedErrors);
      }
      throw new SomethingWentWrongError([{
        errorCode: "ERROR-01-021-0013",
        message: "Something went wrong!"
      }]);
    }
  }

  async getAllCustomErrorController(req: Request, res: Response) {
    try {
      const customErrors = await getAllCustomErrorService();
      return res.status(200).send({
        success: true,
        customErrors
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          message: "Something went wrong!",
          errorCode: "CRITICAL-01-051-0104"
        }
      ]);
    }
  }
}

export const { addCustomErrorController, getAllCustomErrorController } = new CustomErrorController();