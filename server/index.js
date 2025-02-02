const { Server } = require('socket.io')

const io = new Server(8000,{
    cors:true,
})

const emailToSocketIdMap  = new Map();
const socketIdToEmailMap = new Map();


io.on("connection",(socket) => {
    console.log("connected",socket.id);
    socket.on('room:join', data => {
        const { email,code } = data;
        emailToSocketIdMap.set(email,socket.id);
        socketIdToEmailMap.set(socket.id,email);
        io.to(code).emit("user:joined",{ email, id: socket.id });
        socket.join(code);
        io.to(socket.id).emit('room:join',data);
    })
});