import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { ContactsContext } from "../Context/Contacts";
import { Panel } from "./Panel";

export const ChatWindow: FC = () => {
  const { currentChat, setMessages, messages } = useContext(MessagesContext);
  const { onUsers, contacts } = useContext(ContactsContext);
  const { user, socket } = useContext(UserContext);

  useEffect(() => {
    socket.on(
      "message",
      (username: string, msg: string, receiverID: string) => {
        console.log(username, msg);
        // receiver is offline
        if (onUsers.indexOf(receiverID) < 0) {
          setMessages((prev: any) => ({
            ...prev,
            [currentChat]: [...prev[currentChat], { username, message: msg }],
          }));
        } else {
          // receiver is online
          if (user._id === receiverID) {
            setMessages((prev: any) => ({
              ...prev,
              [currentChat]: [...prev[currentChat], { username, message: msg }],
            }));
          } else {
            setMessages((prev: any) => ({
              ...prev,
              [receiverID]: [...prev[receiverID], { username, message: msg }],
            }));
          }
        }
      }
    );

    return () => {
      socket.off("message");
    };
  }, [socket, currentChat, setMessages, messages, onUsers, user._id]);

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
        <h5 style={{ marginTop: "-45px", position: "fixed" }}>
          {contacts.find((u: any) => u._id === currentChat).username}
        </h5>
        <Panel />
      </div>
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
