import React from "react";
import Cookies from 'js-cookie';

const defaultContext = {
  _id: null,
  email: null,
  name: null,
  picture: null,
  setUser: () => null,
  type: "student",
  token: Cookies.get("auth_token"),
  interests: [],
  department: null,
  major: null,
  gpa: null,
  about: null,
  applications: [],
};

export const UserContext = React.createContext(defaultContext);

export const UserContextProvider = (props) => {
  const setUser = (user) => {
    setState((prev) => ({...prev, ...user}));
  };
  const [state, setState] = React.useState({ ...defaultContext, setUser });
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
