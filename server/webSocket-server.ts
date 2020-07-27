import { server } from "./configuration";

export const io = require("socket.io").listen(server);

let connected = [];

export const socketServer = () => {
  io.sockets.on("connection", (socket: any) => {
    connected.push(socket);

    socket.on("new-message", (msg: string, username: string) => {
      io.emit("new-message", msg, username);
      console.log(username, msg);
    });

    socket.on("connected");

    socket.broadcast.emit("");

    socket.on("disconnect", (socket: any) => {
      io.emit("message", "left the chat");
      connected.splice(connected.indexOf(socket), 1);
    });
  });
};
