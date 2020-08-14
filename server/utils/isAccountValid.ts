import User from "../models/User";
import validator from "validator";
import { Request } from "express";

const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const validateAccount = async (req: Request) => {
  const { email, password, username } = req.body.form;

  if (!email) {
    return { logged: false, msg: "EMAIL IS REQUIRED" };
  }
  if (!username) {
    return { logged: false, msg: "USERNAME IS REQUIRED" };
  }
  if (!password) {
    return { logged: false, msg: "PASSWORD IS REQUIRED" };
  }

  let existingUser = !!(await User.findOne({ email: email }));
  if (existingUser) {
    return { logged: false, msg: "YOU ARE ALREADY SIGNED" };
  } else {
    if (!validator.isEmail(email)) {
      return { logged: false, msg: "EMAIL IS NOT VALID" };
    }

    if (!isPasswordValid(password)) {
      return {
        logged: false,
        msg:
          "PASSWORD MUST CONTAIN AT LEAST A NUMBER, A SYMBOL AND HAVE MINIMUM LENGTH OF 8 CHARACTERS",
      };
    } else {
      return { logged: true };
    }
  }
};

export const isPasswordValid = (password: string) => {
  return !(
    password.length < 7 ||
    validator.isAlphanumeric(password) ||
    !specialChars.test(password)
  );
};
