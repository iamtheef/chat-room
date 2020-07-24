import React, { FC, useContext } from "react";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { Redirect } from "react-router-dom";
import User from "../../../server/models/User";
import axios from "axios";
import { UserContext } from "../Context/User";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1>WELCOME {user.username}</h1>
          <Search />
          <Contacts />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
