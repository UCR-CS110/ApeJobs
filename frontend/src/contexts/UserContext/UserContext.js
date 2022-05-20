import React from "react";

const defaultContext = {
  id: null,
  email: "test",
  name: "Ape Apes",
  picture: null,
  setUser: () => null,
  type: "student",
  interests: ["Data Science",
  "Web Development",
  "Machine Learning",
  ],
  major: "Finesser",
  gpa: "1.0",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};

export const UserContext = React.createContext(defaultContext);

export const UserContextProvider = (props) => {
  const setUser = (user) => {
    setState({ ...state, ...user });
  };
  const [state, setState] = React.useState({ ...defaultContext, setUser });
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
