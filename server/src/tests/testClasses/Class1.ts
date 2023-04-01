export class Class1 {
  constructor() {
    console.log(`Hi mom`);
  }
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
    return this.testAdd(arg1, arg2);
  }
  /**
   * testMethod2
   */
  public testMethod2() {
    return this.testMethod1;
  }
}
