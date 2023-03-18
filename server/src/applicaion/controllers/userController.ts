import {Application} from "express";
// import { ExpressAdapter } from "../gateways/ports/port.js";
import {ExpressAdapter} from "../gateways/routes/userRoute.js";
import {AuthUseCase} from "../../domain/services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";
import {BcryptAdapter} from "./userAdapters/bcryptAdapter.js";
import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

export class userController {
  private adapter: ExpressAdapter;
  private userAuth: AuthUseCase;

  constructor(private app: Application) {
    this.adapter = new ExpressAdapter(this.app);
    this.userAuth = new AuthUseCase(new JwtAdapter(), new BcryptAdapter(), <any>{});
  }

  /**
   * adapterMethod
   */
  public adapterMethod() {
    this.adapter.userLoginRoute(this.userAuth);
  }
}
