import React, { FC, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import { InboxContext } from "../Context/Inbox";
import { ContactsContext } from "../Context/Contacts";

export const Inbox: FC = () => {
  const { requests } = useContext(InboxContext);
  const { user } = useContext(UserContext);
  const { add } = useContext(ContactsContext);

  return (
    <div>
      <Link to="/main">
        {" "}
        <p className="quote">{"<<<"} </p>{" "}
      </Link>
      {user ? (
        <ul
          style={{
            listStyleType: "none",
          }}
          className="quote"
        >
          {requests.map((req: any) => (
            <li>
              {req.username}
              <p>{req.message}</p>

              <button onClick={() => add(req.id)} key={req.id}>
                Accept Request
              </button>
              <button>Delete Request</button>
            </li>
          ))}
        </ul>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
