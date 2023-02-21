import { ExpressAdapter } from "../gateways/ports/adapter.js";
import { UseCase } from "../../domain/services/useCase.js";
export class Port1 {
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
