import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./Context/User";
import { ContactsProvider } from "./Context/Contacts";
import { MessagesProvider } from "./Context/Messages";
import { InboxProvider } from "./Context/Inbox";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ContactsProvider>
        <MessagesProvider>
          <InboxProvider>
            <App />
          </InboxProvider>
        </MessagesProvider>
      </ContactsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
