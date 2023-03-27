import {User} from "@prisma/client";
// import { UserEntity } from "../../../../domain/entities/User.js";
import {UserRepository} from "../../../../domain/repos/userRespository/userRepos.js";
import {CreateUserCommand} from "../commands/CreateUserCommand.js";
import {ICommandHandler} from "../types/commandType.js";

export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository<User>) {}

  public async handle(command: CreateUserCommand): Promise<void> {
    const {name, email, password} = command.userData;

    //   const user = new UserEntity( name, email, password);

    await this.userRepository.create(<User>{name, email, password});
  }
}
