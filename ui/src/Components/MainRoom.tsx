import React, { FC, useContext } from "react";
import { Redirect, MemoryRouter, Route } from "react-router-dom";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { UserContext } from "../Context/User";
import { BlankChat } from "./Assets/BlankChat";
import { InboxIcon } from "./Assets/InboxIcon";
import { InfoIcon } from "./Assets/InfoIcon";
import { SettingsIcon } from "./Assets/SettingsIcon";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <div>
            <h1 className="welcome">WELCOME {user.username}</h1>
            <div className="icons">
              <InfoIcon />
              <SettingsIcon />
            </div>
          </div>
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
