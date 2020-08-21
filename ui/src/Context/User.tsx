import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { Form } from "../../../types";
import io from "socket.io-client";
import * as errors from "../Errors";

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<typeof User | undefined>(undefined);

  const socket = io(process.env.REACT_APP_baseURL!, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });
  const history = useHistory();

  async function submit(e: any, form: Form, view: string, id: string) {
    var done = false;
    e.preventDefault();
    try {
      let res = await client.post(`/${view}`, { form, id });
      done = res.data.logged;
      if (res.data.logged) {
        setUser(res.data.user);
      } else {
        errors.throwError(res.data.msg);
      }
    } catch (err) {
      if (!!err) errors.throwUnexpectedError();
      done = false;
    }

    return done;
  }

  useEffect(() => {
    if (!!user) {
      socket.emit("active", { username: user.username, dbID: user._id });
    } else {
      socket.close();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, submit, socket, history }}>
      {children}
    </UserContext.Provider>
  );
}
