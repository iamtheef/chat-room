import React, { FC } from "react";
import { useState } from "react";

export const Landing: FC = () => {
  const [view, setView] = useState("login");

  return (
    <div>
      <section className="forms-section">
        <h1 className="section-title">Welcome to our service</h1>
        <h3>
          <i>May all you type dissapear</i>
        </h3>
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
                  <input id="login-email" type="email" required />
                </div>
                <div className="input-block">
                  <label>Password</label>
                  <input id="login-password" type="password" required />
                </div>
              </fieldset>
              <button type="submit" className="btn-login">
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
                  <input id="signup-password-confirm" type="text" required />
                </div>
                <div className="input-block">
                  <label>E-mail</label>
                  <input id="signup-email" type="email" required />
                </div>
                <div className="input-block">
                  <label>Password</label>
                  <input id="signup-password" type="password" required />
                </div>
                <div className="input-block">
                  <label>Confirm password</label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
