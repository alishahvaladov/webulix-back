import { Request, Response } from "express";
import { addSeverityService, getAllSeverityService } from "../../../services/SeverityService";
import SomethingWentWrongError from "../../../error/SomethingWentWrongError";
import BadRequestError from "../../../error/BadRequestError";

class SeverityConrtoller {
  async addSeverityController(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new BadRequestError([
          {
            message: "Missing Field",
            errorCode: "ERROR-01-001-0001",
            field: ["name"]
          }
        ]);
      }
      const addedSeverity = await addSeverityService(name);
      return res.status(201).send({
        success: true,
        severity: addedSeverity
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          message: "Something went wrong",
          errorCode: "CRITICAL-01-001-0001"
        }
      ]);
    }
  }

  async getAllSeverityController(req: Request, res: Response) {
    try {
      const severities = await getAllSeverityService();
      return res.status(200).send({
        success: true,
        severities
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          message: "Something went wrong",
          errorCode: "CRITICAL-01-001-0001"
        }
      ])
    }
  }
}

export const { addSeverityController, getAllSeverityController } = new SeverityConrtoller();