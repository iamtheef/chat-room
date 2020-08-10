import React, { FC, useState, useEffect, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { ContactsContext } from "../Context/Contacts";
import { MessagesContext } from "../Context/Messages";

export const Search: FC = () => {
  const { add } = useContext(ContactsContext);
  const [results, setResults] = useState<any>([]);
  const [term, setTerm] = useState<string>("");
  const { setCurrentChat } = useContext(MessagesContext);

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
      <h2 className="title">Search</h2>
      <form className="search-bar">
        <input type="search" onChange={(e) => setTerm(e.target.value)} />
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
              <button
                onClick={() => {
                  add(user._id.toString());
                  setCurrentChat(user._id.toString());
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
