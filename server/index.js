const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello all possible worlds");
});

app.listen(4000, () => {
  console.log("Server running");
});
