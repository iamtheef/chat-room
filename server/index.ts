import User from "./models/User";
import { connectDB, app } from "./configuration";
import { compare, hashSync, compareSync } from "bcryptjs";

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
          res.send({ logged: true, msg: "WELCOME" });
          return;
        }
      })
      .catch((e) => res.send(e));
  } else {
    res.send({ logged: false, msg: "YOU ARE ALREADY SIGNED" });
    return;
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email })
    .then(async (user) => {
      if (await compare(password, user.password)) {
        const { username, _id } = user;

        res.send({ logged: true, user: { username, _id } });
      } else {
        res.send({ logged: false, msg: "WRONG CREDENTIALS" });
      }
    })
    .catch((e) => {
      console.error(e);
      res.send({ logged: false, msg: "WRONG CREDENTIALS" });
    });
});

app.post("/search", async (req, res) => {
  const users = await User.find({ username: req.body.term });
  res.send(users);
});

app.post("/add", async (req, res) => {
  const { _id, add } = req.body;
  const currentUser = await User.findById(_id);
  const addUser = await User.findById(add);
  currentUser.contacts.push(addUser._id);
  currentUser
    .save()
    .then((response) => {
      res.send(true);
    })
    .catch((e) => {
      console.log(e);
      res.send(false);
    });
});

app.post("/remove", async (req, res) => {
  const { _id, id } = req.body;
  const currentUser = await User.findById(_id);
  for (let i = 0; i < currentUser.contacts.length; i++) {
    if (currentUser.contacts[i] == id) {
      currentUser.contacts.splice(i, 1);
    }
  }
  currentUser
    .save()
    .then((response) => {
      res.send(true);
    })
    .catch((e) => {
      console.log(e);
      res.send(false);
    });
});

app.post("/getcontacts", (req, res) => {
  const { id } = req.body;
  User.findById(id)
    .populate("contacts")
    .then((user) => {
      res.send(user.contacts);
    })
    .catch((e) => {
      res.send([]);
    });
});
