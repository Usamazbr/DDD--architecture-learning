import { Command } from "simple-command-bus";
export class CreateAccountCommand extends Command {
    email;
    password;
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }
}
