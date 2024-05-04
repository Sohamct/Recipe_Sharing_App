const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  time: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: null
  },
  repliedTo: {
    type: String,
    enum: ['recipe', 'user'],
    required: true
  },
  _from: {
    type: String,
    ref: 'User',
    required: true
  },
  _to: {
    type: mongoose.Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('Comment', commentSchema)
