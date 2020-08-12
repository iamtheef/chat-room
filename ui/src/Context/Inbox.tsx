import React, { createContext, useState, useEffect, useContext } from "react";
import { ContactsContext } from "../Context/Contacts";
import { MessagesContext } from "../Context/Messages";
import { UserContext } from "../Context/User";
import { client } from "../Utils/AxiosClient";

type Props = {
  children: React.ReactNode;
};

export const InboxContext = createContext<any>(undefined);

export function InboxProvider({ children }: Props) {
  const { contacts, add, getIDs } = useContext(ContactsContext);
  const { setMessages } = useContext(MessagesContext);
  const [requests, setRequests] = useState<any>([]);
  const [unread, setUnread] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.unreadMessages.length && !!contacts) {
      let newContacts: any = [];
      let reqs: any = [];
      let existingContacts = getIDs();

      user.unreadMessages.forEach((m: any) => {
        if (
          existingContacts.indexOf(m.sender) < 0 &&
          newContacts.indexOf(m.sender) < 0
        ) {
          newContacts.push(m.sender);
          reqs.push({ username: m.username, id: m.sender });
        } else if (unread.indexOf(m.sender < 0)) {
          setUnread((prev: any) => [...prev, m.sender]);
        }
      });

      if (newContacts.length > 0) {
        setRequests(reqs);
      }
      client.post("/expiremessages", { id: user._id, new: newContacts });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const acceptRequest = async (id: string) => {
    add(id);
    setRequests((prev: any) => prev.filter((r: any) => r.id !== id));
    client
      .post("/getmessagesbythiscontact", { me: user._id, contact: id })
      .then((res) => {
        setMessages((prev: any) => ({
          ...prev,
          [id]: [...res.data],
        }));

        setUnread((prev: any) => [...prev, id]);
      });
  };

  const removeRequest = async (id: string) => {
    await client.post("/removerequest", { user: user._id, id }).then((res) => {
      if (res.data) {
        user.unreadMessages = user.unreadMessages.filter(
          (m: any) => m.sender !== id
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
