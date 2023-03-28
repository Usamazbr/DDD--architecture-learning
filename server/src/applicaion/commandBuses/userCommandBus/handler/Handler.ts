import {AuthUseCase} from "../../../services/userOps.js";
import {CreateUserCommand} from "../commands/CreateUserCommand.js";
import {DeleteUserCommand} from "../commands/DeleteUserCommand.js";
import {LogInUserCommand} from "../commands/LogInUserCommand.js";
import {ICommand, ICommandHandler} from "../types/commandType.js";

export class CreateUserCommandHandler<T> implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly useCase: AuthUseCase<T>) {}

  public async handle(command: CreateUserCommand): Promise<any> {
    const {name, email} = command.userDTO;

    //Further manipulations can be performed here

    return await this.useCase.signupUser(<string>name, email);
  }
}

export class LoginUserCommandHandler<T> implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly useCase: AuthUseCase<T>) {}

  public async handle(command: LogInUserCommand): Promise<any> {
    const {password, email} = command.userDTO;

    //Further manipulations can be performed here

    return await this.useCase.loginUser(email, <string>password);
  }
}

export class DeleteUserCommandHandler<T> implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly useCase: AuthUseCase<T>) {}

  public async handle(command: DeleteUserCommand): Promise<any> {
    const {userId} = command.userDTO;

    //Further manipulations can be performed here

    return await this.useCase.delUser(<string>userId);
  }
}

export class AllUserCommandHandler<T> implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly useCase: AuthUseCase<T>) {}

  public async handle(_: ICommand): Promise<any> {
    //Further manipulations can be performed here

    return await this.useCase.fetchAllUsers();
  }
}
