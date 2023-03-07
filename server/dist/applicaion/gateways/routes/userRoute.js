export class ExpressAdapter {
    app;
    constructor(app) {
        this.app = app;
    }
    userLoginRoute(useCase) {
        this.app.post("/api/user/login", async (_, res) => {
            const response = await useCase.loginUser();
            console.log(response);
            try {
                //   json(users);
                res.status(200).send(response);
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ err: err });
            }
        });
    }
}
