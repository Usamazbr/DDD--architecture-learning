import { EncryptFactory } from "../../usecases/ports/port2.js";
class BcryptEncryption {
    operation() {
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
    encryptionMethod() {
        return new BcryptEncryption();
    }
}
