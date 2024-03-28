import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../Auth/Auth.service';
import { CgProfile } from 'react-icons/cg';
import { getMessages } from '../../app/service/MessageApi';
import './ChatBox.css';
import InputEmoji from 'react-input-emoji';
import { addMessage } from '../../app/service/MessageApi';
import ReactLoading from 'react-loading';

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
        // console.log(messages);
        const recieverUsername = chat.members.find((uname) => uname !== username);
        // console.log(recieverUsername);
        setSendMessage({ ...message, recieverUsername });

    }
    const timeAgo = (date) => {
        
        const now = new Date();
        const past = new Date(date);
        const seconds = Math.floor((now - past) / 1000);

        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            return interval + " year" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " month" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
        }
        return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
    }

    // always scroll to the last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="ChatBox-container">
            {
                chat ? (
                    <>
                        <div className="chat-header p-0 m-0">
                            <div className="flex follower">
                                {isLoadingUserData ? (
                                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ReactLoading type="balls" color="#FFA500"
                                        height={150} width={90} /></div>
                                ) : (
                                    <>
                                        <div className='flex'>
                                            <CgProfile
                                                className="followerImage"
                                                style={{ width: '40px', height: '40px' }}
                                                alt="Profile Image"
                                            />
                                            <div className="name mt-2.5 px-2" style={{ fontSize: '0.8rem' }}>
                                                <span>
                                                    {userData?.firstname} {userData?.lastname}
                                                </span>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <hr />
                        </div>
                        <div className='chat-body my-2 p-3'>
                            {isLoadingMessages ? (
                                "Loading..."
                            ) : (
                                messages.map((message) => (
                                    <div ref={scroll} className=
                                        {message.sender === username
                                            ? "message own" : "message"}
                                        key={message._id}>
                                        <span>{message.text}</span>
                                        <span>{timeAgo(message.createdAt)}</span>
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
                            <button className='p-2 mr-2 bg-green-500'
                                onClick={handleSend}>
                                Send
                            </button>
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
