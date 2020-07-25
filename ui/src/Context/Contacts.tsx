import React, { createContext, useState, useContext } from "react";
import User from "../../../server/models/User";
import axios from "axios";
import { UserContext } from "../Context/User";

type Props = {
  children: React.ReactNode;
};

export const ContactsContext = createContext<any>(undefined);

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<typeof User[] | []>([]);
  const { user } = useContext(UserContext);

  const getContacts = () => {
    axios
      .post("http://localhost:4000/getcontacts", { id: user._id })
      .then((contacts) => {
        setContacts(contacts.data);
      });
  };

  const add = (add: string) => {
    const { _id } = user;
    axios.post("http://localhost:4000/add", { _id, add }).then((contacts) => {
      if (contacts.data) {
        getContacts();
      }
    });
  };

  const remove = (id: string) => {
    const { _id } = user;
    axios.post("http://localhost:4000/remove", { _id, id }).then((contacts) => {
      if (contacts.data) {
        getContacts();
      }
    });
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, getContacts, add, remove }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
