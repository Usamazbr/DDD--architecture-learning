// import { UseCase } from '../../../domain/services/useCase.js';
// import { Application} from 'express';
//TODO Authenticator
export class TokenFactory {
    createToken(id, time) {
        // Call the factory method to create a Product object.
        const token = this.tokenMethod();
        // Now, use the product.
        return token.tokenGenerator(id, time);
    }
    verifyToken(req, res, next) {
        // Call the factory method to create a Product object.
        const token = this.tokenMethod();
        // Now, use the product.
        token.tokenVerifier(req, res, next);
    }
}
export class EncryptFactory {
    encryptionOperation(password) {
        // Call the factory method to create a Product object.
        const encryption = this.encryptionMethod();
        // Now, use the product.
        return encryption.encryption(password);
    }
    compareEncryptionOperation(password, hashed) {
        // Call the factory method to create a Product object.
        const encryption = this.encryptionMethod();
        // Now, use the product.
        return encryption.compare(password, hashed);
    }
}
