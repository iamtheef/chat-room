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
    socket.on("active", ({ username, dbID }) => {
      users.push({ id: socket.id, username, dbID });
      socket.broadcast.emit(
        "status",
        users.map((user) => user.username)
      );
    });

    socket.on(
      "incoming",
      async (msg: string, username: string, dbID: string) => {
        let user = users.find((user) => user.dbID === dbID);
        if (user) {
          socket.join(user.id);
          io.to(user.id).emit("message", username, msg, user.dbID);
        } else {
          let user = await User.findById(dbID);

          user.unreadMessages.push({
            username,
            user: users.find((user) => user.id == socket.id).dbID,
            message: msg,
          });
          await user.save();
        }
      }
    );

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
