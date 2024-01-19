import SomethingWentWrongError from "../../error/SomethingWentWrongError";
import { SeverityModel } from "../../model/ErrorModel";

class SeverityService {
  async addSeverityService(severityName: string) {
    try {
      const severity = await SeverityModel.create({
        name: severityName
      });
      return await severity.save();
    } catch (error) {
      console.log(error);
      throw new SomethingWentWrongError([{
        errorCode: "CRITICAL-001-0001-00001",
        message: "Something went wrong!"
      }]);
    }
  }

  async getAllSeverityService() {
    const severities = await SeverityModel.find();
    return severities;
  }
}

export const { addSeverityService, getAllSeverityService } = new SeverityService();