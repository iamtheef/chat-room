import { server } from "./configuration";
import User from "./models/User";
import { Message } from "../types";

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

    socket.on("incoming", async (msg: Message) => {
      const { message, receiver, sender, username } = msg;
      //
      // receiver is online
      let user = users.find((user) => user.dbID === receiver);
      if (user) {
        socket.join(user.id);
        io.to(user.id).emit("message", { username, message, sender, receiver });
      } else {
        //
        // receiver is offline
        let user = await User.findById(receiver);
        if (user.contacts.indexOf(sender) < 0) {
          user.temporaryMessages.push({
            username,
            sender,
            message,
          });
        } else {
          user.unreadMessages.push({
            username,
            sender,
            message,
          });
        }

        await user.save();

        socket.join(user.id);
        io.to(user.id).emit("message", { username, message, sender, receiver });
      }
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
