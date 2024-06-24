import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext({
    username: null,
    user: null,
    setUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [user, setUserDetails] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const updateUser = (user) => {
        // Set username in both state and local storage
        setUsername(user.username);
        setUserDetails(user);
        
        // Store user data in local storage
        localStorage.setItem('username', user.username);
        localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string before storing
    };

    useEffect(() => {
        // Sync state with local storage
        if (user) {
            localStorage.setItem('username', user.username);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ username, user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}

// import React, { createContext, useState, useContext, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({children}) => {
//     const [username, setUsername] = useState(null);
//     const [user, setUserDetails] = useState(null);

//     // useEffect(() => {
//     //     const storedUsername = localStorage.getItem('username');
//     //     if (storedUsername) {
//     //         setUsername(storedUsername);
//     //     }
//     // }, []);

//     // useEffect(() => {
//     //     // console.log("UserProvider useEffect triggered");
//     //     if (!user) {
//     //         const storedUser = localStorage.getItem('user');
//     //         if (storedUser) {
//     //             // console.log("Stored user found:", storedUser);
//     //             setUserDetails(JSON.parse(storedUser)); // Parse the stored user string back to an object
//     //         }
//     //     }
//     // }, []);

//     const setUser = (user) => {
//         // Set username in both state and local storage
//         setUsername(user.username);
//         setUserDetails(user);
        
//         // console.log("User to store:", user);
//         localStorage.setItem('username', user.username);
//         localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string before storing
//     };

//     return (
//         <UserContext.Provider value={{username, user, setUser}}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     return useContext(UserContext);
// }
