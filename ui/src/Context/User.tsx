import React, { createContext, useState, useEffect } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { Form } from "../types";
import io from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<typeof User | undefined>(undefined);

  const socket = io("http://localhost:4000");

  function submit(e: any, form: Form, view: string) {
    e.preventDefault();
    client
      .post(`/${view}`, form)
      .then((res) => {
        if (res.data.logged) {
          setUser(res.data.user);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((e) => {
        alert("there was something wrong!\n" + e);
      });
  }

  useEffect(() => {
    if (user) {
      socket.emit("active", { username: user.username, dbID: user._id });
    } else {
      socket.close();
    }
  }, [user, socket]);

  return (
    <UserContext.Provider value={{ user, setUser, submit, socket }}>
      {children}
    </UserContext.Provider>
  );
}
