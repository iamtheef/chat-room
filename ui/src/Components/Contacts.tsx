import React, { FC, useContext, useEffect } from "react";
import User from "../../../server/models/User";
import { ContactsContext } from "../Context/Contacts";

export const Contacts: FC = () => {
  const { contacts, getContacts, remove, makeNewRoom } = useContext(
    ContactsContext
  );

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div>
              <li
                className="contact-item"
                key={`${contact._id}`}
                onClick={() => makeNewRoom(contact._id)}
              >
                <img
                  className="user-icon"
                  style={{ marginTop: "15px" }}
                  src={`${contact.avatar}`}
                  alt="user img"
                />
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
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
