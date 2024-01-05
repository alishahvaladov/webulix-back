export default class RequestValidationError extends Error {
  constructor(private errors: []) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}