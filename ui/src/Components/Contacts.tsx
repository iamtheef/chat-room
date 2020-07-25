import React, { FC, useContext, useEffect } from "react";
import User from "../../../server/models/User";
import { ContactsContext } from "../Context/Contacts";

export const Contacts: FC = () => {
  const { contacts, getContacts, remove } = useContext(ContactsContext);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <ul style={{ listStyleType: "none" }}>
        {contacts.map((contact: typeof User) => (
          <li key={`${contact._id}`} className="contact-item">
            <img
              className="user-icon"
              style={{ marginTop: "15px" }}
              src={`${contact.avatar}`}
              alt="user img"
            />
            <p>{contact.username}</p>
            <i onClick={() => remove(contact._id)}>X</i>
          </li>
        ))}
      </ul>
    </div>
  );
};
