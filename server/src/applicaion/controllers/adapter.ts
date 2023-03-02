import { Application } from "express";
import { ExpressAdapter } from "../gateways/ports/port.js";
import { UseCase } from "../../domain/services/useCase.js";


export class Adapter1 {
  private app: Application;
  private adapter: ExpressAdapter;
  private useCase: UseCase;

    constructor(app: Application) {
      this.app = app;
        
      this.adapter = new ExpressAdapter(this.app);
      this.useCase = new UseCase();
    }

    /**
     * adapterMethod
     */
    public adapterMethod() {
      this.adapter.configureRoutes(this.useCase);
    }
}