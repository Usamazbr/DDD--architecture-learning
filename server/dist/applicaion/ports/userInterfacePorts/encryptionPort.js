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
