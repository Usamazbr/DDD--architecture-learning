import casual from "casual";
// interface bodyType {
//   email: string;
//   password: string;
// }
export class AuthUseCase {
    Token;
    Encrypt;
    UserRepos;
    constructor(Token, Encrypt, UserRepos) {
        this.Token = Token;
        this.Encrypt = Encrypt;
        this.UserRepos = UserRepos;
    }
    async signupUser(name, email) {
        let password = casual.password;
        console.log(password);
        const { hashed, level } = await this.Encrypt.encryptionOperation(password);
        password = hashed;
        let user = await this.UserRepos.create({ name, email, password });
        console.log(user);
        return user;
    }
    /**
     * fetchAllUsers
     */
    async fetchAllUsers() {
        const users = await this.UserRepos.callAll();
        return users;
    }
    async loginUser(email, password) {
        console.log(email);
        console.log(password);
        // const user1 = await this.UserRepos.callAll();
        // console.log(user1);
        // console.log("\x1b[33madminControl line 22:\x1b[0m ");
        // console.log(data);
        // const {email, password} = body;
        try {
            /**
             * loginUser
             */
            if (!email || !password) {
                throw Error("All fields must be filled");
            }
            const userDTO = await this.UserRepos.findByEmail(email);
            if (!userDTO) {
                throw Error("Incorrect email");
            }
            // console.log("\x1b[33mline 58:\x1b[0m ");
            // console.log(userDTO);`
            // creating token
            const tokenDTO = this.Token.createToken(`userDTO`, null);
            // compare hash
            const compareBool = await this.Encrypt.compareEncryptionOperation(password, userDTO.password?.toString());
            // console.log(compareBool);
            if (!compareBool) {
                throw Error("Incorrect password");
            }
            // res.status(200).json({ email, token: tokenDTO.token});
            return { user: userDTO, token: tokenDTO.token };
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return false;
        }
    }
    /**
     * delUser
     */
    async delUser(id) {
        await this.UserRepos.delete(id);
    }
}
