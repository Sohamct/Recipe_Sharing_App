const express = require('express')
const MessageModel = require('../models/messageModel');
const router = express.Router();
const User = require('../models/userModel');
const chatModel = require('../models/chatModel');

// addMessage
router.post('/', async (req, resp) => {
    try {
        const { chatId, sender, text } = req.body;
        const isChatExist = await chatModel.findOne({_id: chatId});
        if(!isChatExist){
            return resp.status(404).send("Chat itself not found!")
        }
        const message = new MessageModel({
            chatId: chatId,
            sender,
            text
        });
        const result = await message.save();
        resp.status(200).json({ message: "Message created successfully", data: result, status: true });
    } catch (error) {
        resp.status(500).json(error); // Use status(500) instead of send(500)
    }
});

// getMessage
router.get('/:chatId', async (req, resp) => {
    try {
        console.log("Message fetching");
        console.log(req.params.chatId);
        const { chatId } = req.params;

        const isChatExist = await chatModel.findOne({_id: chatId})

        if(!isChatExist){
            return resp.status(404).send("Chat itself not found!")
        }

        const messages = await MessageModel.find({ chatId });
        if (!messages) {
            return resp.status(404).json({ message: "Messages not found for chatId", status: false });
        }
        resp.status(200).json({ message: "Messages found successfully", data: messages, status: true });
    } catch (error) {
        resp.status(500).json(error); // Use status(500) instead of send(500)
    }
});

module.exports = router;
