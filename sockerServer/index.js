const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', (socket) => {
  console.log("Baglantı ok ", socket.client.id)

  socket.on("ready", () => {
    // socket.emit("get client id", socket.client.id)
    io.to(socket.client.id).emit("get client id", socket.client.id)

    socket.on("send message", (message) => {
      io.emit("listen message", message);
    })

    socket.on('disconnect', () => {

    });

  })

});



server.listen(3001);
