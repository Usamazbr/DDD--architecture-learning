import bcrypt from "bcrypt";
import {Encryption, EncryptFactory} from "../../usecases/ports/port2.js";

class BcryptEncryption implements Encryption {
  public operation(): string {
    return "";
  }
}

export class BcryptAdapter extends EncryptFactory {
  constructor() {
    super();
  }

  /**
   * encryptionMethod
   */
  public encryptionMethod(): Encryption {
    return new BcryptEncryption();
  }
}
