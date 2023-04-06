class BasicError extends Error {
  constructor(private statusCode: number, message: string) {
    super(message);
    this.name = Error.name;
    Error.captureStackTrace(this);
  }
  sendResponse(res: any) {
    return res.status(this.statusCode).json({success: false, error: this.message});
  }
  logError(err: any) {
    console.log("debug", this.constructor.name);
    console.log("error", err.stack);
  }
}

export class InvalidUserDataError extends BasicError {}
export class UserAlreadyExistError extends BasicError {}
export class UserNotFoundError extends BasicError {}

export class UnExpextedDatabaseError extends BasicError {}
export class JWTGenerateError extends BasicError {}

export class InvalidTodoData extends BasicError {}
export class TodoNotFoundError extends BasicError {}
export class EmptyTodoError extends BasicError {}

export class PasswordEncryptionError extends BasicError {}
export class PasswordDecryptionError extends BasicError {}
export class InvalidCredentialsError extends BasicError {}
export class InternelServerError extends BasicError {}
export class UnAuthorizedError extends BasicError {}

export class CommandHandlerError extends BasicError {}
