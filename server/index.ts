const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello all possible worlds");
});

app.post("/register", (req, res) => {
  res.send("MDMA");
});

app.post("/login", (req, res) => {
  res.send("MDMA");
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
