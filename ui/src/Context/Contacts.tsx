import React, { createContext, useState, useContext } from "react";
import { client } from "../Utils/AxiosClient";
import { UserContext } from "../Context/User";
import User from "../../../server/models/User";
import { throwDuplicateContactError } from "../Errors";

export const ContactsContext = createContext<any>(undefined);

type Props = {
  children: React.ReactNode;
};

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<typeof User[]>([]);
  const [onUsers, setOnUsers] = useState<string[]>([]);
  const { user } = useContext(UserContext);

  const getContacts = async () => {
    await client.post("/get_contacts", { id: user._id }).then((contacts) => {
      setContacts(contacts.data.contacts);
      setOnUsers(contacts.data.status);
    });
  };

  const add = (add: string) => {
    const { _id } = user;
    let contactIDs = contacts.map((c: any) => c._id);
    if (!(contactIDs.indexOf(add) < 0)) {
      throwDuplicateContactError();
    } else {
      client.post("/add", { _id, add }).then((contacts) => {
        if (contacts.data) {
          getContacts();
        }
      });
    }
  };

  const remove = (id: string) => {
    const { _id } = user;
    client.post("/remove", { _id, id }).then((contacts) => {
      if (contacts.data) {
        getContacts();
      }
    });
  };

  const focusOnEditor = () => {
    document.getElementById("edi")?.focus();
  };

  const getIDs = () => {
    return contacts.map((c: any) => c._id);
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
        getIDs,
        focusOnEditor,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
