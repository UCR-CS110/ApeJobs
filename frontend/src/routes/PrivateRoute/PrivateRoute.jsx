import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";

export const PrivateRoute = ({ element }) => {
  const { _id } = React.useContext(UserContext);
  return <>{_id ? element : <Navigate to="/signin" />}</>;
};
