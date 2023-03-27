import {ICommand} from "../types/commandType.js";

export class CreateUserCommand implements ICommand {
  constructor(public readonly userData: {name: string; email: string; password: string}) {}

  public async execute(): Promise<void> {
    // command handler will handle creating the user from the raw data
  }
}
