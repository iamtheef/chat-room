import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { MessagesContext } from "../Context/Messages";

export const ChatWindow: FC = () => {
  const { user, socket } = useContext(UserContext);
  const { currentChat, messages, setMessages, chatWindow } = useContext(
    MessagesContext
  );

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
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
