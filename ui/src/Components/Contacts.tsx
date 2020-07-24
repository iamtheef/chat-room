import React, { FC, useContext } from "react";
import User from "../../../server/models/User";
import axios from "axios";

import { UserContext } from "../Context/User";

export const Contacts: FC = () => {
  // const { user } = useContext(UserContext);
  const user = {
    username: "iamtheef",
    contacts: [
      {
        username: "bill",
        avatar: "https://i.ytimg.com/vi/37PIGTA2B5U/maxresdefault.jpg",
      },
    ],
  };

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <ul style={{ listStyleType: "none" }}>
        {user.contacts.map((contact) => (
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
