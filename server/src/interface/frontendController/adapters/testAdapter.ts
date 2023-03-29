import {Application} from "express";
<<<<<<< HEAD:server/src/interface/frontendController/adapters/testAdapter.ts
import {ExpressAdapter} from "../../../applicaion/ports/port.js";
import {UseCase} from "../../../applicaion/services/useCase.js";
=======
import {ExpressAdapter} from "../ports/port.js";
import {UseCase} from "../services/useCase.js";
>>>>>>> Phase-4b:server/src/applicaion/controllers/testAdapter.ts

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
