import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { Panel } from "./Panel";

export const ChatWindow: FC = () => {
  const { currentChat, setMessages, messages } = useContext(MessagesContext);

  const { user, socket } = useContext(UserContext);

  useEffect(() => {
    socket.on("message", (username: string, msg: string, userId: string) => {
      setMessages((prev: any) => ({
        ...prev,
        [userId]: [{ username, message: msg }],
      }));
    });

    return () => {
      socket.off("message");
    };
  }, [socket, currentChat, setMessages, messages]);

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      socket.emit("incoming", e.target.value, user.username, currentChat);
      e.target.value = "";
      e.target.focus();
    }
  };

  return (
    <div>
      <div className="chatwin">
        <Panel />
      </div>
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
