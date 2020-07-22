import User from "./models/User";
import { connectDB, app } from "./configuration";

(async () => {
  connectDB();
  await app.listen(4000, () => {
    console.log("Server running on 4000");
  });
})();

app.get("/", (req, res) => {
  res.send("Hello all possible worlds");
});

app.post("/register", (req, res) => {
  const user = new User({ ...req.body });
  user
    .save()
    .then((user) => res.send(user))
    .catch((e) => res.send(e));
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("MDMA");
});
