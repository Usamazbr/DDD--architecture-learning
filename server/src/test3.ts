import {TokenFactory} from "./applicaion/ports/userInterfacePorts/tokenPort.js";

export class Bull {
  constructor(private tokenAdapter: TokenFactory) {}
  /**
   * bsmethod
   */
  public bsmethod() {
    console.log(this.tokenAdapter.secretKey());
  }
}
