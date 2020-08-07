import React, { FC, useContext, useEffect } from "react";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { Redirect, MemoryRouter, Route } from "react-router-dom";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { BlankChat } from "./BlankChat";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);
  const { currentChat } = useContext(MessagesContext);

  useEffect(() => {
    console.log("main room! :: ", currentChat);
  });

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1 style={{ marginTop: "0px" }}>WELCOME {user.username}</h1>
          <Search />
          <MemoryRouter>
            <Contacts />
            <Route path={`/`} component={BlankChat}></Route>
            <Route path={`/${currentChat}`} component={ChatWindow}></Route>
          </MemoryRouter>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
