import { ExpressAdapter } from "../usecases/ports/port.js";
import { UseCase } from "../../domain/services/useCase.js";
export class testAdapter {
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
