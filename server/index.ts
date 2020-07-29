import { connectDB, app } from "./configuration";
import { register, login } from "./user-functions";
import { add, remove, getContacts, search } from "./contacts-functions";
import { makeNewSocket } from "./webSocket-server";
(() => {
  connectDB();
})();

app.post("/newroom", async (req, res) => {
  makeNewSocket();
  res.send(true);
});

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
