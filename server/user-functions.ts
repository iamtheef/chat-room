import User from "./models/User";
import { Request, Response } from "express";
import { compare, hashSync } from "bcryptjs";
import { validateAccount, isPasswordValid } from "./utils/isAccountValid";

export const register = async (req: Request, res: Response) => {
  let { msg, logged } = await validateAccount(req);
  if (!logged) {
    res.send({ msg, logged });
    return;
  }

  new User({
    ...req.body.form,
    password: hashSync(req.body.form.password, 10),
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
  const { email, password } = req.body.form;
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

export const update = async (req: Request, res: Response) => {
  const { form, id } = req.body;
  let user = await User.findById(id);

  if (!user) {
    res.send({ logged: false, msg: "SOMETHING WENT WRONG" });
    return;
  }
  let passwordMatch = await compare(form.password, user.password);
  if (!passwordMatch) {
    res.send({ logged: false, msg: "WRONG PASSWORD" });
    return;
  }

  if (!!form.username) {
    user.username = form.username;
  }
  if (!!form.newPassword) {
    if (!isPasswordValid(form.newPassword)) {
      res.send({ logged: false, msg: "WEAK PASSWORD" });
      return;
    }

    user.password = hashSync(req.body.form.newPassword, 10);
  }
  await user.save();

  const { username, _id, unreadMessages, temporaryMessages } = user;
  res.send({
    logged: true,
    user: { username, _id, unreadMessages, temporaryMessages },
  });
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
