import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        console.log("UserProvider useEffect triggered");
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            console.log("Stored username found:", storedUsername);
            setUsername(storedUsername);
        }
    }, []);

    const setUser = (user) => {
        setUsername(user.username);
        console.log("User set to:", user.username);
        localStorage.setItem('username', user.username);
    }

    console.log("UserProvider rendered");

    return (
        <UserContext.Provider value={{ username, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}
