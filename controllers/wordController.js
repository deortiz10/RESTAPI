const express = require('express');

function wordsController(Word) {
  function post(req, res){
    const word = new Word (req.body);
    if(!req.body.word){
      res.status(400);
      return res.send('word is required');
    }
    word.save();
    res.status(201);
    return res.json(word);
  }

  function get(req, res) {
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
  }
  return { post, get };
}

module.exports = wordsController;
