import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";
import { MemoryRouter, Route, Switch, Redirect } from "react-router-dom";

export const ChatWindow: FC = () => {
  const { currentChat, messages, setMessages, chatWindow } = useContext(
    MessagesContext
  );

  const { user, socket } = useContext(UserContext);

  useEffect(() => {
    socket.on("message", (username: string, msg: string, userId: string) => {
      setMessages((prev: any) => ({
        ...prev,
        [userId]: [{ username, message: msg }],
      }));
    });

    return () => {
      socket.off("message");
    };
  }, [socket, currentChat]);

  const listenForSubmit = (e: any) => {
    if (e.keyCode === 13) {
      socket.emit("incoming", e.target.value, user.username, currentChat);
      e.target.value = "";
      e.target.focus();
    }
  };

  const last = document.getElementById("last")!;
  if (last) {
    last.scrollIntoView();
  }

  return (
    <div>
      <div className="chatwin">
        <button>Push here!</button>
        <MemoryRouter
          initialEntries={["/hello", { pathname: `/${currentChat}` }]}
          initialIndex={0}
        >
          <Switch>
            <Route exact path="/hello">
              Hello!
            </Route>
          </Switch>
        </MemoryRouter>
      </div>
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};

const Panel: FC = () => {
  const { currentChat, messages, setMessages, chatWindow } = useContext(
    MessagesContext
  );

  return (
    <div>
      {chatWindow ? (
        <ul style={{ listStyleType: "none" }}>
          {chatWindow.map(({ msg, i }: { msg: any; i: number }) => (
            <li key={i} className="message-list">
              {(i === 0 ||
                chatWindow[i].username !== chatWindow[i - 1].username) && (
                <h4>{msg.username}</h4>
              )}
              <p className="message">{msg.message}</p>
            </li>
          ))}
          <div id="last"></div>
        </ul>
      ) : (
        <p>{currentChat ? currentChat : "no current chat"}</p>
      )}
      {currentChat}
    </div>
  );
};
