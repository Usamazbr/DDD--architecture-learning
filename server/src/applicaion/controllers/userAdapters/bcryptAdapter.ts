import bcrypt from "bcrypt";
import {Encryption, EncryptFactory} from "../../usecases/ports/port2.js";

class BcryptEncryption implements Encryption {
  /**
   * encryption
   */
  public async encryption(password: string) {
    const salt = 10;
    const enrate = await bcrypt.genSalt(salt);
    const hashed = await bcrypt.hash(password, enrate);
    return {hashed, level: salt};
  }
  /**
   * compare
   */
  public async compare(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash);
    return match;
  }
}

export class BcryptAdapter extends EncryptFactory {
  /**
   * encryptionMethod
   */
  public encryptionMethod(): Encryption {
    return new BcryptEncryption();
  }
}