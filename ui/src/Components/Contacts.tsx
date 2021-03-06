import React, { FC, useContext, useEffect } from "react";
import User from "../../../server/models/User";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { InboxContext } from "../Context/Inbox";
import { useHistory } from "react-router-dom";
import { AdminIcon } from "./Assets/AdminIcon";

export const Contacts: FC = () => {
  const { contacts, getContacts, remove, onUsers, setOnUsers } = useContext(
    ContactsContext
  );
  const {
    currentChat,
    setCurrentChat,
    clearThisContact,
    focusOnEditor,
    autoScroll,
  } = useContext(MessagesContext);
  const { unread, setUnread } = useContext(InboxContext);
  const { socket } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getContacts();

    socket.on("status", (users: string[]) => {
      setOnUsers(users);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="contacts">
      <h2 className="title">Contacts</h2>
      <div>
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {contacts.map((contact: typeof User) => (
            <li
              className={`contact-item ${
                contact._id === currentChat && "isCurrentChat"
              }`}
              key={`${contact._id}`}
              onClick={() => {
                setCurrentChat(contact._id);
                history.push(`/${currentChat}`);
                setUnread((prev: any) =>
                  prev.filter((m: any) => m !== contact._id)
                );
                focusOnEditor();
                autoScroll();
              }}
            >
              <img
                className="user-icon"
                src={`${contact.avatar}`}
                alt="user img"
              />
              {onUsers.indexOf(contact._id) >= 0 ? (
                <i className="status on">1</i>
              ) : (
                <i className="status off">0</i>
              )}
              <p
                className={`${
                  unread.indexOf(contact._id) > -1 && "has-message"
                }`}
              >
                {contact.username}
              </p>
              {contact.isAdmin && <AdminIcon />}
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  remove(contact._id);
                  clearThisContact(contact._id);
                  history.push(`/`);
                }}
              >
                X
              </p>
            </li>
          ))}
        </ul>
        <p
          onClick={() => {
            history.push(`/`);
            setCurrentChat(undefined);
          }}
        >
          ▓
        </p>
      </div>
    </div>
  );
};
