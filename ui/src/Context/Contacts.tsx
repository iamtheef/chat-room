import React, { createContext, useState } from "react";
import User from "../../../server/models/User";

type Props = {
  children: React.ReactNode;
};

export const ContactsContext = createContext<any>(undefined);

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<typeof User[] | []>([]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}
