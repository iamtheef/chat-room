import React, { FC, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Context/User";
import { ContactsContext } from "../Context/Contacts";

export const Contacts: FC = () => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getcontacts", { id: user._id })
      .then((contacts) => {
        setContacts(contacts.data);
        console.log(contacts.data);
      });
  }, [user]);

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <ul style={{ listStyleType: "none" }}>
        {contacts.map((contact: any) => (
          <li key={`${contact}`} className="contact-item">
            <img
              className="user-icon"
              style={{ marginTop: "15px" }}
              src={`${contact.avatar}`}
              alt="user img"
            />
            <p>{contact.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
