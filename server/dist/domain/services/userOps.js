import { UserEntity } from "../entities/User.js";
export class AuthUseCase {
    Token;
    Encrypt;
    constructor(Token, Encrypt) {
        this.Token = Token;
        this.Encrypt = Encrypt;
    }
    async loginUser() {
        // console.log("\x1b[33madminControl line 22:\x1b[0m ");
        // console.log(data);
        const user = new UserEntity({}, {}, {});
    }
}
