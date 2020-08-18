import React, { createContext, useContext } from "react";
import { Message } from "../../../types";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { InboxContext } from "../Context/Inbox";
import { client } from "../Utils/AxiosClient";
import { encrypt } from "../Utils/crypto";
import * as e from "../Errors";
import moment from "moment";

export const SocketContext = createContext<any>(undefined);

type Props = {
  children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
  const { currentChat, setMessages, isItNewContact, autoScroll } = useContext(
    MessagesContext
  );
  const { setUnread, setRequests, requests } = useContext(InboxContext);
  const { user, socket } = useContext(UserContext);

  const listener = () => {
    socket.on("message", (msg: Message) => {
      const { username, sender, receiver, message, sent } = msg;

      if (isItNewContact(msg)) {
        if (requests.map((r: any) => r.id).indexOf(msg.sender) < 0) {
          setRequests((prev: any) => [...prev, { username, id: sender }]);
        }

        client
          .post("/store_message", { id: user._id, msg, sent })
          .catch((err) => {
            if (!!err) e.throwMessageNotSentError();
          });
        return;
      }

      if (user._id === sender) {
        setMessages((prev: any) => ({
          ...prev,
          [receiver!]: [...prev[receiver!], { username, message, sent }],
        }));
      } else if (user._id === receiver) {
        setMessages((prev: any) => ({
          ...prev,
          [sender!]: [...prev[sender!], { username, message, sent }],
        }));

        if (currentChat !== sender) {
          setUnread((prev: any) => [...prev, sender]);
        }
        return;
      }
      autoScroll();
    });
    return () => {
      socket.off("message");
    };
  };

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      let msg: Message = {
        message: encrypt(e.target.value),
        username: user.username,
        receiver: currentChat,
        sender: user._id,
        sent: moment().calendar(),
      };

      socket.emit("incoming", msg);
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
