import React, { FC, useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../Context/User";
import { Form } from "../../../types";
import { InfoIcon } from "./Assets/InfoIcon";
import { forgotPasswordError } from "../Errors";

export const Landing: FC = () => {
  const { submit, user } = useContext(UserContext);
  const [view, setView] = useState("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const history = useHistory();

  const form: Form = {
    email,
    password,
    username,
  };

  useEffect(() => {
    if (user) {
      history.push("/main");
    }
  }, [user, history]);
  return (
    <div>
      <section className="forms-section">
        <h1 className="section-title">Welcome to our service</h1>
        <h3>
          <i className="quote">May all you type dissapear</i>
        </h3>
        <div className="icons">
          <InfoIcon />
        </div>
        <div className="forms">
          <div className={`form-wrapper ${view === "login" && "is-active"}`}>
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => setView("login")}
            >
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login">
              <fieldset>
                <legend>Please, enter your email and password to login.</legend>
                <div className="input-block">
                  <label>E-mail</label>
                  <input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Link to="#" onClick={() => forgotPasswordError()}>
                  Forgot your password?
                </Link>
              </fieldset>
              <button
                className="btn-login"
                type="submit"
                onClick={(e) => submit(e, form, view)}
              >
                Login
              </button>
            </form>
          </div>
          <div className={`form-wrapper ${view === "register" && "is-active"}`}>
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={() => setView("register")}
            >
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup">
              <fieldset>
                <legend>
                  Please, enter your email, password and password confirmation
                  for sign up.
                </legend>

                <div className="input-block">
                  <label>Username</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="input-block">
                  <label>E-mail</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>
                <div className="input-block">
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                className="btn-signup"
                onClick={(e) => submit(e, form, view)}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
