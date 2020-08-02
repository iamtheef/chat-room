import React, { FC, useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/User";

interface Message {
  username: string;
  message: string;
}

export const ChatWindow: FC = () => {
  const { user, socket } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (username: string, msg: string) => {
      setMessages((messages) => [...messages, { username, message: msg }]);
    });

    socket.on("join", (username: string) => {
      setMessages((messages) => [
        ...messages,
        { username: "", message: `${username} has joined the chat` },
      ]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

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
