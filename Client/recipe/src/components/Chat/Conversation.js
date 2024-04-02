import React, { useEffect, useState } from 'react';
import { useUser } from '../../features/context';
import { CgProfile } from 'react-icons/cg';
import AuthService from '../Auth/Auth.service';
import ReactLoading from 'react-loading';

export const Conversation = ({ chat, online, uniqueUsernames }) => {
    const { username } = useUser();
    const [userData, setUserData] = useState(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);

    useEffect(() => {
        // Cleanup function for when the component unmounts
        return () => {
            if (uniqueUsernames && uniqueUsernames.clear) {
                uniqueUsernames.clear();
            };
        };
    }, [uniqueUsernames]);

    const fetchData = async () => {
        try {
            setIsLoadingUserData(true);
            const otherUsername = chat.members.find(uname => uname !== username);
            const response = await AuthService.getDetails(otherUsername);

            // Check if response.data exists and has necessary properties
            if (response?.data?.success) {
                const userData = response.data.data;
                setUserData(userData);
            } else {
                console.error('Error: Invalid response data format');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoadingUserData(false);
        }
    };

    useEffect(() => {
        // Fetch user details when the chat prop changes
        fetchData();
    }, [chat, username]);

    return (
        <div className=" items-center justify-between follower conversation">
            {online && <div className="online-dot"></div>}
            {isLoadingUserData ? (
                <div className="flex items-center justify-center mt-5">
                    <ReactLoading type="spinningBubbles" color="#FFA500" height={100} width={55} />
                </div>
            ) : (
                <div className='flex'>

                    {userData && userData.profileImage ? (
                        <img
                            src={userData.profileImage.url}
                            alt="Profile Image"
                            className="followerImage w-12 h-12 rounded-full"
                        />
                    ) : (
                        <CgProfile className="followerImage w-10 h-10" />
                    )}
                    <div className="name text-base bg-center mx-4">
                        <span>
                            {userData?.firstname} {userData?.lastname}
                            <div className='mt-1 text-xs ital text-center'>{online ? '(Online)' : '(Offline)'}</div>
                        </span>
                        <br />
                    </div>
                </div>
            )}
            <hr className="w-full border-t border-gray-400" />
        </div>
    );
};
