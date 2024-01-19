import BadRequestError from "../../error/BadRequestError";
import SomethingWentWrongError from "../../error/SomethingWentWrongError";
import { PrefixModel } from "../../model/ErrorModel";

class PrefixService {
  async addPrefixService(prefixName: string) {
    try {
      const prefix = await PrefixModel.insertWithCustomCode({
        name: prefixName
      });
      return prefix;
    } catch (error) {
      console.log(error);
      throw new BadRequestError([
        {
          errorCode: "DB-SEC-001-0001",
          message: "Missing Field"
        }
      ]);
    }
  }

  async getAllPrefixesService() {
    try {
      const prefixes = await PrefixModel.find();
      return prefixes;
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([
        {
          errorCode: "CRITICAL-001-0001-00001",
          message: "Something went wrong"
        }
      ]);
    }
  }
}

export const { addPrefixService, getAllPrefixesService } = new PrefixService();