const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serve index.html, main.js, style.css, etc.

io.on("connection", (socket) => {
  console.log("A user connected");

  // listen for incoming messages
  socket.on("chat message", (data) => {
    // send the message to ALL connected clients
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
