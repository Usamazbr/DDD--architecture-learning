// import { UseCase } from '../../../domain/services/useCase.js';
// import { Application} from 'express';
//TODO Authenticator
export class TokenFactory {
    createToken(id) {
        // Call the factory method to create a Product object.
        const token = this.tokenMethod(id);
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${token.tokenGenerator()}`;
    }
}
export class EncryptFactory {
    someOperation() {
        // Call the factory method to create a Product object.
        const encryption = this.encryptionMethod();
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${encryption.operation()}`;
    }
}
