import React, { FC, useContext, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../Context/User";

export const ChatWindow: FC = () => {
  interface Message {
    username: string;
    message: string;
  }

  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = io("http://localhost:4000");

  socket.on("new-message", (username: string, msg: string) => {
    setMessages([...messages, { username, message: msg }]);
  });

  socket.on("message", (msg: string) => {
    alert(msg);
  });

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      socket.emit("incoming", e.target.value, user.username);
      e.target.value = "";
    }
  };

  return (
    <div className="chatwin">
      <ul style={{ listStyleType: "none" }}>
        {messages.map((msg, i) => (
          <li key={i} className="message-list">
            <h4>{msg.username}</h4>
            <p className="message">{msg.message}</p>
          </li>
        ))}
      </ul>

      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
