import { ErrorType } from "../../validations/error-dto";
import CustomError from "../CustomError";

export default class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: ErrorType[]) {
    super();

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  SerializeErrors(): ErrorType[] {
    return this.errors.map(err => {
      return { message: err.message, field: err.field, errorCode: err.errorCode }
    });
  }
}