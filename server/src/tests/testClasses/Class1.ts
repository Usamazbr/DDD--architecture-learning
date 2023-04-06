export class Class1 {
  constructor() {}
  /**
   * testAdd
   */
  public testAdd(arg1: number, arg2: number) {
    return arg1 + arg2;
  }
  /**
   * testMethod1
   */
  public testMethod1(arg1: number, arg2: number): number {
    this.testVoid();
    return this.testAdd(arg1, arg2);
  }
  /**
   * testMethod2
   */
  public testMethod2() {
    return this.testMethod1;
  }
  /**
   * testCallback
   */
  public testCallback(callback: () => void) {
    callback();
  }
  /**
   * testVoid
   */
  public testVoid() {
    console.log(`hi mom`);
  }
  /**
   * testPromise
   */
  public async testPromise() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
      }, 3000);
    });
    return <number>result * 2;
  }
}
