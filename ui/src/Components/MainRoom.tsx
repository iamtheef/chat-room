import React, { FC, useContext, useCallback } from "react";

import { UserContext } from "../Context/User";

export const MainRoom: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>WELCOME MOFO {user.username}</h1>
    </div>
  );
};
