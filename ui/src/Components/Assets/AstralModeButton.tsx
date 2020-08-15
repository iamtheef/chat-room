import React, { FC, useState } from "react";

export const AstralModeButton: FC = () => {
  const [astralMode, setAstralMode] = useState(false);

  console.log("ASTAL MODE ", astralMode);
  return (
    <label className="switch">
      <span className="slider" onClick={() => setAstralMode(!astralMode)}>
        Astral Mode
      </span>
    </label>
  );
};
