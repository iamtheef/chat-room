import React, { FC, useState, useEffect } from "react";
import User from "../../../server/models/User";
import axios from "axios";

export const Search: FC = () => {
  const [results, setResults] = useState<any>([]);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    axios.post("http://localhost:4000/search", { term: term }).then((users) => {
      setResults(users.data);
    });
  }, [term]);

  //   const add = (currentUser: string, add: string) => {
  //     axios
  //       .post("http://localhost:4000/add", { currentUser, add })
  //       .then((contacts) => {
  //         setResults(contacts.data);
  //       });
  //   };

  return (
    <div className="search-box">
      <form action="" className="search-bar">
        <input
          type="search"
          name="search"
          pattern=".*\S.*"
          required
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>

      <div>
        <ul className="search">
          {results.map((user: typeof User) => (
            <li key={`${user._id}`} className="list-item">
              <img
                className="user-icon"
                src={`${user.avatar}`}
                alt="user img"
              />
              <p>{user.username}</p>
              <button>Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
