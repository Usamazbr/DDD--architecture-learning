import {expect} from "chai";
import sinon from "sinon";
import {Class1} from "../testClasses/Class1.js";
import {describe, it} from "mocha";

// Spies
describe(`testMethodSpies`, () => {
  // before(() => {
  //   console.log(`\n \x1b[33m ------ concerned test Start\n\x1b[0m`);
  // });
  // after(() => {
  //   console.log(`\n \x1b[33m ------ concerned test End\x1b[0m`);
  // });
  let firstObj: Class1;
  beforeEach(() => {
    firstObj = new Class1();
  });
  it(`spying add`, () => {
    const spy = sinon.spy(firstObj, `testAdd`);
    const arg1 = 1,
      arg2 = 2;
    firstObj.testMethod1(arg1, arg2);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(1, 2)).to.be.true;
  });
  it(`basic callback`, () => {
    const callBack = sinon.spy();
    firstObj.testCallback(callBack);
    expect(callBack.calledOnce).to.be.true;
  });

  // Mock
  it(`basic Mock`, () => {
    const mock = sinon.mock(firstObj).expects(`testVoid`).exactly(2).withArgs();
    firstObj.testMethod1(2, 3);
    firstObj.testMethod1(2, 9);
    mock.verify();
  });
});

// Stubs
describe(`testing stubs`, () => {
  let firstObj: Class1;
  beforeEach(() => {
    firstObj = new Class1();
  });
  it(`stubbing add`, () => {
    const stub = sinon.stub(firstObj, `testAdd`);
    stub.withArgs(1, 2).onFirstCall().returns(132).onSecondCall().returns(89);
    sinon.mock(firstObj).expects(`testVoid`).exactly(2);
    expect(firstObj.testMethod1(1, 2)).to.be.equal(132);
    expect(firstObj.testMethod1(1, 2)).to.be.equal(89);
  });
});

// Promises
describe(`testing Promises`, () => {
  before(() => {
    console.log(`\n \x1b[33m ------ concerned test Start\n\x1b[0m`);
  });
  after(() => {
    console.log(`\n \x1b[33m ------ concerned test End\x1b[0m`);
  });
  let firstObj: any;
  beforeEach(() => {
    firstObj = new Class1();
  });
  it(`Promise test case`, async () => {
    const result = await firstObj.testPromise();
    expect(result).to.be.equal(6);
    expect(true).to.be.true;
  });
});

// // Garbage
describe.skip(`testMethod`, () => {
  let firstObj: Class1;
  //   let secondObj: any;
  beforeEach(() => {
    firstObj = new Class1();
    // secondObj = new Class1();
  });
  it(`Stub method`, () => {
    const stub = sinon.stub(firstObj, `testAdd`);
    stub.withArgs(1, 2).onFirstCall().returns(5);
    // .onSecondCall().returns(234);
    expect(firstObj.testMethod1(1, 2)).to.be.equal(5);
    // expect(firstObj.testMethod1(1, 2)).to.be.equal(3);
  });
});
