const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  status: { type: String, enum: ['To Read', 'Reading', 'Read'], required: true },
  cover: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);


