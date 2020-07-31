import React, { FC, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { UserContext } from "../Context/User";

interface Message {
  username: string;
  message: string;
}
const socket = io("http://localhost:4000");

export const ChatWindow: FC = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (username: string, msg: string) => {
      setMessages((prevState) => [...prevState, { username, message: msg }]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      socket.emit("incoming", e.target.value, user.username);
      e.target.value = "";
      e.target.focus();
    }
  };

  const last = document.getElementById("last")!;
  if (last) {
    last.scrollIntoView();
  }

  return (
    <div>
      <div className="chatwin">
        <ul style={{ listStyleType: "none" }}>
          {messages.map((msg, i) => (
            <li key={i} className="message-list">
              {(i === 0 ||
                messages[i].username !== messages[i - 1].username) && (
                <h4>{msg.username}</h4>
              )}
              <p className="message">{msg.message}</p>
            </li>
          ))}
          <div id="last"></div>
        </ul>
      </div>
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
