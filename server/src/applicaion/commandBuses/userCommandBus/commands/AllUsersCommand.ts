import {ICommand} from "../types/commandType.js";

export class AllUserCommand implements ICommand {
  public async execute(): Promise<void> {
    // command handler will handle creating the user from the raw data
  }
}
