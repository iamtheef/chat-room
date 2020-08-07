import React, { createContext, useState, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { UserContext } from "../Context/User";

export const ContactsContext = createContext<any>(undefined);

type Props = {
  children: React.ReactNode;
};

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<typeof User[] | []>([]);
  const [onUsers, setOnUsers] = useState<string[]>([]);
  const { user } = useContext(UserContext);

  const getContacts = async () => {
    client.post("/getcontacts", { id: user._id }).then((contacts) => {
      setContacts(contacts.data.contacts);
      console.log("set contacts called !");
      setOnUsers(contacts.data.status);
    });
  };

  const add = (add: string) => {
    const { _id } = user;
    client.post("/add", { _id, add }).then((contacts) => {
      if (contacts.data) {
        getContacts();
      }
    });
  };

  const remove = (id: string) => {
    const { _id } = user;
    client.post("/remove", { _id, id }).then((contacts) => {
      if (contacts.data) {
        getContacts();
      }
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        getContacts,
        add,
        remove,
        onUsers,
        setOnUsers,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
