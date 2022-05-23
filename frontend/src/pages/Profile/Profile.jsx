import React from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Button } from "@mui/material";

export const Profile = () => {
  const { name, setUser } = React.useContext(UserContext);
  return (
    <>
      <h1>Profile</h1>
      <p>Welcome, {name}. </p>
      <Button variant="contained" onClick={() => setUser({})}>Sign Out</Button>
    </>
  );
};
