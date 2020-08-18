import React, { createContext, useState, useEffect, useContext } from "react";
import { ContactsContext } from "../Context/Contacts";
import { MessagesContext } from "../Context/Messages";
import { UserContext } from "../Context/User";
import { client } from "../Utils/AxiosClient";
import * as e from "../Errors";

type Props = {
  children: React.ReactNode;
};

export const InboxContext = createContext<any>(undefined);

export function InboxProvider({ children }: Props) {
  const { contacts, add } = useContext(ContactsContext);
  const { setMessages, hasUnreadMessages } = useContext(MessagesContext);
  const [requests, setRequests] = useState<any>([]);
  const [unread, setUnread] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.temporaryMessages.length && !!contacts) {
      let newContacts: any = [];
      let reqs: any = [];

      user.temporaryMessages.forEach((m: any) => {
        if (newContacts.indexOf(m.sender) < 0) {
          newContacts.push(m.sender);
          reqs.push({ username: m.username, id: m.sender });
        } else if (unread.indexOf(m.sender < 0)) {
          setUnread((prev: any) => [...prev, m.sender]);
        }
      });

      if (newContacts.length > 0) {
        setRequests(reqs);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  useEffect(() => {
    if (user && user.unreadMessages.length > 0) {
      setUnread((prev: any) => [...prev, ...hasUnreadMessages()]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const acceptRequest = async (id: string) => {
    add(id);
    setRequests((prev: any) => prev.filter((r: any) => r.id !== id));
    client
      .post("/get_messages_by_this_contact", { me: user._id, contact: id })
      .then((res) => {
        setMessages((prev: any) => ({
          ...prev,
          [id]: [...res.data],
        }));

        setUnread((prev: any) => [...prev, id]);
        user.temporaryMessages = user.temporaryMessages.filter(
          (m: any) => m.sender !== id
        );
      })
      .catch((err) => {
        if (!!err) e.throwUnexpectedError();
      });
  };

  const removeRequest = async (id: string) => {
    await client
      .post("/remove_request", { user: user._id, id })
      .then((res) => {
        if (res.data) {
          user.temporaryMessages = user.temporaryMessages.filter(
            (m: any) => m.sender !== id
          );
          setRequests((prev: any) => prev.filter((r: any) => r.id !== id));
        }
      })
      .catch((err) => {
        if (!!err) e.throwUnexpectedError();
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
