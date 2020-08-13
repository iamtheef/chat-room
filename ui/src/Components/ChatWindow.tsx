import React, { FC, useContext } from "react";
import { MessagesContext } from "../Context/Messages";
import { ContactsContext } from "../Context/Contacts";
import { SocketContext } from "../Context/Socket";
import { Panel } from "./Assets/Panel";

export const ChatWindow: FC = () => {
  const { currentChat } = useContext(MessagesContext);
  const { listenForSubmit } = useContext(SocketContext);
  const { contacts } = useContext(ContactsContext);

  return (
    <div>
      <div className="chatwin">
        <h5 style={{ marginTop: "-45px", position: "fixed" }}>
          {contacts.find((u: any) => u._id === currentChat).username}
        </h5>

        <Panel />
      </div>
      <input
        className="editor"
        autoFocus
        id="edi"
        onKeyDown={(e) => listenForSubmit(e)}
      />
    </div>
  );
};
