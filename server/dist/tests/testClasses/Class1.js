export class Class1 {
    constructor() { }
    /**
     * testAdd
     */
    testAdd(arg1, arg2) {
        return arg1 + arg2;
    }
    /**
     * testMethod1
     */
    testMethod1(arg1, arg2) {
        this.testVoid();
        return this.testAdd(arg1, arg2);
    }
    /**
     * testMethod2
     */
    testMethod2() {
        return this.testMethod1;
    }
    /**
     * testCallback
     */
    testCallback(callback) {
        callback();
    }
    /**
     * testVoid
     */
    testVoid() {
        console.log(`hi mom`);
    }
    /**
     * testPromise
     */
    async testPromise() {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 3000);
        });
        return result * 2;
    }
}
