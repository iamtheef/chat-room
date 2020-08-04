import React, { createContext, useState, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { UserContext } from "../Context/User";

type Props = {
  children: React.ReactNode;
};

export const ContactsContext = createContext<any>(undefined);

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<typeof User[] | []>([]);
  const [onUsers, setOnUsers] = useState<string[]>([]);
  const { user, socket } = useContext(UserContext);

  const getContacts = () => {
    client.post("/getcontacts", { id: user._id }).then((contacts) => {
      setContacts(contacts.data.contacts);
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

  const makeNewRoom = (DBid: string) => {
    socket.emit("join", { DBid });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        getContacts,
        add,
        remove,
        makeNewRoom,
        onUsers,
        setOnUsers,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
