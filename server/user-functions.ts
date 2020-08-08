import User from "./models/User";
import { Request, Response } from "express";
import { compare, hashSync, compareSync } from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) res.send({ logged: false, msg: "YOU ARE ALREADY SIGNED" });

  new User({
    ...req.body,
    password: hashSync(req.body.password, 10),
  })
    .save()
    .then((user) => {
      if (user) {
        const { username, _id, unreadMessages } = user;
        res.send({ logged: true, user: { username, _id, unreadMessages } });
        return;
      }
    })
    .catch((e) => res.send(e));
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (await compare(password, user.password)) {
      const { username, _id, unreadMessages } = user;
      res.send({ logged: true, user: { username, _id, unreadMessages } });
      return;
    } else {
      res.send({ logged: false, msg: "WRONG CREDENTIALS" });
    }
  } else {
    res.send({ logged: false, msg: "WRONG CREDENTIALS" });
  }
};

export const expireMessages = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.unreadMessages = [];
    await user.save();
  }

  res.send(true);
};
