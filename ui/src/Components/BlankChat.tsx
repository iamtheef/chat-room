import React, { FC } from "react";

export const BlankChat: FC = () => {
  return (
    <div>
      <div className="anim-background">
        <h2>Select a chat first</h2>
        <input className="editor" style={{ marginLeft: "30px" }} />
      </div>
    </div>
  );
};
