const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//const db = mongoose.connect('mongodb://localhost/WordsAPI');

const port =  4000;
//const wordRouter = express.Router();
const Word = require('./models/wordModel.js');
const wordRouter = require('./routes/wordRouter')(Word);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


if(process.env.ENV === 'Test'){
  const db = mongoose.connect('mongodb://localhost/WordsAPI_Test');
} else {
  console.log('this is a test');
  mongoose.connect('mongodb://localhost/WordsAPI-prod', {useNewUrlParser: true});
  var db = mongoose.connection;
}

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names);
//
//     });
// });



app.use('/api', wordRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.server = app.listen(port, () => {
  console.log(`Running the API port ${port}`);
});

module.exports = app;
