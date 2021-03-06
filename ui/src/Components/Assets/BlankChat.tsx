import React, { FC } from "react";

export const BlankChat: FC = () => {
  return (
    <div>
      <div className="anim-background">
        <h2>Select a chat first</h2>
        <img
          alt="face"
          src="https://llwproductions.files.wordpress.com/2012/11/anonymous.png"
          width="500"
          height="400"
          style={{ marginLeft: "120px", marginTop: "-60px", opacity: "0.1" }}
        ></img>
        <input className="editor faded" style={{ marginLeft: "-550px" }} />
      </div>
    </div>
  );
};
