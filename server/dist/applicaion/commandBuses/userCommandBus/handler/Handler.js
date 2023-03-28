export class CreateUserCommandHandler {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    async handle(command) {
        const { name, email } = command.userDTO;
        //Further manipulations can be performed here
        return await this.useCase.signupUser(name, email);
    }
}
export class LoginUserCommandHandler {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    async handle(command) {
        const { password, email } = command.userDTO;
        //Further manipulations can be performed here
        return await this.useCase.loginUser(email, password);
    }
}
export class DeleteUserCommandHandler {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    async handle(command) {
        const { userId } = command.userDTO;
        //Further manipulations can be performed here
        return await this.useCase.delUser(userId);
    }
}
export class AllUserCommandHandler {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    async handle(_) {
        //Further manipulations can be performed here
        return await this.useCase.fetchAllUsers();
    }
}
