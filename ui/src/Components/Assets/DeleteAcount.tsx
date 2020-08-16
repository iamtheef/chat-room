import React, { FC, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../../Utils/AxiosClient";
import { UserContext } from "../../Context/User";
import * as errors from "../../Errors";

export const DeleteAccount: FC = () => {
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleDeleteAccount = async (password: string) => {
    await client
      .post("/delete_account", { id: user._id, password })
      .then((res) => {
        if (res.data) {
          alert("YOUR ACCOUNT HAS BEEN DELETED");
          setUser(undefined);
          history.push("/");
          return;
        } else if (!res.data) {
          errors.throwWrongPasswordError();
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        errors.throwUnexpectedError();
      });
  };

  return (
    <div className="delete-account">
      <h4>Delete Account</h4>
      <p>Your password</p>
      <input
        style={{ marginBottom: "20px", marginTop: "-40px" }}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button
        onClick={() => handleDeleteAccount(password)}
        style={{ marginLeft: "10px" }}
      >
        OK
      </button>
    </div>
  );
};
