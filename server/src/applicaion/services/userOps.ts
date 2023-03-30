import {EncryptFactory} from "../ports/userInterfacePorts/encryptionPort.js";
import {TokenFactory} from "../ports/userInterfacePorts/tokenPort.js";
import {UserRepository} from "../../domain/repos/userRespository/userRepos.js";
import casual from "casual";
import {User} from "../../domain/entities/types/typesUser.js";

export class AuthUseCase<T> {
  constructor(
    private tokenAdapter: TokenFactory,
    public Encrypt: EncryptFactory,
    public UserRepos: UserRepository<T>
  ) {}

  public async signupUser(name: string, email: string): Promise<T> {
    let password = casual.password;
    console.log(password);
    const hadDTO = await this.Encrypt.encryptionOperation(password);
    password = hadDTO.hashed;

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
  }

  /**
   * delUser
   */
  public async delUser(id: string) {
    await this.UserRepos.delete(id);
  }
}
