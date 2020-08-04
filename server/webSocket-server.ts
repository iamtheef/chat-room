import { server } from "./configuration";
import User from "./models/User";

export const io = require("socket.io").listen(server);

let users = [];

export const getOnlineUsers = () => {
  return users.map((user) => user.username);
};

export const makeNewSocket = () => {
  //
  io.on("connection", (socket: any) => {
    //
    socket.on("active", ({ username, DBid }) => {
      users.push({ id: socket.id, username, DBid });
      socket.broadcast.emit(
        "status",
        users.map((user) => user.username)
      );
    });

    socket.on("join", async ({ DBid }: { DBid: string }) => {
      let user = users.find((user) => user.DBid === DBid);

      socket.on("incoming", async (msg: string, username: string) => {
        if (user) {
          io.to(user.id).emit("message", username, msg);
        } else {
          let user = await User.findById(DBid);
          user.unreadMessages.push({ user: username, message: msg });
        }
      });
    });

    socket.on("disconnect", () => {
      let disconnected = users.find((user) => user.id == socket.id);
      users = users.filter((user) => user.id !== socket.id);
      if (disconnected) {
        socket.broadcast.emit(
          "status",
          users.map((user) => user.username)
        );
      }
    });
  });
};
