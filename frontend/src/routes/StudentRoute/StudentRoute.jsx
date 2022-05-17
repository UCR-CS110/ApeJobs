import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";

//blocks view if user isn't a student
export const StudentRoute = ({ element }) => {
  const { type } = React.useContext(UserContext);
  return <>{type !== "professor" ? element : <Navigate to="/profile" />}</>;
};
