import casual from "casual";
import nodemailer from "nodemailer";
export class AuthUseCase {
    tokenAdapter;
    Encrypt;
    UserRepos;
    user;
    observers = [];
    constructor(tokenAdapter, Encrypt, UserRepos) {
        this.tokenAdapter = tokenAdapter;
        this.Encrypt = Encrypt;
        this.UserRepos = UserRepos;
    }
    /**
     * loginUser
     */
    async loginUser(email, password) {
        console.log(email);
        console.log(password);
        if (!email || !password) {
            throw Error("All fields must be filled");
        }
        const userDTO = await this.UserRepos.findByEmail(email);
        if (!userDTO) {
            throw Error("Incorrect email");
        }
        const tokenDTO = this.tokenAdapter.createToken(userDTO.id, null);
        // compare hash
        const compareBool = await this.Encrypt.compareEncryptionOperation(password, userDTO.password?.toString());
        // console.log(compareBool);
        if (!compareBool) {
            throw Error("Incorrect password");
        }
        // res.status(200).json({ email, token: tokenDTO.token});
        return { user: userDTO, token: tokenDTO.token };
    }
    /**
     * delUser
     */
    async delUser(id) {
        await this.UserRepos.delete(id);
    }
    /**
     * SignUpUser
     */
    async signupUser(name, email) {
        const unhashedNew = casual.password;
        console.log(unhashedNew);
        const hashDTO = await this.Encrypt.encryptionOperation(unhashedNew);
        if (!hashDTO || !hashDTO.hashed) {
            throw new Error("Encryption failed");
        }
        const { hashed, level } = hashDTO;
        const newUser = await this.UserRepos.create({ name, email, password: hashed });
        console.log(newUser);
        const userDTO = { ...newUser, password: unhashedNew, level };
        this.user = userDTO;
        this.notifyObservers();
        return newUser;
    }
    /**
     * fetchAllUsers
     */
    async fetchAllUsers() {
        const users = await this.UserRepos.callAll();
        return users;
    }
    registerObserver(observer) {
        this.observers.push(observer);
    }
    unregisterObserver(observer) {
        const index = this.observers.findIndex((o) => o === observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer.onUpdate(this));
    }
}
// Observer implementation (Email driver is here)
export class MyUserObserver {
    onUpdate(subject) {
        if (subject instanceof AuthUseCase) {
            // email notifier
            const transport = nodemailer.createTransport({
                // service: "",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.TEST_APP_EMAIL,
                    pass: process.env.TEST_APP_PSWD
                }
            });
            const message = {
                from: process.env.TEST_APP_EMAIL,
                to: subject.user.email,
                subject: "Your credentials for Todo App",
                html: `<h2>Email: ${subject.user.email}<br/>Password: ${subject.user.password}</h2><br/><br/><p>Please don't share this with anyone</p>` // Plain text body
            };
            transport.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(info.response);
                }
            });
            console.log(subject.user);
            console.log(`Observation: Email sent`);
        }
    }
}
