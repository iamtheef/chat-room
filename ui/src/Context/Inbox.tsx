import React, { createContext, useState, useEffect, useContext } from "react";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";

type Props = {
  children: React.ReactNode;
};

export const InboxContext = createContext<any>(undefined);

export function InboxProvider({ children }: Props) {
  const [requests, setRequests] = useState<any>([]);
  const { user } = useContext(UserContext);
  const { contacts } = useContext(ContactsContext);

  useEffect(() => {
    if (user && user.unreadMessages.length) {
      let newContacts: any = [];
      let existingContacts = contacts.map((c: any) => c._id);
      user.unreadMessages.forEach((msg: any) => {
        if (existingContacts.indexOf(msg.user) < 0) {
          newContacts.push({ id: msg.user, username: msg.username });
        }
      });

      if (newContacts.length > 0) {
        setRequests(newContacts);
      }
    }
  }, [contacts, user]);

  return (
    <InboxContext.Provider value={{ requests, setRequests }}>
      {children}
    </InboxContext.Provider>
  );
}
