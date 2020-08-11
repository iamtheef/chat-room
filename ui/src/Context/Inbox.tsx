import React, { createContext, useState, useEffect, useContext } from "react";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";
import { client } from "../Utils/AxiosClient";

type Props = {
  children: React.ReactNode;
};

export const InboxContext = createContext<any>(undefined);

export function InboxProvider({ children }: Props) {
  const [requests, setRequests] = useState<any>([]);
  const [unread, setUnread] = useState<any>([]);
  const { user } = useContext(UserContext);
  const { contacts, add } = useContext(ContactsContext);

  useEffect(() => {
    if (user && user.unreadMessages.length && !!contacts) {
      let newContacts: any = [];
      let reqs: any = [];
      let existingContacts = contacts.map((c: any) => c._id);

      user.unreadMessages.forEach((m: any) => {
        if (
          existingContacts.indexOf(m.user) < 0 &&
          newContacts.indexOf(m.user) < 0
        ) {
          newContacts.push(m.user);
          reqs.push({ username: m.username, id: m.user });
        } else if (unread.indexOf(m.user < 0)) {
          setUnread((prev: any) => [...prev, m.user]);
        }
      });

      if (newContacts.length > 0) {
        setRequests(reqs);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const acceptRequest = async (id: string) => {
    add(id);
    setRequests((prev: any) => prev.filter((r: any) => r.id !== id));
  };

  const removeRequest = async (id: string) => {
    await client.post("/removerequest", { user: user._id, id }).then((res) => {
      if (res.data) {
        user.unreadMessages = user.unreadMessages.filter(
          (m: any) => m.user !== id
        );
        setRequests((prev: any) => prev.filter((r: any) => r.id !== id));
      }
    });
  };

  return (
    <InboxContext.Provider
      value={{
        requests,
        setRequests,
        acceptRequest,
        removeRequest,
        unread,
        setUnread,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}
