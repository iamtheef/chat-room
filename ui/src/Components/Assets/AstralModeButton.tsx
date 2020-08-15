import React, { FC, useContext } from "react";
import { AstralModeContext } from "../../Context/AstralMode";

export const AstralModeButton: FC = () => {
  const { setAstralMode, astralMode } = useContext(AstralModeContext);
  return (
    <label
      className="switch"
      style={{ marginLeft: "-50px", marginTop: "-60px", marginBottom: "-5px" }}
    >
      <input type="checkbox" checked={!!astralMode} />
      <span
        className="slider"
        onClick={() => setAstralMode(!astralMode)}
      ></span>
    </label>
  );
};
