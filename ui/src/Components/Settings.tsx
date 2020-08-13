import React, { FC, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../Context/User";

export const Settings: FC = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <div>
      <h2 className="quote">SETTINGS</h2>
      <Link to="/main">
        {" "}
        <p className="quote">{"<<<"} </p>{" "}
      </Link>
    </div>
  ) : (
    <Redirect to="login" />
  );
};
