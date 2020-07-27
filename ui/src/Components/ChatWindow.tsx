import React, { FC } from "react";
import io from "socket.io-client";

export const ChatWindow: FC = () => {
  const socket = io("http://localhost:4000");

  socket.on("new-message", (msg: string, username: string) => {
    socket.emit(msg);
    console.log(msg);
  });

  socket.on("connected", (username: string) => {
    socket.emit(username);
    console.log(username);
  });
  return (
    <div className="chatwin">
      <input />
    </div>
  );
};
