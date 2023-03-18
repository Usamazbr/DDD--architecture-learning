// import { Connection, Repository } from 'typeorm';
// import { UserEntity } from '../../../../domain/entities/User.js';
// import { UserRepository } from '../../../../domain/repos/userRespository/userRepos.js';

// export class TypeORMUserRepository implements UserRepository<UserEntity> {
//   private userRepository: Repository<UserEntity>;

//   constructor(connection: Connection) {
//     this.userRepository = connection.getRepository(UserEntity);
//   }

//   async findById(id: string): Promise<UserEntity | undefined> {
//     return <UserEntity>this.userRepository.findOne(id);
//   }

//   async save(user: UserEntity): Promise<UserEntity> {
//     return this.userRepository.save(user);
//   }
// }
