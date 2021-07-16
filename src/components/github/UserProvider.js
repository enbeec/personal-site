import React, { useState, createContext } from "react";
import { config as getConfig } from "../../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [config] = useState(getConfig());
  const apiURL = `https://api.github.com/users/${config.github.username}`;

  const [user, setUser] = useState({});
  const getUser = () => fetch(apiURL).then((res) => res.json());

  const [repos, setRepos] = useState([]);
  const getRepos = () => fetch(user.repos_url).then((res) => res.json());

  return (
    <UserContext.Provider
      value={{ getUser, user, setUser, getRepos, repos, setRepos }}
    >
      {children}
    </UserContext.Provider>
  );
};
