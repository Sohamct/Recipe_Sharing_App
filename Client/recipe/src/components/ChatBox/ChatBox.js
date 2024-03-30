import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../Auth/Auth.service';
import { CgProfile } from 'react-icons/cg';
import { getMessages } from '../../app/service/MessageApi';
import './ChatBox.css';
import InputEmoji from 'react-input-emoji';
import { addMessage } from '../../app/service/MessageApi';
import ReactLoading from 'react-loading';
import {format} from 'timeago.js'

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
                console.log(otherUsername);
                const response = await AuthService.getDetails(otherUsername);
                console.log(response.data.data);

                setUserData(prevUserData => response.data.data); // Use functional update here
                console.log(userData);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoadingUserData(false);
            }
        };
    
        fetchData();
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
                                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ReactLoading type="balls" color="#FFA500"
                                        height={150} width={90} /></div>
                                ) : (
                                    <>
                                        <div className='flex'>
                                        {
    userData?.profileImage?.url ? 
    (
        <img 
            src={userData.profileImage.url} 
            style={{ width: '40px', height: '40px' }}
        />
    ) : (
        <CgProfile
            className="followerImage"
            style={{ width: '40px', height: '40px' }}
            alt="Profile Image"
        />
    )
}

                                            
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
                                            ? "message own" : "message received"}
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
