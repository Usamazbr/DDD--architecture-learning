import {ICommand, ICommandHandler} from "./types/commandType.js";

export class UserCommandBus {
  private readonly handlers: Map<string, ICommandHandler<ICommand>> = new Map();

  public registerHandler<T extends ICommand>(commandName: string, handler: ICommandHandler<T>): void {
    this.handlers.set(commandName, handler);
  }

  public async execute(command: ICommand): Promise<any> {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error(`No handler registered for command ${command.constructor.name}`);
    }

    return await handler.handle(command);
  }
}
