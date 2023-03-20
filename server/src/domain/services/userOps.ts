import {EncryptFactory} from "../../applicaion/ports/userInterfacePorts/encryptionPort.js";
import {TokenFactory} from "../../applicaion/ports/userInterfacePorts/tokenPort.js";
import {UserEntity} from "../entities/User.js";
import {UserRepository} from "../repos/userRespository/userRepos.js";

export class AuthUseCase<T> {
  constructor(private Token: TokenFactory, private Encrypt: EncryptFactory, private UserRepos: UserRepository<T>) {}
  public async loginUser(req: any, res: any): Promise<void> {
    // this.UserRepos
    // console.log("\x1b[33madminControl line 22:\x1b[0m ");
    // console.log(data);
    const {email, password} = req.body;

    try {
      const hashed: string = ``;

      const hashedPassword = this.Encrypt.compareEncryptionOperation(password, hashed);
      const user = new UserEntity(<any>{}, <any>{}, <any>{});

      // const user = await User.login(email, password);

      // // creating token
      // const token = createToken(user._id);

      // const admin = user.admin;
      // const approve = user.approve;
      // const path = user.path;
      // res.status(200).json({ email, token, admin, approve, path });
    } catch (error: any) {
      res.status(400).json({err: error.message});
    }
  }
}
