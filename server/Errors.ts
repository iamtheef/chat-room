export const alreadySignedError = () => {
  return { msg: "YOU ARE ALREADY SIGNED", logged: false };
};
export const wrongCredentialsError = () => {
  return { logged: false, msg: "WRONG CREDENTIALS" };
};

export const unexpectedError = () => {
  return { logged: false, msg: "SOMETHING WENT WRONG" };
};

export const wrongPasswordError = () => {
  return { logged: false, msg: "WRONG PASSWORD" };
};

export const weakPasswordError = () => {
  return { logged: false, msg: "WEAK PASSWORD" };
};
