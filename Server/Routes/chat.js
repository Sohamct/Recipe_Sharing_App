const express = require('express')
const chatModel = require('../models/chatModel');
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router()

// create new chat
router.post('/', fetchUser, async(req, resp) => {
    console.log('creating new chat', req.body);
    try{
        let user1 = await User.findOne({username: req.body.sender});
        if(!user1){
            return resp.status(404).send("User with provided username does not exists!");
        }
        user1 = await User.findOne({username: req.body.receiver});
        if(!user1){
            return resp.status(404).send("User with provided username does not exists!");
        }
        const isChatExist = await chatModel.findOne({members:{ $all: [req.body.sender, req.body.receiver]}});

        if(isChatExist){
            return resp.status(200).json({message: "Chat is opened!", isNew: false, data:true, status:true})
        }

        const newChat = new chatModel({
            members: [req.body.sender, req.body.receiver]
        });

        const result = await newChat.save();
        resp.status(200).json({message: "Chat created successfully", data:result, status:true, isNew: true});
    }catch(error){
        resp.status(500).json(error);
    }
})
// get the all chat of user
router.get('/fetchAllChats', fetchUser, async (req, resp) => {
    try{
        const username = req.user.username;
        console.log(username);

        const user1 = await User.findOne({username: username});
        if(!user1){
            return resp.status(404).send("User with provided username does not exists!");
        }

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
            return resp.status(404).json({message: "Chat is not found for user", status:false})
        }
        resp.status(200).json({message: "Chats found successfully",data:chat, status:true}); // array

    }catch(error){
        resp.status(500).json(error);
    }
})
module.exports = router;
