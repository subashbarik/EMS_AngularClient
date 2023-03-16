export interface IApiValidationErrorResponse {
  errors: any;
  statusCode: string;
  message: string;
}
export class ApiValidationErrorResponse implements IApiValidationErrorResponse {
  errors: any;
  statusCode: string;
  message: string;
  constructor(errors: any, statusCode: string, message: string) {
    this.errors = errors;
    this.statusCode = statusCode;
    this.message = message;
  }
}
