import React, { FC } from "react";
import { Link } from "react-router-dom";

export const InfoIcon: FC = () => {
  return (
    <Link to="/info">
      <img
        alt="info-icon"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fpreview%2Fwhite%2Finfo-2-xxl.png&f=1&nofb=1"
        width="30"
        height="30"
        style={{ marginLeft: "1300px", marginTop: "-250px" }}
      ></img>
    </Link>
  );
};
