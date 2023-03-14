import { UserEntity } from "../entities/User.js";
export class AuthUseCase {
    Token;
    Encrypt;
    constructor(Token, Encrypt) {
        this.Token = Token;
        this.Encrypt = Encrypt;
    }
    async loginUser(req, res) {
        // console.log("\x1b[33madminControl line 22:\x1b[0m ");
        // console.log(data);
        const { email, password } = req.body;
        try {
            const hashed = ``;
            const hashedPassword = this.Encrypt.compareEncryptionOperation(password, hashed);
            const user = new UserEntity({}, {}, {});
            // const user = await User.login(email, password);
            // // creating token
            // const token = createToken(user._id);
            // const admin = user.admin;
            // const approve = user.approve;
            // const path = user.path;
            // res.status(200).json({ email, token, admin, approve, path });
        }
        catch (error) {
            res.status(400).json({ err: error.message });
        }
    }
}
