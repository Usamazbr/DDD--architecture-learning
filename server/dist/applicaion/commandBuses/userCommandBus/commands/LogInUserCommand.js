export class LogInUserCommand {
    userDTO;
    constructor(userDTO) {
        this.userDTO = userDTO;
    }
    async execute() {
        // command handler will handle creating the user from the raw data
    }
}
