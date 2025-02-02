const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  bio: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model('author', Author)
