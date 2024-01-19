import { Request, Response } from "express";
import { addPrefixService, getAllPrefixesService } from "../../../services/PrefixService";
import { PrefixDocument } from "../../../model/ErrorModel";
import BadRequestError from "../../../error/BadRequestError";

class PrefixController {
  async addPrefixController(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      throw new BadRequestError([
        {
          message: "Missing field",
          errorCode: "NET-ERROR-001-0001"
        }
      ]);
    }
    await addPrefixService(name);
    return res.status(200).send({
      success: true
    });
  }

  async getAllPrefixController(req: Request, res: Response) {
    const prefixes = await getAllPrefixesService();

    return res.status(201).send({
      success: true,
      prefixes
    });
  }
}

export const { addPrefixController, getAllPrefixController } = new PrefixController();