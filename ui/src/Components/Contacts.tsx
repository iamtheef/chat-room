import React, { FC, useContext, useEffect } from "react";
import User from "../../../server/models/User";
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";

export const Contacts: FC = () => {
  const {
    contacts,
    getContacts,
    remove,
    onUsers,
    setOnUsers,
    currentChat,
    messages,
    setCurrentChat,
    setMessages,
  } = useContext(ContactsContext);
  const { socket } = useContext(UserContext);

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
              className="contact-item"
              key={`${contact._id}`}
              onClick={() => {
                setCurrentChat(contact._id);
                setMessages(messages[currentChat]);
              }}
            >
              <img
                className="user-icon"
                style={{ marginTop: "15px" }}
                src={`${contact.avatar}`}
                alt="user img"
              />
              {onUsers.indexOf(contact.username) >= 0 ? (
                <i className="status on">1</i>
              ) : (
                <i className="status off">0</i>
              )}
              <p>{contact.username}</p>
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  remove(contact._id);
                }}
              >
                X
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
