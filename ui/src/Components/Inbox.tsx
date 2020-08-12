import React, { FC, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import { InboxContext } from "../Context/Inbox";

export const Inbox: FC = () => {
  const { requests, acceptRequest, removeRequest } = useContext(InboxContext);
  const { user } = useContext(UserContext);

  return (
    <div>
      <Link to="/main">
        {" "}
        <p className="quote">{"<<<"} </p>{" "}
      </Link>
      {user ? (
        <ul className="inbox-list">
          {requests.map((req: any) => (
            <li key={`${req.id}`} className="inbox-item">
              <p>{req.username}</p>
              <button
                onClick={() => acceptRequest(req.id)}
                style={{ marginRight: "10px" }}
              >
                Accept Request
              </button>
              <button onClick={() => removeRequest(req.id)}>
                Delete Request
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
