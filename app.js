const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//const db = mongoose.connect('mongodb://localhost/WordsAPI');

const port =  4000;
const wordRouter = express.Router();
const Word = require('./models/wordModel.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/WordsAPI', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); 

    });
});

wordRouter.route('/words')
  .post((req, res) => {
    const word = new Word (req.body);
    word.save();

    return res.status(201).json(word);
  })
  .get((req, res) => {
    const query = {}
    console.log(req.query);
    if( req.query.type){
      query.type = req.query.type;
    }
    Word.find(query, (err, word) => {
      if (err){
        console.log('error');
        return res.send(err);
      }
        return res.json(word);
    });
  });

  wordRouter.route('/words/:wordId')
    .get((req, res) => {

      Word.findById(req.params.wordId, (err, word) => {
        if (err){
          console.log('error');
          return res.send(err);
        }
          return res.json(word);
      });
    });

app.use('/api', wordRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(port, () => {
  console.log(`Running the API port ${port}`);
});
