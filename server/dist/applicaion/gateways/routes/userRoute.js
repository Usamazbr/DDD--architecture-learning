import { CreateAccountCommand } from "../../command buses/userCommandBus/commands/CreateUserCommand.js";
import { userCommandBus } from "../../command buses/userCommandBus/UserCommandBus.js";
import { crudLogs } from "../log/crudLogs.js";
export class userRouteAdapter {
    app;
    constructor(app) {
        this.app = app;
    }
    userLoginRoute(useCase) {
        this.app.use(crudLogs);
        this.app.post("/api/user/login", async ({ body: { email, password } }, res) => {
            // console.log(email, password);
            try {
                const response1 = await userCommandBus.handle(new CreateAccountCommand(email, password));
                const response = await useCase.loginUser(email, password);
                // console.log("\x1b[33mline 19:\x1b[0m ");
                // console.log(response);
                //   json(users);
                res.status(200).send(response);
            }
            catch (error) {
                console.log("\x1b[33madminControl line 24:\x1b[0m ");
                console.log(error);
                res.status(404).json({ error });
            }
        });
    }
    userSignupRoute(useCase) {
        this.app.use(crudLogs);
        this.app.post("/api/user/signup", async ({ body: { name, email } }, res) => {
            console.log(name, email);
            try {
                const response = await useCase.signupUser(name, email);
                console.log(response);
                //   json(users);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
    /**
     * userFetchAllRoute
     */
    userFetchAllRoute(useCase) {
        this.app.use(crudLogs);
        this.app.get("/api/users", async (_, res) => {
            try {
                const response = await useCase.fetchAllUsers();
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
    /**
     * delUserRoute
     */
    delUserRoute(useCase) {
        this.app.use(crudLogs);
        this.app.delete(`/api/user/:userId`, async ({ params }, res) => {
            try {
                const response = await useCase.delUser(params.userId);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).json({ error: error });
            }
        });
    }
}
