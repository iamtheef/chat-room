import React, { FC, useState, useEffect } from "react";

export const AstralModeButton: FC = () => {
  const [astralMode, setAstralMode] = useState(false);

  useEffect(() => {
    if (astralMode) {
      document.body.style.backgroundImage =
        "url('https://media.giphy.com/media/9bTjZrytydVRK/source.gif')";
    } else {
      document.body.style.backgroundImage =
        "url('https://allpossibleworlds.de/wp-content/themes/apw/img/bg.gif')";
    }
  }, [astralMode]);

  return (
    <label
      className="switch"
      style={{ marginLeft: "-50px", marginTop: "-60px", marginBottom: "-5px" }}
    >
      <input type="checkbox" />
      <span
        className="slider"
        onClick={() => setAstralMode(!astralMode)}
      ></span>
    </label>
  );
};
