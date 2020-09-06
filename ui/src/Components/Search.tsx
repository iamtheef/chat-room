import React, { FC, useState, useEffect, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { UserContext } from "../Context/User";
import { ContactsContext } from "../Context/Contacts";
import { AdminIcon } from "./Assets/AdminIcon";
import { throwSelfContactError } from "../Errors";

export const Search: FC = () => {
  const { user } = useContext(UserContext);
  const { add } = useContext(ContactsContext);
  const [results, setResults] = useState<any>([]);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    if (term === "" || term.length < 3) {
      setResults([]);
    } else {
      client.post("/search", { term: term }).then((users) => {
        setResults(users.data);
      });
    }
  }, [term]);

  return (
    <div className="search-box">
      <h2 className="title">Search</h2>
      <form className="search-bar">
        <input
          type="search"
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />
      </form>

      <div>
        <ul className="search">
          {results.map((u: typeof User) => (
            <li key={`${u._id}`} className="list-item">
              <img className="user-icon" src={`${u.avatar}`} alt="user img" />
              <p>{u.username}</p>
              {u.isAdmin && <AdminIcon />}
              <button
                onClick={() => {
                  if (user._id !== u._id) {
                    add(u._id.toString());
                  } else {
                    throwSelfContactError();
                  }
                }}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
