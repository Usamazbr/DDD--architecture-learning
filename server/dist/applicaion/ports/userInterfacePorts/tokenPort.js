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
