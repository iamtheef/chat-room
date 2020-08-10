import React, { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { InboxContext } from "../Context/Inbox";

export const InboxIcon: FC = () => {
  const { requests } = useContext(InboxContext);
  useEffect(() => {
    console.log("REQUESTS :: ", requests.length);
  });

  return (
    <Link to="/inbox">
      <div>
        <div className={`inbox ${requests.length > 0 && "has-inbox"}`}>
          {requests.length && <div>{requests.length}</div>}
        </div>
      </div>
    </Link>
  );
};
