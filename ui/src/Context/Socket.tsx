import React, { createContext, useContext } from "react";
import { Message } from "../../../types";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { InboxContext } from "../Context/Inbox";

export const SocketContext = createContext<any>(undefined);

type Props = {
  children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
  const { currentChat, setMessages, isItNewContact } = useContext(
    MessagesContext
  );
  const { setUnread, setRequests } = useContext(InboxContext);
  const { user, socket } = useContext(UserContext);

  const listener = () => {
    socket.on("message", (msg: Message) => {
      const { username, message, sender, receiver } = msg;

      if (isItNewContact(msg)) {
        setRequests((prev: any) => [...prev, { username, id: sender }]);
        return;
      }

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

        if (currentChat !== sender) {
          setUnread((prev: any) => [...prev, sender]);
        }
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
