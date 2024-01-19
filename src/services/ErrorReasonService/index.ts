import { AlphabeticString } from "../../constants";
import { ErrorReasonDocument, ErrorReasonModel } from "../../model/ErrorModel";

interface ErrorReasonData {
  error_name: AlphabeticString,
  message: string
}

class ErrorReasonService {
  async addErrorReasonService(data: ErrorReasonData) {
    const { error_name, message } = data;
    const errorReason = await ErrorReasonModel.insertWithCustomCode({
      error_name,
      message,
    });
    return errorReason;
  }

  async getAllErrorReasonService() {
    const errorReasons = await ErrorReasonModel.find();
    return errorReasons;
  }
}

export const { addErrorReasonService, getAllErrorReasonService } = new ErrorReasonService();