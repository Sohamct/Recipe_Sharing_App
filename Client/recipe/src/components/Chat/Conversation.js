import React, { useEffect, useState } from 'react';
import { useUser } from '../../features/UserContext';
import { CgProfile } from 'react-icons/cg';
import AuthService from '../Auth/Auth.service';
import ReactLoading from 'react-loading';

export const Conversation = ({ chat, online }) => {
    const { username } = useUser();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Find the other member's username
                const otherUsername = chat.members.find(uname => uname !== username);
                console.log(otherUsername)
                // Fetch user details using the other member's username
                const response = await AuthService.getDetails(otherUsername);
                setUserData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();
    }, [chat, username]);

    return (
        <div className="follower conversation" >
            <div>
            {online ? (<div className="online-dot"></div>)
            : ''
            }
                {isLoading ? (
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <ReactLoading
        type="spinningBubbles"
        color="#FFA500"
        height={100}
        width={55}
    />
</div>
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
                            <br />
                            <span>{online ? 'Online' : 'Offline'}</span>
                        </div>
                    </>
                )}
            </div>
            <hr style={{width: '85%', border:'1px solid'}}/>
        </div>
    );
};
