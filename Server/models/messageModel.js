const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatId: {
        ref: 'Chat',
        required: true,
        type: String
    },
    sender: {
        type: String,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
})
module.exports = mongoose.model("Message", MessageSchema)
