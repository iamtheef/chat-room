import React, { FC } from "react";

export const Banner: FC = () => {
  return (
    <img
      width="400"
      height="150"
      style={{ opacity: "0.6", borderRadius: "3px", marginTop: "10px" }}
      src={`https://media.giphy.com/media/rUPuU6G4X0Pew/source.gif`}
      alt="banner"
    ></img>
  );
};
