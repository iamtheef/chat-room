import { server } from "./configuration";

export const io = require("socket.io").listen(server);

export const socketServer = () => {
  io.sockets.on("connection", (socket: any) => {
    socket.on("incoming", (msg: string, username: string) => {
      io.emit("new-message", username, msg);
    });

    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
    });
  });
};
