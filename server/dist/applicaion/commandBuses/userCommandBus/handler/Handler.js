export class CreateUserCommandHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(command) {
        const { name, email, password } = command.userData;
        //   const user = new UserEntity( name, email, password);
        await this.userRepository.create({ name, email, password });
    }
}
