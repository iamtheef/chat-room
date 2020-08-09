import { server } from "./configuration";
import User from "./models/User";

export const io = require("socket.io").listen(server);

let users = [];

export const getOnlineUsers = () => {
  return users.map((user) => user.dbID);
};

export const makeNewSocket = () => {
  //
  io.on("connection", (socket: any) => {
    //
    socket.on("active", ({ username, dbID }) => {
      users.push({ id: socket.id, username, dbID });
      socket.broadcast.emit(
        "status",
        users.map((user) => user.dbID)
      );
    });

    socket.on(
      "incoming",
      async (msg: string, username: string, receiverID: string) => {
        //
        // user is online
        let user = users.find((user) => user.dbID === receiverID);
        if (user) {
          socket.join(user.id);
          io.to(user.id).emit("message", username, msg, user.dbID);
        } else {
          //
          // user is offline
          let user = await User.findById(receiverID);
          user.unreadMessages.push({
            username,
            user: users.find((user) => user.id == socket.id).dbID,
            message: msg,
          });
          await user.save();

          socket.join(user.id);
          io.to(user.id).emit(
            "message",
            username,
            msg,
            users.find((user) => user.id == socket.id).dbID
          );
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
