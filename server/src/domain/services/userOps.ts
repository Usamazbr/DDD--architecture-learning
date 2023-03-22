import {EncryptFactory} from "../../applicaion/ports/userInterfacePorts/encryptionPort.js";
import {TokenFactory} from "../../applicaion/ports/userInterfacePorts/tokenPort.js";
// import {UserEntity} from "../entities/User.js";
import {UserRepository} from "../repos/userRespository/userRepos.js";
import casual from "casual";
import {User} from "../entities/types/typesUser.js";
// interface bodyType {
//   email: string;
//   password: string;
// }

export class AuthUseCase<T> {
  constructor(
    private tokenAdapter: TokenFactory,
    private Encrypt: EncryptFactory,
    private UserRepos: UserRepository<T>
  ) {}

  public async signupUser(name: string, email: string): Promise<T> {
    let password = casual.password;
    console.log(password);
    const {hashed, level} = await this.Encrypt.encryptionOperation(password);
    password = hashed;

    let user = await this.UserRepos.create(<T>{name, email, password});
    console.log(user);

    return <T>user;
  }

  /**
   * fetchAllUsers
   */
  public async fetchAllUsers(): Promise<T[]> {
    const users = await this.UserRepos.callAll();
    return <T[]>users;
  }

  public async loginUser(email: string, password: string): Promise<any> {
    console.log(email);
    console.log(password);

    try {
      /**
       * loginUser
       */
      if (!email || !password) {
        throw Error("All fields must be filled");
      }
      const userDTO = await (<Promise<User>>this.UserRepos.findByEmail(email));
      if (!userDTO) {
        throw Error("Incorrect email");
      }
      const tokenDTO = this.tokenAdapter.createToken(<string>userDTO.id, null);
      // compare hash
      const compareBool: boolean = await this.Encrypt.compareEncryptionOperation(
        password,
        <string>userDTO.password?.toString()
      );
      // console.log(compareBool);
      if (!compareBool) {
        throw Error("Incorrect password");
      }

      // res.status(200).json({ email, token: tokenDTO.token});
      return {user: userDTO, token: <string>tokenDTO.token};
    } catch (error: any) {
      console.log(`Error: ${error}`);
      return false;
    }
  }

  /**
   * delUser
   */
  public async delUser(id: string) {
    await this.UserRepos.delete(id);
  }
}
