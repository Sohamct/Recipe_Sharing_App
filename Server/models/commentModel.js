

const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    repliedTo: {
        type: String,
        enum: ['recipe', 'user'],
        required: true
    },
    _from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: {
            $cond: {
                if: { $eq: ['$repliedTo', 'recipe'] },
                then: 'Recipe',
                else: 'User'
            }
        }
    }
});


module.exports = {
  Comment: mongoose.model('Comment', chatSchema),
};
