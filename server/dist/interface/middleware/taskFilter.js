import { JwtAdapter } from "../frontendController/adapters/jwtAdapter.js";
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
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Token required" });
        }
        const token = authorization.split(" ")[1];
        try {
            req.user = this.tokenAdapter.verifyToken(token);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Unauthorized" });
        }
    };
}
