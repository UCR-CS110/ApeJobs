import React from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Navigate } from "react-router-dom";
import { backendUrl } from "../../constants/backendUrl";
import { ReactComponent as Files } from "../../images/files.svg";
import "./Signin.css";

export const SignIn = () => {
  const { email, setUser } = React.useContext(UserContext);
  const [error, setError] = React.useState();

  const handleLogin = (googleData) => {
    axios
      .post(
        `${backendUrl}/api/user-management/auth-google`,
        {
          token: googleData.tokenId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setUser(res.data.create);
        setError();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <>
      <Typography variant="h2" sx={{ marginTop: "10%" }}>
        Welcome.
      </Typography>
      <div className="signinContainer">
        <Typography variant="body1">
          Connect your UCR Google account to continue.
        </Typography>
        <br />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={() =>
            setError("Error authenticating with Google. Please try again.")
          }
          cookiePolicy={"single_host_origin"}
        />
      </div>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: "2%" }}>
          {error}
        </Typography>
      )}
      {email && <Navigate to="/register" />}
      <Files className="signinImg" />
    </>
  );
};
