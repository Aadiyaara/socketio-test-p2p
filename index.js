    
var express = require('express')
var socket = require('socket.io')

// App setup
var app = express()
var server = app.listen(process.env.PORT || 4000 , function(){
    console.log('listening for requests on port 4000,')
})

// Static files
// app.use(express.static('public'))

// Socket setup & pass server
var io = socket(server)
io.on('connection', (socket) => {

    console.log('made socket connection', socket.request.url.split('userId=')[1].split('&EIO=')[0])
    // console.log('Connections: ', io.sockets.clients())
    // Handle chat event
    // socket.on('join', function(room) {
    //     console.log('Socket with Socket Id: ',  socket.id, ' as joined room: ', room)
    room = socket.request.url.split('userId=')[1].slice(0,7)
    socket.join(room)

    socket.on('chat', function(data){
        socket.broadcast.to(room).emit('chat', data)
    })

    socket.on('state', function(data){
        socket.broadcast.to(room).emit('state', data)
        console.log('State data exchanged')
    })

})