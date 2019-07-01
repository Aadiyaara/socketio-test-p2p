    
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

    console.log('made socket connection', socket)
    // console.log('Connections: ', io.sockets.clients())
    // Handle chat event
    socket.on('chat', function(data){
        socket.broadcast.emit('chat', data)
    })

})