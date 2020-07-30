import { server } from "./configuration";

export const io = require("socket.io")(server);

export const makeNewSocket = () => {
  io.on("connection", (socket: any) => {
    //
    socket.on("connect", (username: string) => {
      socket.broadcast.emit("message", `${username} has joined the chat.`);
    });

    socket.on("incoming", (msg: string, username: string) => {
      io.emit("message", username, msg);
    });

    socket.on("disconnect", (username: string) => {
      socket.broadcast.emit("message", `${username} has left the chat.`);
    });
  });
};
