const express = require('express');
const wordController = require('../controllers/wordController');
function routes (Word) {
  const wordRouter = express.Router();
  const controller = wordController(Word);
  wordRouter.route('/words')
    .post(controller.post)
    .get(controller.get);

  wordRouter.use ('/words/:wordId', (req, res, next) => {
    Word.findById(req.params.wordId, (err, word) => {
      if (err){
        console.log('error');
        return res.send(err);
      }
      if(word) {
        req.word = word;
          return next();
      }
        return res.sendStatus(404);
    });

  });
  wordRouter.route('/words/:wordId')
      .get((req, res) => {
        const returnedWords = req.word.toJSON();
        returnedWords.links = {}
        returnedWords.links.FilteredByThisType = `http://${req.headers.host}/api/words/?type=${req.word.type}`;
        res.json(returnedWords);
      })
      .put((req, res) => {
        const {word} = req;
            word.id = req.body.id;
            word.word = req.body.word;
            word.meaning = req.body.meaning;
            word.type = req.body.type;
            word.example = req.body.example;
            req.word.save((err) => {
              if(err){
                return res.send(err);
              }
              return res.json(word);
            });
        })
      .patch((req, res) => {
        const {word} = req;
        if(req.body._id) {
          delete req.body._id;
        }
        Object.entries(req.body).forEach(item => {
          const key = item[0];
          const value = item[1];
          word[key] = value;
        });
        req.word.save((err) => {
          if(err){
            return res.send(err);
          }
          return res.json(word);
        });
      })
      .delete((req, res) => {
        req.word.remove((err) =>
      {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

      return wordRouter;
}

module.exports = routes;
