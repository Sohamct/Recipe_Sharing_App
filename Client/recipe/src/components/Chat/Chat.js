import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { useUser } from '../../features/context';
import useChatStore from '../../features/chat/chatStore';
import { Conversation } from './Conversation';
import './RightSide/RightSide.css';
import ChatBox from '../ChatBox/ChatBox';
import { io } from 'socket.io-client';
import { Navigation } from '../Navigation';
import '../../components/style.css';

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

    // State for sidebar width
    const [sidebarWidth, setSidebarWidth] = useState(22); // in percentage
    const isResizing = useRef(false);
    const startX = useRef(0);

    // Create the uniqueUsernames Set
    const uniqueUsernames = new Set();

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        if (loading) {
            fetchChats();
            setLoading(false);
        }
    }, [loading, fetchChats]);

    useEffect(() => {
        if (username) {
            socket.current = io('http://localhost:8800');
            socket.current.emit('new-user-add', username);
            socket.current.on('get-users', (users) => {
                setOnlineUsers(users);
            });
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            socket.current.on('recieve-message', (data) => {
                setReceiveMessage(data);
            });
        }
    }, [username]);

    const checkOnlineStatus = (chat) => {
        const otherMembers = chat.members.filter((member) => member !== username);
        return onlineUsers.some((user) => otherMembers.includes(user.username));
    };

    // Handlers for resizing
    const handleMouseDown = (e) => {
        isResizing.current = true;
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const newWidth = ((e.clientX / window.innerWidth) * 100);
            setSidebarWidth(Math.min(Math.max(newWidth, 10), 120)); // Restrict width between 10% and 40%
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div>
            <Navigation />
            <div className='content-padding'>
            <div className="Chat">
                {/* Left side */}
                <div 
                    className="Left-side-chat" 
                    style={{ width: `${sidebarWidth}%` }}
                >
                    <div className="Chat-container">
                        <h2>Chats</h2>
                        <div className="Chat-list">
                            {!loading && chatsByUser &&
                                chatsByUser?.map((chat, ind) => {
                                    const online = checkOnlineStatus(chat);
                                    const chatMember = chat.members.find((member) => member !== username);

                                    if (!uniqueUsernames.has(chatMember)) {
                                        uniqueUsernames.add(chatMember);

                                        return (
                                            <div key={ind} className="Chat-item" onClick={() => setCurrentChat(chat)}>
                                                <Conversation chat={chat} online={online} uniqueUsernames={uniqueUsernames} />
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                        </div>
                    </div>
                </div>
                {/* Divider */}
                <div 
                    className="divider"
                    onMouseDown={handleMouseDown}
                ></div>
                <div className="Right-side-chat my-3" style={{ width: `${100 - sidebarWidth}%` }}>
                    <ChatBox chat={currentChat} username={username} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
                </div>
            </div>
            </div>
        </div>
    );
};

export default Chat;

// import React, { useEffect, useRef, useState } from 'react';
// import './Chat.css';
// import { useUser } from '../../features/context';
// import useChatStore from '../../features/chat/chatStore';
// import { Conversation } from './Conversation';
// import './RightSide/RightSide.css';
// import ChatBox from '../ChatBox/ChatBox';
// import { io } from 'socket.io-client';
// import { Navigation } from '../Navigation';

// export const Chat = () => {
//     const { username } = useUser();
//     const { chatsByUser, fetchChats } = useChatStore((state) => ({
//         chatsByUser: state.chatsByUser,
//         fetchChats: state.fetchChats,
//     }));

//     const [currentChat, setCurrentChat] = useState();
//     const [loading, setLoading] = useState(true);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const socket = useRef();
//     const [sendMessage, setSendMessage] = useState(null);
//     const [recieveMessage, setReceiveMessage] = useState();

//     // Create the uniqueUsernames Set
//     const uniqueUsernames = new Set();

//     // send message to socket server
//     useEffect(() => {
//         if (sendMessage !== null) {
//             // console.log(sendMessage);
//             socket.current.emit('send-message', sendMessage);
//         }
//     }, [sendMessage]);

//     useEffect(() => {
//         console.log('fetchChats called');
//         if (loading) {
//             fetchChats();
//             setLoading(false);
//         }
//         // console.log(chatsByUser);
//     }, []);

//     useEffect(() => {
//         console.log('chatsByUser updated:', chatsByUser);
//     }, [chatsByUser]);

//     useEffect(() => {
//         if (username) {
//             socket.current = io('http://localhost:8800');
//             socket.current.emit('new-user-add', username);
//             socket.current.on('get-users', (users) => {
//                 setOnlineUsers(users);
//                 // console.log(onlineUsers);
//             });
//         }
//     }, [username]);

//     // recieve message from socket server
//     useEffect(() => {
//         if (username) {
//             socket.current.on('recieve-message', (data) => {
//                 setReceiveMessage(data);
//             });
//         }
//     }, [username]);

//     const checkOnlineStatus = (chat) => {
//         const otherMembers = chat.members.filter((member) => member !== username);
//         const online = onlineUsers.some((user) => otherMembers.includes(user.username));
//         return online;
//     };

//     return (
//         <div><Navigation />
//         <div className="content-padding Chat">
//             {/* Left side */}
//             <div className="Left-side-chat">
//                 <div className="Chat-container">
//                     <h2>Chats</h2>
//                     <div className="Chat-list">
//                         {!loading && chatsByUser &&
//                             chatsByUser?.map((chat, ind) => {
//                                 const online = checkOnlineStatus(chat);
//                                 const chatMember = chat.members.find((member) => member !== username);

//                                 // Check if the user is already added to the uniqueUsernames Set
//                                 if (!uniqueUsernames.has(chatMember)) {
//                                     uniqueUsernames.add(chatMember);

//                                     return (
//                                         <div key={ind} className="Chat-item" onClick={() => setCurrentChat(chat)}>
//                                             <Conversation chat={chat} online={online} uniqueUsernames={uniqueUsernames} />
//                                         </div>
//                                     );
//                                 }

//                                 return null; // Skip rendering for duplicate users
//                             })}
//                     </div>
//                 </div>
//             </div>
//             <div className="Right-side-chat my-3">
//                 <ChatBox chat={currentChat} username={username} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
//             </div>
//         </div>
//         </div>
//     );
// };

// export default Chat;
