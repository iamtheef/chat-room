import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";

type Props = {
  children: React.ReactNode;
};

export interface Message {
  username: string;
  message: string;
  user?: string;
}

export interface Messages {
  [id: string]: Message[] | [];
}

export const MessagesContext = createContext<any>(undefined);

export function MessagesProvider({ children }: Props) {
  const { contacts } = useContext(ContactsContext);
  const { user } = useContext(UserContext);
  const [currentChat, setCurrentChat] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Messages>();

  let mes: Messages = {};

  const initMessages = async () => {
    contacts.map((c: typeof User) => (mes[c._id.toString()] = [] as Message[]));

    if (user && user.unreadMessages.length) {
      user.unreadMessages.forEach((msg: Message) => {
        if (mes[msg.user!]) {
          mes[msg.user!] = [
            ...mes[msg.user!],
            { username: msg.username, message: msg.message },
          ];
        } else {
          mes[msg.user!] = [{ username: msg.username, message: msg.message }];
        }
      });

      await client.post("/expiremessages", { id: user._id });
    }
    setMessages(mes);
  };

  useEffect(() => {
    if (contacts.length && !messages) {
      initMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);
  return (
    <MessagesContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
