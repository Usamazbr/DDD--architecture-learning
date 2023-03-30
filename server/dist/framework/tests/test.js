export {};
// import request from 'supertest';
// import app from './app';
// describe('GET /', () => {
//   it('should return "Hello, world!"', (done) => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end((err, res) => {
//         expect(res.text).to.equal('Hello, world!');
//         done();
//       });
//   });
// });
// describe('GET / with stub', () => {
//   it('should return "Hello, world!" using stub', async () => {
//     const getStub = stub().returns('Hello, world!');
//     app.get('/', getStub);
//     const res = await request(app).get('/');
//     expect(getStub.calledOnce).to.be.true;
//     expect(res.text).to.equal('Hello, world!');
//   });
// });
