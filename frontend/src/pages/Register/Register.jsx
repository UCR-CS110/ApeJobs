import React from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { ArrowBackUp } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";
import "./Register.css";
import { Form } from "../../components/Register/Form";

export const Register = () => {
  const { email, name, picture, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [type, setType] = React.useState("");

  React.useEffect(() => {
    if (!email) navigate("/signin", { replace: true })
  }, [email, navigate])

  return (
    <div className="registerContainer">
      <Link
        to="/signin"
        onClick={() => {
          setUser({ email: "", name: null });
        }}
      >
        <ArrowBackUp height="30" width="30" />{" "}
      </Link>
      <Typography variant="h2">Welcome.</Typography>
      <Typography variant="h6">
        To complete your profile, we need more information.
      </Typography>
      {type.length < 1 ? (
        <FormControl sx={{ width: "40%", margin: "auto" }}>
          <Typography variant="body1" sx={{ float: "left", marginTop: "2%" }}>
            I am a...
          </Typography>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="professor"
              control={<Radio />}
              label="Professor"
            />
          </RadioGroup>
        </FormControl>
      ) : (
        <Form type={type} email={email} name={name} picture={picture} />
      )}
    </div>
  );
};
