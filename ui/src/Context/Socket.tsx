import React, { createContext, useContext } from "react";
import { Message } from "../../../types";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";

export const SocketContext = createContext<any>(undefined);

type Props = {
  children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
  const { currentChat, setMessages } = useContext(MessagesContext);
  const { user, socket } = useContext(UserContext);

  const listener = () => {
    socket.on("message", ({ username, message, sender, receiver }: Message) => {
      if (user._id === sender) {
        setMessages((prev: any) => ({
          ...prev,
          [receiver!]: [...prev[receiver!], { username, message }],
        }));
      } else if (user._id === receiver) {
        setMessages((prev: any) => ({
          ...prev,
          [sender!]: [...prev[sender!], { username, message }],
        }));
      }
    });
  };

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      socket.emit("incoming", {
        message: e.target.value,
        username: user.username,
        receiver: currentChat,
        sender: user._id,
      });
      e.target.value = "";
      e.target.focus();
    }
  };

  return (
    <SocketContext.Provider value={{ listener, listenForSubmit }}>
      {children}
    </SocketContext.Provider>
  );
}
