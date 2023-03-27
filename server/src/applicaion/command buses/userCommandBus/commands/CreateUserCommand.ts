import {Command} from "simple-command-bus";

export class CreateAccountCommand extends Command {
  constructor(private email: string, private password: string) {
    super();
  }
}
