// interface bodyType {
//   email: string;
//   password: string;
// }
export class TaskUseCase {
    Token;
    UserRepos;
    constructor(Token, UserRepos) {
        this.Token = Token;
        this.UserRepos = UserRepos;
    }
    async signupUser(name, email) { }
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
    }
    /**
     * delUser
     */
    async delUser(id) {
        await this.UserRepos.delete(id);
    }
}
