const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordModel = new Schema(
  {
    id: { type: Number },
    word: { type: String },
    meaning: { type: String },
    type: { type: String },
    example: { type: String }
  }, { collection: 'words'}
);

module.exports = mongoose.model('Word', WordModel);
