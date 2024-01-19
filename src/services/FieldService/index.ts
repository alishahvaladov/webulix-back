import { FieldModel } from "../../model/ErrorModel";

class FieldService {
  async addFieldService(serviceName: string) {
    const field = await FieldModel.insertWithCustomCode({
      name: serviceName
    });
  }
  async getAllFieldService() {
    const fields = await FieldModel.find();
    return fields;
  }
}

export const { addFieldService, getAllFieldService } = new FieldService();