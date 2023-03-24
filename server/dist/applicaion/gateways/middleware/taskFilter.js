// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// import jwt from "jsonwebtoken";
// import {fetchConfig} from "../../../framework/config/config.js";
// import {Config} from "../../../types/configtypes.js";
import { JwtAdapter } from "../../controllers/userAdapters/jwtAdapter.js";
// User token authentication
export class TaskFilter {
    secret;
    tokenAdapter;
    //   private header: any;
    constructor(secret) {
        this.secret = secret;
        this.tokenAdapter = new JwtAdapter(this.secret);
    }
    /**
     * filterMethod
     */
    filterMethod = (req, res, next) => {
        // console.log("\x1b[33mline 26:\x1b[0m ");
        // console.log(body);
        // const tokenAdapter1 = new JwtAdapter(<string>process.env.SECRET);
        console.log(`filterMethod`);
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Token required" });
        }
        const token = authorization.split(" ")[1];
        // this.tokenAdapter.secretKey();
        try {
            req.user = this.tokenAdapter.verifyToken(token);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Unauthorized" });
        }
    };
    /**
     * bsmethod
     */
    bsmethod() {
        console.log(this.tokenAdapter.secretKey());
    }
}
