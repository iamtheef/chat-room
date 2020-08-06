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
  const [chatWindow, setChatWindow] = useState<Message[] | []>([]);

  let mes: Messages = {};

  const [messages, setMessages] = useState<Messages>();

  useEffect(() => {
    mes = contacts.forEach((c: typeof User) => (mes[c._id.toString()] = []));
    setMessages(mes);
  }, [contacts]);

  return (
    <MessagesContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
        chatWindow,
        setChatWindow,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
