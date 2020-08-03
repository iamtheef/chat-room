import { server } from "./configuration";

export const io = require("socket.io").listen(server);

let users = [];

export const makeNewSocket = () => {
  //
  io.on("connection", (socket: any) => {
    //

    socket.on("active", ({ username }) => {
      users.push({ id: socket.id, username });
      console.log(users);
    });

    socket.on("join", ({ username }: { username: string }) => {
      console.error("JOIN!!");
      let user = users.find((user) => user.username === username);
      if (user) {
        socket.join(user.id);
      } else {
        console.error("implement db!");
      }

      socket.on("incoming", (msg: string, username: string) => {
        io.to(user.id).emit("message", username, msg);
      });
    });

    socket.on("disconnect", () => {
      let disconnected = users.find((user) => user.id == socket.id);
      users = users.filter((user) => user.id !== socket.id);
      console.log(users);
      if (disconnected) {
        socket.broadcast.emit(
          "message",
          `${disconnected.username} has left the chat.`
        );
      }
    });
  });
};
