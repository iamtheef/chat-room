import { server } from "./configuration";

export const io = require("socket.io")(server, { pingTimeout: 600 });

export const makeNewSocket = () => {
  io.sockets.on("connection", (socket: any) => {
    //
    socket.on("connect", (username: string) => {
      socket.broadcast.emit("message", `${username} has joined the chat.`);
    });

    socket.on("incoming", (msg: string, username: string) => {
      io.emit("new-message", username, msg);
    });

    socket.on("disconnect", (username: string) => {
      socket.broadcast.emit("message", `${username} has left the chat.`);
    });
  });
};
