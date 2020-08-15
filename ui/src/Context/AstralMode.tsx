import React, { createContext, useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const AstralModeContext = createContext<any>(undefined);

export function AstralModeProvider({ children }: Props) {
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
    <AstralModeContext.Provider
      value={{
        astralMode,
        setAstralMode,
      }}
    >
      {children}
    </AstralModeContext.Provider>
  );
}
