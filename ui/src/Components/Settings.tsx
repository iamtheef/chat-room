import React, { FC, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../Context/User";
import { ProfileUpdatePayload } from "../../../types";
import { DeleteAccount } from "./Assets/DeleteAcount";

export const Settings: FC = () => {
  const { user, submit } = useContext(UserContext);

  const [form, setForm] = useState<ProfileUpdatePayload>({
    username: "",
    password: "",
    newPassword: "",
  });

  const handleSubmit = async (e: any) => {
    document.getElementsByName("field").forEach((f: any) => {
      f.value = "";
    });

    let updateCompleted = await submit(e, form, "update", user._id);

    if (updateCompleted) {
      setForm({
        username: "",
        password: "",
        newPassword: "",
      });

      alert("YOUR ACCOUNT HAS BEEN UPDATED");
    }
  };

  return user ? (
    <div className="quote">
      <h2>SETTINGS</h2>
      <Link to="/main">
        {" "}
        <p className="quote">{"<<<"} </p>{" "}
      </Link>
      <h3 className="settings-field" style={{ marginTop: "-5px" }}>
        Change Password
      </h3>
      <input
        name="field"
        type="password"
        onChange={(e) => {
          e.persist();
          setForm((prev) => ({ ...prev, newPassword: e.target.value }));
        }}
      ></input>
      <h3 className="settings-field">Change Username</h3>
      <input
        name="field"
        onChange={(e) => {
          e.persist();
          setForm((prev) => ({ ...prev, username: e.target.value }));
        }}
      ></input>

      <p style={{ marginTop: "40px", marginBottom: "-0px" }}>
        Please enter your old password to confirm changes *{" "}
      </p>
      <input
        name="field"
        style={{ marginBottom: "20px" }}
        type="password"
        onChange={(e) => {
          e.persist();
          setForm((prev) => ({ ...prev, password: e.target.value }));
        }}
      ></input>
      <div>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
      <DeleteAccount />
    </div>
  ) : (
    <Redirect to="login" />
  );
};
