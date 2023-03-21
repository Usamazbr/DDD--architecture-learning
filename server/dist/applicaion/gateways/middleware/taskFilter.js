// User token authentication
export const tasksFilter = async ({ headers }, res, next) => {
    const { authorization } = headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token required" });
    }
    const token = authorization.split(" ")[1];
    console.log("\x1b[33mline 9:\x1b[0m ");
    console.log(token);
    //   try {
    //   const {_id} = jwt.verify(token, process.env.SECRET);
    //     req.user = await User.findOne({_id}).select("_id");
    next();
    //   } catch (error) {
    //     console.log(error);
    //     res.status(401).json({error: "Unauthorized"});
    //   }
};
