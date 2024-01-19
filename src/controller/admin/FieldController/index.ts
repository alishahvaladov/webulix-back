import { Response, Request } from "express";
import { addFieldService, getAllFieldService } from "../../../services/FieldService";
import SomethingWentWrongError from "../../../error/SomethingWentWrongError";
import BadRequestError from "../../../error/BadRequestError";

class FieldController {
  async addFieldController(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new BadRequestError([
          {
            message: "Missing Fields",
            errorCode: "ERROR-01-001-001",
            field: ["name"]
          }
        ]);
      }
      const field = await addFieldService(name);
      return res.status(201).send({
        success: true,
        field
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          errorCode: "CRITICAL-01-001-0001",
          message: "Something went wrong"
        }
      ]);
    }
  }

  async getAllFieldController(req: Request, res: Response) {
    try {
      const fields = await getAllFieldService();
      return res.status(200).send({
        success: true,
        fields
      });
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          errorCode: "CRITICAL-01-001-0001",
          message: "Something went wrong"
        }
      ]);
    }
  }
}

export const { addFieldController, getAllFieldController } = new FieldController();