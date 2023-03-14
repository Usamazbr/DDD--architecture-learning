class EmailValueObject {
    email;
    constructor(email) {
        if (!this.validateEmail(email)) {
            throw new Error("Invalid email address");
        }
        this.email = email;
    }
    toString() {
        return this.email;
    }
    validateEmail(email) {
        // Simple email validation regex
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
}
export { EmailValueObject };
