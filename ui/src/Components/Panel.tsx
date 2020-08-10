import React, { FC, useContext } from "react";
import { MessagesContext } from "../Context/Messages";
import { Message } from "../Context/Messages";

export const Panel: FC = () => {
  const { currentChat, messages } = useContext(MessagesContext);

  const last = document.getElementById("last");
  if (last) {
    last.scrollIntoView();
  }

  return (
    <div className="main-room">
      <ul style={{ listStyleType: "none" }}>
        {messages[currentChat] &&
          messages[currentChat].map((msg: Message, i: number) => (
            <li key={i} className="message-list">
              {(i === 0 ||
                messages[currentChat][i].username !==
                  messages[currentChat][i - 1].username) && (
                <h4>{msg.username}</h4>
              )}
              <p className="message">{msg.message}</p>
            </li>
          ))}
        <div id="last"></div>
      </ul>
    </div>
  );
};
