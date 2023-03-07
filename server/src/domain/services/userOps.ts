import {TokenFactory, EncryptFactory} from "../../applicaion/usecases/ports/port2.js";
import {User} from "../entities/User.js";

export class AuthUseCase {
  constructor(private Token: TokenFactory, private Encrypt: EncryptFactory) {}
  public async loginUser(): Promise<void> {
    // console.log("\x1b[33madminControl line 22:\x1b[0m ");
    // console.log(data);
    const user = new User(<any>{}, <any>{}, <any>{}, <any>{});
  }
}
