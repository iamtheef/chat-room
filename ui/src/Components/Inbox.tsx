import React, { FC, useEffect, useState, useContext } from "react";
// import {MessagesContext} from '../Context/Messages'
import { ContactsContext } from "../Context/Contacts";
import { UserContext } from "../Context/User";
import { Link, Redirect } from "react-router-dom";

export const Inbox: FC = () => {
  const { user } = useContext(UserContext);
  const { contacts, add } = useContext(ContactsContext);

  const [requests, setRequests] = useState<any>([]);

  useEffect(() => {
    if (user && user.unreadMessages.length) {
      let newContacts: any = [];
      let existingContacts = contacts.map((c: any) => c._id);
      user.unreadMessages.forEach((msg: any) => {
        if (existingContacts.indexOf(msg.user) < 0) {
          newContacts.push({ id: msg.user, username: msg.username });
        }
      });

      if (newContacts.length > 0) {
        setRequests(newContacts);
      }
    }
  }, [contacts, user]);
  return (
    <div>
      {user ? (
        <div className={`inbox ${requests.length > 0 && "has-inbox"}`}>
          {requests.length && (
            <div>
              {requests.length}
              <Link to="/inbox"></Link>
            </div>
          )}
          {/* <ul
            style={{
              listStyleType: "none",
            }}
          >
            {requests.map((req: any) => (
              <li onClick={() => add(req.id)} key={req.id}>
                {req.username}
              </li>
            ))}
          </ul> */}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
