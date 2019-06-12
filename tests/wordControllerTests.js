const should = require('should');
const sinon = require('sinon');
const wordController = require('../controllers/wordController');

describe('Word controller tests: ', () => {
  describe('Post', () => {
    it('should not allow empty strings to the word', () => {
      const Word = function(word) { this.save = () => {} };

      const req= {
        body: {
          type: 'noun'
        }
      };

      const res= {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = wordController(Word);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0] [0]}`);
      res.send.calledWith('word is required').should.equal(true);
    });
  });
});
