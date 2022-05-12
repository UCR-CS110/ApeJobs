import React from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";

export const Profile = () => {
  const { name } = React.useContext(UserContext);
  return (
    <>
      <h1>Profile</h1>
      <p>Welcome, {name}. </p>
    </>
  );
};
