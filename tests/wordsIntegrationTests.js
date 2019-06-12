const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
process.env.ENV = 'Test';
const app = require('../app.js');

const Word = mongoose.model('Word');
const agent = request.agent(app);

describe('Word Crud test', ()=> {
  it('should allow a word beign posted and return read and _id', (done) => {
    const wordPost = {id:15, word:"mellifluous", meaning: "smooth and sweet sounding", type:"adj", example:"granny thought the music tobe themost melliflous ever written"};
    agent.post('/api/words')
      .send(wordPost)
      .expect(200)
      .end((err, results) => {
      //  console.log(results);

        results.body.should.have.property('_id');
        done();
      })
  });

  afterEach( (done) => {
    Word.deleteMany({}).exec()
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());

  })
});
