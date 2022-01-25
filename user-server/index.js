const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
}
);
io.on("connection", function (socket) {
  // connection built
  console.log("New User connected");
  // event emitter to click
  socket.on("click-operations", function (data) {
    io.emit("new-click-operations", data);
  });
  // event emitter that undo's
  socket.on("undo-operations", function (data) {
    io.emit("new-remote-undo", data);
  });
});

server.listen(4000, () => {
  console.log('Server up and running!!!');
});