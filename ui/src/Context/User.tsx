import React, { createContext, useState } from "react";
import User from "../../../server/models/User";

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<typeof User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
