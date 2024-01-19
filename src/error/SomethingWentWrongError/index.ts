import { ErrorType } from "../../validations/error-dto";
import CustomError from "../CustomError";

export default class SomethingWentWrongError extends CustomError {
  statusCode = 404;

  constructor(public errors: ErrorType[]) {
    super();

    Object.setPrototypeOf(this, SomethingWentWrongError.prototype);
  }

  SerializeErrors(): ErrorType[] {
    console.log(this.errors);
    return this.errors.map(err => {
      return { message: err.message, field: err.field, errorCode: err.errorCode }
    });
  }
}