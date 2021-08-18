const express=require('express')
const app=express();
const path =require('path')



app.set('port',process.env.PORT || 3031)
app.use(express.static(path.join(__dirname,'public')))

//start the server o iniciar server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// declaramos websockets
io.on('connection',(socket) => {
    console.log('new Conecction', socket.id);
    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
   
});


