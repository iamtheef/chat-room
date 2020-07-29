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
  const { user } = useContext(UserContext);

  const getContacts = () => {
    client.post("/getcontacts", { id: user._id }).then((contacts) => {
      setContacts(contacts.data);
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

  const makeNewRoom = () => {
    client.post("/newroom").then((answer) => {
      console.log(answer.data);
    });
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, getContacts, add, remove, makeNewRoom }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
