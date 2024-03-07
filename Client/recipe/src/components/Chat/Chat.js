import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Link } from 'react-router-dom';
import { useUser } from '../../features/context';
import useChatStore from '../../features/chat/chatStore';
import { Conversation } from './Conversation';
import { IoNotifications } from 'react-icons/io5';
import { FaCommentAlt } from 'react-icons/fa';
import './RightSide/RightSide.css';
import { IoMdHome } from 'react-icons/io';
import ChatBox from '../ChatBox/ChatBox';
import { io } from 'socket.io-client';

export const Chat = () => {
    const { username } = useUser();
    const { chatsByUser, fetchChats } = useChatStore((state) => ({
        chatsByUser: state.chatsByUser,
        fetchChats: state.fetchChats,
    }));

    const [currentChat, setCurrentChat] = useState();
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const [sendMessage, setSendMessage] = useState(null);
    const [recieveMessage, setReceiveMessage] = useState();

    // Create the uniqueUsernames Set
    const uniqueUsernames = new Set();

    // send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            console.log(sendMessage);
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        console.log('fetchChats called');
        if (loading) {
            fetchChats();
            setLoading(false);
        }
        console.log(chatsByUser);
    }, []);

    useEffect(() => {
        console.log('chatsByUser updated:', chatsByUser);
    }, [chatsByUser]);

    useEffect(() => {
        if (username) {
            socket.current = io('http://localhost:8800');
            socket.current.emit('new-user-add', username);
            socket.current.on('get-users', (users) => {
                setOnlineUsers(users);
                console.log(onlineUsers);
            });
        }
    }, [username]);

    // recieve message from socket server
    useEffect(() => {
        if (username) {
            socket.current.on('recieve-message', (data) => {
                setReceiveMessage(data);
            });
        }
    }, [username]);

    const checkOnlineStatus = (chat) => {
        const otherMembers = chat.members.filter((member) => member !== username);
        const online = onlineUsers.some((user) => otherMembers.includes(user.username));
        return online;
    };

    return (
        <div className="Chat">
            {/* Left side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {!loading &&
                            chatsByUser.map((chat, ind) => {
                                const online = checkOnlineStatus(chat);
                                const chatMember = chat.members.find((member) => member !== username);

                                // Check if the user is already added to the uniqueUsernames Set
                                if (!uniqueUsernames.has(chatMember)) {
                                    uniqueUsernames.add(chatMember);

                                    return (
                                        <div key={ind} className="Chat-item" onClick={() => setCurrentChat(chat)}>
                                            <Conversation chat={chat} online={online} uniqueUsernames={uniqueUsernames} />
                                        </div>
                                    );
                                }

                                return null; // Skip rendering for duplicate users
                            })}
                    </div>
                </div>
            </div>
            {/* Right side */}
            <div className="Right-side-chat">
                <div>
                    <div className="navIcons p-2 ">
                        <Link to="/">
                            <IoMdHome />
                        </Link>
                        <IoNotifications/>
                        <FaCommentAlt />
                    </div>
                </div>
                <ChatBox chat={currentChat} username={username} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
            </div>
        </div>
    );
};

export default Chat;
