class PasswordValueObject {
    password;
    constructor(password) {
        if (password.length < 8 || password.length > 50) {
            throw new Error("Password must be between 8 and 50 characters");
        }
        this.password = password;
    }
    toString() {
        return this.password;
    }
}
export { PasswordValueObject };
