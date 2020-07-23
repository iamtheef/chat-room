import User from "./models/User";
import { connectDB, app } from "./configuration";
import { compare, hashSync } from "bcryptjs";

(async () => {
  connectDB();
  await app.listen(4000, () => {
    console.log("Server running on 4000");
  });
})();

app.post("/register", async (req, res) => {
  let existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    const user = await new User({
      ...req.body,
      password: hashSync(req.body.password, 10),
    }).save();
    user
      .save()
      .then((user) => {
        if (user) {
          res.send("WELCOME!");
          return;
        }
      })
      .catch((e) => res.send(e));
  } else {
    res.send("You are already signed!");
    return;
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (await compare(password, user.password)) {
        const { username, contacts } = user;
        res.send({ username, contacts });
      } else {
        res.send("wrong credits");
      }
    })
    .catch((e) => {
      console.error(e);
      res.send("wrong credits");
    });
});
