import React, { createContext, useState, useContext } from "react";
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

  const initMessages = () => {
    console.log("we are in init !!  ", contacts);
    setMessages(mes);
    mes = contacts.forEach((c: typeof User) => (mes[c._id.toString()] = []));
  };

  return (
    <MessagesContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
        initMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
