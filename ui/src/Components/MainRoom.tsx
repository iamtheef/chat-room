import React, { FC, useContext, useEffect } from "react";
import { Redirect, MemoryRouter, Route } from "react-router-dom";
import { Search } from "./Search";
import { Contacts } from "./Contacts";
import { ChatWindow } from "./ChatWindow";
import { UserContext } from "../Context/User";
import { BlankChat } from "./Assets/BlankChat";
import { InboxIcon } from "./Assets/InboxIcon";
import { InfoIcon } from "./Assets/InfoIcon";
import { AstralModeButton } from "./Assets/AstralModeButton";
import { SettingsIcon } from "./Assets/SettingsIcon";
import { SocketContext } from "../Context/Socket";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);
  const { listener } = useContext(SocketContext);
  const { socket } = useContext(UserContext);

  useEffect(() => {
    listener();

    return () => {
      socket.off("message");
    };
  }, [socket, listener]);

  useEffect(() => {
    setInterval(() => {
      socket.emit("keep");
    }, 60000); // pings every 2' so the socket stays open
  }, [socket]);

  return (
    <div className="main-room">
      {user ? (
        <div>
          <h1 className="welcome">WELCOME {user.username}</h1>
          <div className="icons">
            <InfoIcon />
            <SettingsIcon />
            <AstralModeButton />
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
