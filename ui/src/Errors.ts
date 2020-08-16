export const forgotPasswordError = () => {
  alert(
    "If you forgot your password please contact us at iamtheef_th@protonmail.com"
  );
};

export const throwSelfContactError = () => {
  alert("ELLIOT, IS IT YOU?");
};

export const throwDuplicateContactError = () => {
  alert("DUPLICATE CONTACTS ARE NOT ALLOWED");
};

export const throwWrongPasswordError = () => {
  alert("INCORRECT PASSWORD");
};

export const throwUnexpectedError = () => {
  alert("Something went wrong \n");
};

export const throwError = (error: string) => {
  alert(error);
};
