import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("UserProvider useEffect triggered");
        if(!user){
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                console.log("Stored user found:", storedUser);
                setUser(storedUser);
            }
        }
        setLoading(false);
    }, []);
    const setUserDetail = (user) => {
        setUser(user);
        console.log("User set to:", user);
        localStorage.setItem('user', JSON.stringify(user)); // Stringify user object before storing
    }

    console.log("UserProvider rendered");

    return (
        <UserContext.Provider value={{ user, setUserDetail, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}
