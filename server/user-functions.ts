import User from "./models/User";
import { Request, Response } from "express";
import { compare, hashSync } from "bcryptjs";
import { validateAccount, isPasswordValid } from "./utils/isAccountValid";
import * as errors from "./Errors";

export const register = async (req: Request, res: Response) => {
  let { msg, logged } = await validateAccount(req);
  if (!logged) {
    res.send({ msg, logged });
    return;
  }
  if (!!(await User.findOne({ email: req.body.form.email }))) {
    res.send(errors.alreadySignedError());
    return;
  }

  new User({
    ...req.body.form,
    password: hashSync(req.body.form.password, 10),
  })
    .save()
    .then((user) => {
      if (user) {
        const { username, _id, unreadMessages, temporaryMessages } = user;
        res.send({
          logged: true,
          user: { username, _id, unreadMessages, temporaryMessages },
        });
        return;
      }
    })
    .catch((e) => res.send(e));
};

export const login = async (req: Request, res: Response) => {
  console.log(req.headers);
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
      res.send(errors.wrongCredentialsError());
    }
  } else {
    res.send(errors.wrongCredentialsError());
  }
};

export const update = async (req: Request, res: Response) => {
  const { form, id } = req.body;
  let user = await User.findById(id);

  if (!user) {
    res.send(errors.unexpectedError());
    return;
  }
  let passwordMatch = await compare(form.password, user.password);
  if (!passwordMatch) {
    res.send(errors.wrongPasswordError());
    return;
  }

  if (!!form.username) {
    user.username = form.username;
  }
  if (!!form.newPassword) {
    if (!isPasswordValid(form.newPassword)) {
      res.send(errors.weakPasswordError());
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

export const deleteAccount = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  const user = await User.findById(id);
  if (user) {
    let match = await compare(password, user.password);
    if (match) {
      await user.remove();
      res.send(true);
      return;
    } else {
      res.send(false);
      return;
    }
  } else {
    res.send(false);
    return;
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
