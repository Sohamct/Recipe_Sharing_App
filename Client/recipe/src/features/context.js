// UserProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Check if user info exists in local storage on component mount
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const setUser = (user) => {
        // Set username in both state and local storage
        setUsername(user.username);
        console.log(user.username);
        localStorage.setItem('username', user.username);
    }

    return (
        <UserContext.Provider value={{username, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}

