import React, { FC, useContext } from "react";
import { MessagesContext } from "../../Context/Messages";
import { Message } from "../../../../types";
import { decrypt } from "../../Utils/crypto";

export const Panel: FC = () => {
  const { currentChat, messages } = useContext(MessagesContext);

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
              <p className="message">{decrypt(msg.message)}</p>
            </li>
          ))}
        <div
          id="last"
          style={{ paddingBottom: "10px", paddingTop: "5px" }}
        ></div>
      </ul>
    </div>
  );
};
