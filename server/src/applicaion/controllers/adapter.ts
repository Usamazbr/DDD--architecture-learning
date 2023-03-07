import { Application } from "express";
import { ExpressAdapter } from "../usecases/ports/port.js";
import { UseCase } from "../../domain/services/useCase.js";


export class testAdapter {
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