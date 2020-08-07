import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactsContext } from "../Context/Contacts";
import User from "../../../server/models/User";

type Props = {
  children: React.ReactNode;
};

interface Message {
  username: string;
  message: string;
}

interface Messages {
  [id: string]: Message[] | [];
}

export const MessagesContext = createContext<any>(undefined);

export function MessagesProvider({ children }: Props) {
  const { contacts } = useContext(ContactsContext);
  const [currentChat, setCurrentChat] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Messages>();

  let mes: Messages = {};

  useEffect(() => {
    setMessages(mes);
    mes = contacts.forEach((c: typeof User) => (mes[c._id.toString()] = []));
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
