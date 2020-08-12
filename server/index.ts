import { connectDB, app } from "./configuration";
import {
  register,
  login,
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

app.post("/search", async (req, res) => {
  search(req, res);
});

app.post("/add", (req, res) => {
  add(req, res);
});

app.post("/remove", async (req, res) => {
  remove(req, res);
});

app.post("/getcontacts", (req, res) => {
  getContacts(req, res);
});

app.post("/expiremessages", (req, res) => {
  expireMessages(req, res);
});

app.post("/removerequest", (req, res) => {
  removeRequest(req, res);
});

app.post("/storemessage", (req, res) => {
  storeMessage(req, res);
});

app.post("/getmessagesbythiscontact", (req, res) => {
  getMessagesByThisContact(req, res);
});
