import React, { FC, useContext } from "react";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { Banner } from "./Banner";
import { ChatWindow } from "./ChatWindow";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Context/User";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1 style={{ marginTop: "0px" }}>WELCOME {user.username}</h1>
          <Search />
          <Contacts />
          <ChatWindow />
          <Banner />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
