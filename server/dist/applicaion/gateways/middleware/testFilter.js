// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// import jwt from "jsonwebtoken";
// import {fetchConfig} from "../../../framework/config/config.js";
// import {Config} from "../../../types/configtypes.js";
import { JwtAdapter } from "../../controllers/userAdapters/jwtAdapter.js";
export class TaskFilter {
    tokenAdapter;
    //   private header: any;
    constructor(tokenAdapter) {
        this.tokenAdapter = tokenAdapter;
    }
    /**
     * filterMethod
     */
    filterMethod({ headers }, res, next) {
        // console.log("\x1b[33mline 26:\x1b[0m ");
        // console.log(this);
        console.log(`filterMethod`);
        const { authorization } = headers;
        if (!authorization) {
            return res.status(401).json({ error: "Token required" });
        }
        const token = authorization.split(" ")[1];
        console.log("\x1b[33mline 24:\x1b[0m ");
        console.log(token);
        this.tokenAdapter.secretKey();
        try {
            // this.tokenAdapter.verifyToken(token);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Unauthorized" });
        }
    }
    /**
     * bsmethod
     */
    bsmethod() {
        console.log(this.tokenAdapter.secretKey());
    }
}
// User token authentication
export const tasksFilter = (req, res, next) => {
    // console.log("\x1b[33mline 26:\x1b[0m ");
    // console.log(body);
    const tokenAdapter1 = new JwtAdapter(process.env.SECRET);
    console.log(`filterMethod`);
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token required" });
    }
    const token = authorization.split(" ")[1];
    // this.tokenAdapter.secretKey();
    try {
        req.user = tokenAdapter1.verifyToken(token);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized" });
    }
};
