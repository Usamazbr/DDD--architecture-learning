export class Class1 {
    constructor() {
        console.log(`Hi mom`);
    }
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
        return this.testAdd(arg1, arg2);
    }
    /**
     * testMethod2
     */
    testMethod2() {
        return this.testMethod1;
    }
}
