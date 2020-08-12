import User from "./models/User";
import { Request, Response } from "express";
import { compare, hashSync } from "bcryptjs";
import { validateAccount } from "./utils/isAccountValid";

export const register = async (req: Request, res: Response) => {
  let { msg, logged } = await validateAccount(req);
  if (!logged) {
    res.send({ msg, logged });
    return;
  }

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
      const { username, _id, unreadMessages, temporaryMessages } = user;
      res.send({
        logged: true,
        user: { username, _id, unreadMessages, temporaryMessages },
      });
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
    res.send(true);
    return;
  }

  res.send(false);
};

export const storeMessage = async (req: Request, res: Response) => {
  const { id, msg } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.temporaryMessages.push(msg);
    await user.save();
    res.send(true);
    return;
  }
  res.send(false);
};

export const getMessagesByThisContact = async (req: Request, res: Response) => {
  const { me, contact } = req.body;
  const user = await User.findById(me);
  if (user) {
    let foundMessages = user.temporaryMessages.filter(
      (msg: any) => msg.sender === contact
    );
    user.temporaryMessages = user.temporaryMessages.filter(
      (msg: any) => msg.sender !== contact
    );
    await user.save();
    res.send(foundMessages);
    return;
  }
  res.send([]);
};
