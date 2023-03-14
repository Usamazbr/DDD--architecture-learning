export class ExpressAdapter {
    app;
    constructor(app) {
        this.app = app;
    }
    userLoginRoute(useCase) {
        this.app.post("/api/user/login", async ({ body }, res) => {
            const response = await useCase.loginUser(body.email, body.password);
            console.log(response);
            try {
                //   json(users);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
}
