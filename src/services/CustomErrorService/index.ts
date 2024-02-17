import { CustomErrorModel } from "../../model/ErrorModel";

class CustomErrorService {
  async addCustomErrorService(data: Object) {
    const addedDAta = await CustomErrorModel.insertWithCustomCode(data);
    return addedDAta;
  }

  async getAllCustomErrorService() {
    const customErrors = await CustomErrorModel.find();
    return customErrors;
  }
}

export const { addCustomErrorService, getAllCustomErrorService } = new CustomErrorService();