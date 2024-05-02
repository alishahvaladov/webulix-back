import { getCollectionService } from "../../../services/CollectionService";
import { Request, Response } from "express";

class CollectionMiddleware {
  async getCollectionMiddleware(req: Request, res: Response) {
    try {
      const collections = await getCollectionService();
      return res.status(200).send({
        success: true,
        collections
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const { getCollectionMiddleware } = new CollectionMiddleware();