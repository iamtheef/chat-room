import React, { FC, useState, useEffect, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { ContactsContext } from "../Context/Contacts";

export const Search: FC = () => {
  const { add } = useContext(ContactsContext);
  const [results, setResults] = useState<any>([]);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    if (term === "" || term.length <= 3) {
      setResults([]);
    } else {
      client.post("/search", { term: term }).then((users) => {
        setResults(users.data);
      });
    }
  }, [term]);

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
              <button onClick={() => add(user._id.toString())}>Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
