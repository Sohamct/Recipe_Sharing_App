require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

// const fetchUser = (req, res, next) => {
//     const JWT_SECRET = process.env.JWT_SECRET;
//     // console.log(JWT_SECRET);
//     try {
//         const token = req.header('auth-token');
//         // console.log("token: ",token)
//         if (!token) {
//             return res.status(401).json({ error: "Please login to RecipeBook System" });
//         }

//         const data = jwt.verify(token, JWT_SECRET);

//         if (!data.user) {
//             throw new Error('Invalid token format');
//         }
//         console.log(data.user);

//         req.user = data.user;
//         next();
//     } catch (error) {
//         console.error("Error:", error.message);

//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: "Invalid token" });
//         }

//         return res.status(401).json({ error: "Unexpected error while connecting with RecipeBook, please try again later..." });
//     }
// }

// module.exports = fetchUser;


// fetchUser middleware
const fetchUser = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: "Please login to RecipeBook System" });
        }

        const data = jwt.verify(token, JWT_SECRET);

        if (!data.user) {
            throw new Error('Invalid token format');
        }

        // Fetch all user details from the database using the user ID
        const user = await User.findById(data.user.id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error:", error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }

        return res.status(401).json({ error: "Unexpected error while connecting with RecipeBook, please try again later..." });
    }
};

module.exports = fetchUser;
