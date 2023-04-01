import {expect} from "chai";
import sinon from "sinon";
import {Class1} from "./testClasses/Class1.js";

describe(`testMethod`, () => {
  let firstObj: any;
  beforeEach(() => {
    firstObj = new Class1();
  });
  it(`Stub method`, () => {
    const stub = sinon.stub(firstObj, `testAdd`);
    stub.withArgs(1, 2).onFirstCall().returns(5).onSecondCall().returns(234);
    expect(firstObj.testAdd(1, 2)).to.be.equal(5);
    expect(firstObj.testAdd(1, 2)).to.be.equal(234);
  });
});
