import User from "./models/User";
import { Request, Response } from "express";
import { getOnlineUsers } from "./webSocket-server";

export const add = async (req: Request, res: Response) => {
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
};

export const remove = async (req: Request, res: Response) => {
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
};

export const getContacts = (req: Request, res: Response) => {
  const { id } = req.body;
  User.findById(id)
    .populate("contacts")
    .then((user) => {
      res.send({ contacts: user.contacts, status: getOnlineUsers() });
    })
    .catch((e) => {
      res.send([]);
    });
};

export const search = async (req: Request, res: Response) => {
  const users = await User.find({ username: req.body.term });
  res.send(users);
};

export const removeRequest = async (req: Request, res: Response) => {
  const { user, id } = req.body;
  let foundUser = await User.findById(user);

  foundUser.temporaryMessages = foundUser.temporaryMessages.filter(
    (m: any) => m.user !== id
  );

  foundUser.save().then((saved) => {
    if (!!saved) {
      res.send(true);
      return;
    }
    res.send(false);
    return;
  });

  return;
};
