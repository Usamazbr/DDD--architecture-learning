import bcrypt from "bcrypt";
import { EncryptFactory } from "../../../applicaion/ports/userInterfacePorts/encryptionPort.js";
class BcryptEncryption {
    /**
     * encryption
     */
    async encryption(password) {
        const salt = 10;
        const enrate = await bcrypt.genSalt(salt);
        const hashed = await bcrypt.hash(password, enrate);
        return { hashed, level: salt };
    }
    /**
     * compare
     */
    async compare(password, hash) {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
}
export class BcryptAdapter extends EncryptFactory {
    /**
     * encryptionMethod
     */
    encryptionMethod() {
        return new BcryptEncryption();
    }
}
