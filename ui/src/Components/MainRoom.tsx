import React, { FC, useContext } from "react";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { Redirect } from "react-router-dom";
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
          <ChatWindow />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
