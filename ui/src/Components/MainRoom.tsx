import React, { FC, useContext } from "react";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { Redirect, MemoryRouter, Route } from "react-router-dom";
import { UserContext } from "../Context/User";
import { BlankChat } from "./BlankChat";
import { Inbox } from "./Inbox";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1 style={{ marginTop: "0px", color: "white" }}>
            WELCOME {user.username}
          </h1>
          <Inbox />
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
