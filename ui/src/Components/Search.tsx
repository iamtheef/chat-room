import React, { FC, useState, useEffect, useContext } from "react";
import User from "../../../server/models/User";
import axios from "axios";
import { UserContext } from "../Context/User";
import { ContactsContext } from "../Context/Contacts";

export const Search: FC = () => {
  const { user } = useContext(UserContext);
  const { setContacts } = useContext(ContactsContext);
  const [results, setResults] = useState<any>([]);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    search();
  }, [term]);

  const search = () => {
    if (term.length > 4) {
      axios
        .post("http://localhost:4000/search", { term: term })
        .then((users) => {
          setResults(users.data);
        });
    }
  };

  const add = (add: string) => {
    const { _id } = user;
    axios.post("http://localhost:4000/add", { _id, add }).then((contacts) => {
      if (contacts.data) {
        setContacts(contacts.data);
      }
    });
  };

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
              <button onClick={() => add(user._id.toString())}>Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
