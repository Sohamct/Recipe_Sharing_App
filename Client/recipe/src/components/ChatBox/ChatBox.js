import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../Auth/Auth.service';
import { CgProfile } from 'react-icons/cg';
import { getMessages } from '../../app/service/MessageApi';
import './ChatBox.css';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
import { addMessage } from '../../app/service/MessageApi';

const ChatBox = ({ chat, username, setSendMessage, recieveMessage }) => {
    const [userData, setUserData] = useState(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const scroll = useRef();

    useEffect(() => {
        if (recieveMessage != null && recieveMessage.chatId === chat._id) {
            setMessages([...messages, recieveMessage])
        }
    }, [recieveMessage])
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingUserData(true);
                const otherUsername = chat.members.find(uname => uname !== username);
                const response = await AuthService.getDetails(otherUsername);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoadingUserData(false);
            }
        };

        if (chat) fetchData();
    }, [chat, username]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoadingMessages(true);
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setIsLoadingMessages(false);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            sender: username,
            text: newMessage,
            chatId: chat._id
        }
        try {
            const { data } = await addMessage(message);
            console.log(data);
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
        // send message to socket server
        console.log(messages);
        const recieverUsername = chat.members.find((uname) => uname !== username);
        console.log(recieverUsername);
        setSendMessage({ ...message, recieverUsername });

    }

    // always scroll to the last message
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior : "smooth"})
    }, [messages])

    return (
        <div className="ChatBox-container">
            {
                chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                {isLoadingUserData ? (
                                    'Loading...'
                                ) : (
                                    <>
                                        <CgProfile
                                            className="followerImage"
                                            style={{ width: '40px', height: '40px' }}
                                            alt="Profile Image"
                                        />
                                        <div className="name" style={{ fontSize: '0.8rem' }}>
                                            <span>
                                                {userData?.firstname} {userData?.lastname}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='chat-body'>
                            {isLoadingMessages ? (
                                "Loading..."
                            ) : (
                                messages.map((message) => (
                                    <div ref={scroll} className=
                                    {message.sender === username 
                                    ? "message own" : "message"} 
                                    key={message._id}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                ))
                            )}

                        </div>

                        {/* chat sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji value={newMessage}
                                onChange={handleChange}
                            />
                            <div className='send-button button'
                                onClick={handleSend}>
                                Send
                            </div>
                        </div>
                    </>
                )
                    : (
                        <span className='chatbox-empty-message'>
                            Tap on a chat to start convesation...
                        </span>
                    )
            }

        </div>
    );
};

export default ChatBox;