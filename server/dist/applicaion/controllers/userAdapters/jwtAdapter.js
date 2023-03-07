// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenFactory } from "../../usecases/ports/port2.js";
class JwtToken {
    id;
    _id;
    constructor(id) {
        this.id = id;
        this._id = id;
    }
    /**
     * tokenGenerator
     */
    tokenGenerator() {
        return jwt.sign({ _id: this._id }, String(process.env.SECRET), { expiresIn: "1d" });
    }
    /**
     * tokenVerifier
     */
    tokenVerifier = async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Token required" });
        }
        const token = authorization.split(" ")[1];
        try {
            // const { _id } = jwt.verify(token, String(process.env.SECRET));
            // req.user = await User.findOne({ _id });
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Unauthorized" });
        }
    };
}
export class JwtAdapter extends TokenFactory {
    constructor() {
        super();
    }
    /**
     * encryptionMethod
     */
    tokenMethod(_id) {
        // this.createToken()
        return new JwtToken(_id);
    }
}
