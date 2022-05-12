import React from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Navigate } from "react-router-dom";
import { backendUrl } from "../../constants/backendUrl";
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
    <div className="signinContainer">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={() =>
          setError("Error authenticating with Google. Please try again.")
        }
        cookiePolicy={"single_host_origin"}
      />
      {error && <p>{error}</p>}
      {email && <Navigate to="/profile" />}
    </div>
  );
};
