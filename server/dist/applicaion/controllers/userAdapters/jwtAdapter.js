// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenFactory } from "../../ports/userInterfacePorts/tokenPort.js";
class JwtToken {
    secret;
    constructor(secret) {
        this.secret = secret;
        // console.log(this.secret);
    }
    /**
     * secretOut
     */
    secretOut() {
        return this.secret;
    }
    /**
     * tokenGenerator
     */
    tokenGenerator(_id, time) {
        console.log("\x1b[33mline 21:\x1b[0m ");
        console.log(this.secret);
        const expiryTime = new Date();
        if (time === null) {
            console.log(`time is 1 day (default)`);
            time = `1d`;
            expiryTime.setDate(expiryTime.getDate() + 1);
        }
        const token = jwt.sign({ _id }, this.secret, { expiresIn: time });
        return { token, expiryTime };
    }
    /**
     * tokenVerifier
     */
    tokenVerifier = (token) => {
        console.log("\x1b[33mline 38:\x1b[0m ");
        console.log(this.secret);
        console.log(token);
        try {
            const _id = jwt.verify(token, this.secret);
            console.log(_id);
            // return _id
            // req.user = await User.findOne({ _id });
        }
        catch (error) {
            console.log(error);
            // return `${error}: Unauthorized`
            // res.status(401).json({error: "Unauthorized"});
        }
    };
}
export class JwtAdapter extends TokenFactory {
    secret;
    constructor(secret) {
        super();
        this.secret = secret;
    }
    /**
     * encryptionMethod
     */
    tokenMethod() {
        // this.createToken()
        return new JwtToken(this.secret);
    }
}
