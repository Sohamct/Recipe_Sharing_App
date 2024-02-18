const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let activeUsers = [];

io.on("connection", (socket) => {
    // Add new User
    socket.on('new-user-add', (newUsername) => {
        // Check if user is not added previously
        if (!activeUsers.some((user) => user.username === newUsername)) {
            activeUsers.push({
                username: newUsername,
                socketId: socket.id // Provided by socket connection (unique)
            });
        }
        console.log("Connected Users", activeUsers);
        io.emit('get-users', activeUsers);
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        io.emit('get-users', activeUsers);
    });

    socket.on('send-message', (data) => {
        const {recieverUsername} = data;
        console.log("Dara: ", data)
        
        console.log("recieverusername: ", recieverUsername)
        const recieverActiveUser = activeUsers.find((user) => user.username === recieverUsername);
        console.log("Sending from socket to: ", recieverUsername);
        console.log(data);
        if(recieverActiveUser){
            io.to(recieverActiveUser.socketId).emit("recieve-message" ,data);
        }
    })
});
