import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "../Context/User";
import { ContactsContext } from "../Context/Contacts";

export const ChatWindow: FC = () => {
  const { user, socket } = useContext(UserContext);
  const { currentChat, messages, setMessages } = useContext(ContactsContext);

  useEffect(() => {
    socket.on("message", (username: string, msg: string, userId: string) => {
      // setMessages((messages) => [...messages, { username, message: msg }]);
      setMessages((prev: any) => ({
        ...prev,
        [userId]: [{ username, message: msg }],
      }));
      console.log("inside chatwindow");
      console.log(currentChat);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, currentChat, setMessages]);

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
        {messages ? (
          <ul style={{ listStyleType: "none" }}>
            {messages[currentChat].map(
              ({ msg, i }: { msg: any; i: number }) => (
                <li key={i} className="message-list">
                  {(i === 0 ||
                    messages[currentChat][i].username !==
                      messages[currentChat][i - 1].username) && (
                    <h4>{msg.username}</h4>
                  )}
                  <p className="message">{msg.message}</p>
                </li>
              )
            )}
            <div id="last"></div>
          </ul>
        ) : (
          <div>please pick a name first!</div>
        )}
      </div>
      <input className="editor" onKeyDown={(e) => listenForSubmit(e)} />
    </div>
  );
};
