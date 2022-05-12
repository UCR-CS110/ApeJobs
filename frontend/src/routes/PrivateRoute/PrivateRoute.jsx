import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";

export const PrivateRoute = ({element}) => {
  const { email } = React.useContext(UserContext);
  return <>{email ? element: <Navigate to="/signin" />}</>;
};
