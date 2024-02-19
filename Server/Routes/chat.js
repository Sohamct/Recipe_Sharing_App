const express = require('express')
const chatModel = require('../models/chatModel');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router()

// create new chat
router.post('/', fetchUser, async(req, resp) => {
    console.log('creating new chat');
    try{
        const newChat = new chatModel({
            members: [req.body.sender, req.body.receiver]
        });

        const result = await newChat.save();
        resp.status(200).json({message: "Chat created successfully", data:result, status:true});
    }catch(error){
        resp.status(500).json(error);
    }
})
// get the all chat of user
router.get('/fetchAllChats', fetchUser, async (req, resp) => {
    try{
        const username = req.user.username;
        console.log(username);
        const chats = await chatModel.find({
            members: {$in: username}
        });
        console.log(chats)
        if(!chats){
            resp.status(404).json({message: "Chats are not found for userid", status:false})
        }
        resp.status(200).json({message: "Chats found successfully",data:chats, status:true}); // array

    }catch(error){
        resp.status(500).json(error);
    }
})
// finding specific chat
router.get('/find/:first/:second', async (req, resp) => {
    try{
        const chat = await chatModel.findOne({
            members: {$all: [req.params.first, req.params.second]}
        })
        if(!chat){
            resp.status(404).json({message: "Chat is not found for userid", status:false})
        }
        resp.status(200).json({message: "Chats found successfully",data:chat, status:true}); // array

    }catch(error){
        resp.status(500).json(error);
    }
})
module.exports = router;
