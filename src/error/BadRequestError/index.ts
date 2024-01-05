import CustomError from "../CustomError";

export default class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: []) {
    super();

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  SerializeErrors(): { message: string; field?: string | undefined; }[] {
    return this.errors.map(err => {
      return { message: "message", field: "field" }
    });
  }
}