import React, { FC } from "react";
import { Link } from "react-router-dom";

export const SettingsIcon: FC = () => {
  return (
    <div>
      <Link to="/settings">
        <img
          alt="info-icon"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fwhite%2Fsettings-512.png&f=1&nofb=1"
          width="30"
          height="30"
          style={{ marginLeft: "-60px", marginTop: "-80px" }}
        ></img>
      </Link>
    </div>
  );
};
