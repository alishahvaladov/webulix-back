import { Request, Response } from "express";
import { addErrorReasonService, getAllErrorReasonService } from "../../../services/ErrorReasonService";
import BadRequestError from "../../../error/BadRequestError";
import { AlphabeticString, ERROR_CODES } from "../../../constants";
import SomethingWentWrongError from "../../../error/SomethingWentWrongError";

class ErrorReasonController {
  async addErrorReasonController(req: Request, res: Response) {
    try {
      const { error_name, message }: { error_name: AlphabeticString, message: string } = req.body;
      if (!error_name || !message) {
        throw new BadRequestError([
          {
            errorCode: "ERROR-01-001-0001",
            message: "Missing Fields",
            field: error_name ? ["message"] : ["error_name"]
          }
        ]);
      }
      const errorReason = await addErrorReasonService({
        error_name,
        message
      });
      return res.status(201).send({
        success: true,
        errorReason
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          errorCode: "CRITICAL-01-001-0001",
          message: "Something went wrong!"
        }
      ]);
    }
  }

  async getAllErrorReasonController(req: Request, res: Response) {
    try {
      const errorReasons = await getAllErrorReasonService();
      return res.status(200).send({
        success: true,
        errorReasons
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          errorCode: "CRITICAL-01-001-0001",
          message: "Something went wrong!"
        }
      ]);
    }
  }
}

export const { addErrorReasonController, getAllErrorReasonController } = new ErrorReasonController();