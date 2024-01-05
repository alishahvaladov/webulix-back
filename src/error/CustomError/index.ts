import { ErrorType } from "../../validations/error-dto";

export default abstract class CustomError extends Error {
  abstract statusCode: number;
  
  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract SerializeErrors(): ErrorType[];
}