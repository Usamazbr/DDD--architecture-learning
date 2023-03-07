// import { ExpressAdapter } from "../gateways/ports/port.js";
import { ExpressAdapter } from "../gateways/routes/userRoute.js";
import { UseCase } from "../../domain/services/useCase.js";
export class userAdapter {
    app;
    adapter;
    useCase;
    constructor(app) {
        this.app = app;
        this.adapter = new ExpressAdapter(this.app);
        this.useCase = new UseCase();
    }
    /**
     * adapterMethod
     */
    adapterMethod() {
        this.adapter.configureRoutes(this.useCase);
    }
}
