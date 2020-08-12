import React, { FC, useContext } from "react";
import { Redirect, MemoryRouter, Route } from "react-router-dom";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { UserContext } from "../Context/User";
import { BlankChat } from "./Assets/BlankChat";
import { InboxIcon } from "./Assets/InboxIcon";
import { InfoIcon } from "./Assets/InfoIcon";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1 style={{ marginTop: "0px", color: "white", marginBottom: "0px" }}>
            WELCOME {user.username}
          </h1>
          <InfoIcon />
          <InboxIcon />
          <Search />
          <MemoryRouter>
            <Contacts />
            <Route path={`/`} component={BlankChat}></Route>
            <Route path={`/:id`} component={ChatWindow}></Route>
          </MemoryRouter>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
