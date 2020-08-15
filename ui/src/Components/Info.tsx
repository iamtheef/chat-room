import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Info: FC = () => {
  return (
    <div>
      <Link to="/main">
        {" "}
        <p className="quote">{"<<<"} </p>{" "}
      </Link>
      <div className="info">
        <h2>Designed by Thergiakis Eftichios</h2>

        <div>
          <h3>Functionality of the app</h3>
          <p>
            Your messages are encrypted with AES algorithm when sent, decrypted
            only when arrived and salted with a secret key. They are transfered
            throught https protocol and are cleared after every logout or
            refresh of the page. You don't need to logout because practically
            you never get logged in. Everything is loaded in a temporary state
            in your browser tab and nothing gets stored to the server
            permanently. When the receiver is offline the messages are only then
            stored in the database temporarely and they are cleared immediatelly
            after the receiver logs in.{" "}
            <b>
              We strongly suggest that you read all of your messages because
              they will be lost after you logout.
            </b>{" "}
            We are not using any cookies for the functionality of the app and we
            don't store or sell any of your data, neither we have any profit out
            of them elsehow. We believe in free speech and we strive for a
            personal space online for everyone to hangout without being watched
            or listened.
          </p>
          <h3>Contact </h3>
          <p>
            If you find any bugs or you would like to contribute please email us
            at <em>iamtheef_th@protonmail.com</em> or talk to the admin here{" "}
            <em>iamtheef</em>. If you have any suspicions that your account has
            been compromised please don't hesitate to contact us immediatelly.
          </p>
          You can find the source code of the app{" "}
          <a href="https://github.com/iamtheef/chat-room">here</a>.
        </div>
      </div>
    </div>
  );
};
