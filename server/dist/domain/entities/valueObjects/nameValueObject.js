class NameValueObject {
    name;
    constructor(name) {
        if (name.length < 2 || name.length > 50) {
            throw new Error("Name must be between 2 and 50 characters");
        }
        this.name = name;
    }
    toString() {
        return this.name;
    }
}
export { NameValueObject };
