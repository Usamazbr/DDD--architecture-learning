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
export const tasksFilter = async ({ headers, user }, res, next) => {
    //   const {authorization} = headers;
    //   console.log(authorization);
    //   if (!authorization) {
    //     return res.status(401).json({error: "Token required"});
    //   }
    //   const token = authorization.split(" ")[1];
    //   console.log("\x1b[33mline 22:\x1b[0m ");
    //   console.log(token);
    //   try {
    //     const config: Config = await fetchConfig();
    //     const secret = config.secret;
    //     console.log("\x1b[33mline 27:\x1b[0m ");
    //     console.log(secret);
    //     const _id = jwt.verify(token, <string>config.secret);
    //     console.log(_id);
    //     user = _id;
    next();
    //   } catch (error) {
    //     console.log(error);
    //     res.status(401).json({error: "Unauthorized"});
    //   }
};
