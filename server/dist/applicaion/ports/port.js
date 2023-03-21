// import { HelloWorldController } from "../controllers/useController.js";
import express from "express";
export class ExpressAdapter {
    router = express.Router();
    app;
    constructor(app) {
        this.app = app;
    }
    configureRoutes(useCase) {
        this.app.get("/users", async (_, res) => {
            const users = await useCase.getUsers();
            // console.log(users);
            try {
                //   json(users);
                res.status(200).send(users);
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ err: err });
            }
        });
    }
}
