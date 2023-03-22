export class TokenFactory {
    /**
     * secretKey
     */
    secretKey() {
        const tokenAdapter = this.tokenMethod();
        return tokenAdapter.secretOut();
    }
    createToken(id, time) {
        // Call the factory method to create a Product object.
        const tokenAdapter = this.tokenMethod();
        // Now, use the product.
        return tokenAdapter.tokenGenerator(id, time);
    }
    verifyToken(token) {
        console.log(token);
        // Call the factory method to create a Product object.
        const tokenAdapter = this.tokenMethod();
        // Now, use the product.
        tokenAdapter.tokenVerifier(token);
    }
}
