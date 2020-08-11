import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { SocketContext } from "../Context/Socket";

export const BlankChat: FC = () => {
  const { listener } = useContext(SocketContext);
  const { socket } = useContext(UserContext);

  useEffect(() => {
    listener();

    return () => {
      socket.off("message");
    };
  }, [socket, listener]);

  return (
    <div>
      <div className="anim-background">
        <h2>Select a chat first</h2>
        <img
          alt="face"
          src="https://llwproductions.files.wordpress.com/2012/11/anonymous.png"
          width="500"
          height="400"
          style={{ marginLeft: "90px", marginTop: "-50px", opacity: "0.1" }}
        ></img>
        <input className="editor faded" style={{ marginLeft: "-550px" }} />
      </div>
    </div>
  );
};
