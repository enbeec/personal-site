import React, { useState, createContext } from "react";
import { config as getConfig } from "../../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [config] = useState(getConfig());
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  const apiURL = `https://api.github.com/users/${config.github.username}`;
  const getUser = () => fetch(apiURL).then((res) => res.json());

  return (
    <UserContext.Provider value={{ getUser, user, setUser, repos, setRepos }}>
      {children}
    </UserContext.Provider>
  );
};
