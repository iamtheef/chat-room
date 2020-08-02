import { server } from "./configuration";

export const io = require("socket.io").listen(server);

let users = [];

export const makeNewSocket = () => {
  //
  io.on("connection", (socket: any) => {
    socket.on("active", ({ username }) => {
      users.push({ id: socket.id, username });
      socket.broadcast.emit("message", `${username} has joined the chat.`);
    });

    socket.on("join", (id: string) => {
      // socket.join();
      // socket.broadcast.emit.to();
    });

    socket.on("incoming", (msg: string, username: string) => {
      io.emit("message", username, msg);
    });

    socket.on("disconnect", () => {
      let disconnected = users.find((user) => user.id == socket.id);
      users = users.filter((user) => user.id !== socket.id);
      if (disconnected) {
        socket.broadcast.emit(
          "message",
          `${disconnected.username} has left the chat.`
        );
      }
    });
  });
};
