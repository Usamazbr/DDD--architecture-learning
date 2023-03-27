export class CreateUserCommand {
    userData;
    constructor(userData) {
        this.userData = userData;
    }
    async execute() {
        // command handler will handle creating the user from the raw data
    }
}
