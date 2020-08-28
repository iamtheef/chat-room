import { connectDB, app } from "./configuration";
const express = require("express");
import {
  register,
  login,
  update,
  deleteAccount,
  expireMessages,
  storeMessage,
  getMessagesByThisContact,
} from "./user-functions";
import {
  add,
  remove,
  getContacts,
  search,
  removeRequest,
} from "./contacts-functions";
import { makeNewSocket } from "./webSocket-server";

(() => {
  connectDB();
  makeNewSocket();

  // serving the app statically
  if (process.env.NODE_ENV === "production") {
    (<any>window).__REACT_DEVTOOLS_GLOBAL_HOOK__.inject;
    app.use(express.static("../ui/build"));
  }
})();

app.get("/", (req, res) => {
  res.send("HELLO ALL POSSIBLE WORLDS");
});

app.post("/register", async (req, res) => {
  register(req, res);
});

app.post("/login", async (req, res) => {
  login(req, res);
});

app.post("/update", async (req, res) => {
  update(req, res);
});

app.post("/delete_account", async (req, res) => {
  deleteAccount(req, res);
});

app.post("/search", async (req, res) => {
  search(req, res);
});

app.post("/add", (req, res) => {
  add(req, res);
});

app.post("/remove", async (req, res) => {
  remove(req, res);
});

app.post("/get_contacts", (req, res) => {
  getContacts(req, res);
});

app.post("/expire_messages", (req, res) => {
  expireMessages(req, res);
});

app.post("/remove_request", (req, res) => {
  removeRequest(req, res);
});

app.post("/store_message", (req, res) => {
  storeMessage(req, res);
});

app.post("/get_messages_by_this_contact", (req, res) => {
  getMessagesByThisContact(req, res);
});
