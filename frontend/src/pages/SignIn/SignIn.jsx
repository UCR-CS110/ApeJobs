import React from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants/backendUrl";
import { ReactComponent as Files } from "../../images/files.svg";
import Cookies from "js-cookie";
import "./Signin.css";

axios.defaults.withCredentials = true;

export const SignIn = () => {
  const { _id, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = React.useState();

  const handleLogin = (googleData) => {
    axios
      .get(
        `${backendUrl}/api/user-management/auth-google`,
        {
          headers: { "Authorization": googleData.tokenId, "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true },
        },
      )
      .then((res) => {
        let url = "/";
        setUser(res.data);
        console.log(res);
        setError();
        if (!res.data._id) url = "/register";
        navigate(url, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  React.useEffect(() => {
    if (!_id && Cookies.get("token")) axios
      .get(`${backendUrl}/api/user`,)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
        Cookies.remove("token");
      });
  }, [_id, setUser]);

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
      <Files className="signinImg" />
    </>
  );
};
