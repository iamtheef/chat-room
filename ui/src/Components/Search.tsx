import React, { FC, useState, useEffect, useContext } from "react";
import User from "../../../server/models/User";
import { client } from "../Utils/AxiosClient";
import { UserContext } from "../Context/User";
import { ContactsContext } from "../Context/Contacts";
import { MessagesContext } from "../Context/Messages";

export const Search: FC = () => {
  const { user } = useContext(UserContext);
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
          {results.map((u: typeof User) => (
            <li key={`${u._id}`} className="list-item">
              <img className="user-icon" src={`${u.avatar}`} alt="user img" />
              <p>{user.username}</p>
              <button
                onClick={() => {
                  if (user._id !== u._id) {
                    add(u._id.toString());
                    setCurrentChat(u._id.toString());
                  } else {
                    alert("ELLIOT, IS IT YOU?");
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
