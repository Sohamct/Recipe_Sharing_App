import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState(null);
    const [user, setUserDetails] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        // console.log("UserProvider useEffect triggered");
        if (!user) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                // console.log("Stored user found:", storedUser);
                setUserDetails(JSON.parse(storedUser)); // Parse the stored user string back to an object
            }
        }
    }, []);

    const setUser = (user) => {
        // Set username in both state and local storage
        setUsername(user.username);
        setUserDetails(user);
        
        // console.log("User to store:", user);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string before storing
    };

    return (
        <UserContext.Provider value={{username, user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}
