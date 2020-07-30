import User from "./models/User";
import { Request, Response } from "express";
import { compare, hashSync } from "bcryptjs";

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
        res.send({
          logged: true,
          user: { username: user.username, _id: user._id },
        });
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
      const { username, _id } = user;
      res.send({ logged: true, user: { username, _id } });
    } else {
      res.send({ logged: false, msg: "WRONG CREDENTIALS" });
    }
  } else {
    res.send({ logged: false, msg: "WRONG CREDENTIALS" });
  }
};
