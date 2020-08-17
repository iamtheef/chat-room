import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";
import User from "../../../server/models/User";
import { Message, Messages } from "../../../types";
import { client } from "../Utils/AxiosClient";

type Props = {
  children: React.ReactNode;
};

export const MessagesContext = createContext<any>(undefined);

export function MessagesProvider({ children }: Props) {
  const [currentChat, setCurrentChat] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Messages>();
  const { contacts, getIDs } = useContext(ContactsContext);
  const { user } = useContext(UserContext);
  const [cmdPressed, setCmdPressed] = useState(false);

  let mes: Messages = {};

  const initMessages = async () => {
    contacts.map((c: typeof User) => (mes[c._id.toString()] = [] as Message[]));

    if (user && user.unreadMessages.length) {
      user.unreadMessages.forEach((msg: Message) => {
        if (mes[msg.sender!]) {
          mes[msg.sender!] = [
            ...mes[msg.sender!],
            { username: msg.username, message: msg.message },
          ];
        } else {
          mes[msg.sender!] = [{ username: msg.username, message: msg.message }];
        }
      });
    }
    setMessages({ ...mes });

    if (!cmdPressed) {
      client
        .post("/expire_messages", { id: user._id })
        .then((mes) => {
          console.log(mes);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const hasUnreadMessages = () => {
    if (user) {
      let hasFrom = user.unreadMessages.map((m: Message) => m.sender);
      return [...new Set(hasFrom)];
    }
  };

  const clearThisContact = (id: string) => {
    setMessages((prev: any) => ({ ...prev, [id]: [] }));
  };

  const isItNewContact = (msg: Message) => {
    return getIDs().indexOf(msg.sender) < 0 && msg.sender !== user._id;
  };

  const focusOnEditor = () => {
    document.getElementById("edi")?.focus();
  };

  useEffect(() => {
    if (contacts.length && !messages) {
      initMessages();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  useEffect(() => {
    // cmd + K to clear all chats function
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 91) {
        setCmdPressed(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 91) {
        setCmdPressed(true);
      }
      if (cmdPressed && e.keyCode === 75) {
        contacts.map(
          (c: typeof User) => (mes[c._id.toString()] = [] as Message[])
        );
        setMessages({ ...mes });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCmdPressed, cmdPressed]);
  return (
    <MessagesContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
        isItNewContact,
        initMessages,
        hasUnreadMessages,
        clearThisContact,
        focusOnEditor,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
