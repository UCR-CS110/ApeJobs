import React from "react";
import {
  TextField,
  Select,
  FormGroup,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Chip,
} from "@mui/material";
import { majors } from "../../constants/majors";
import { interestsList } from "../../constants/interests";
import { ArrowBackUp } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";
import "./Register.css";
import axios from "axios";
import { backendUrl } from "../../constants/backendUrl";

const maxGPA = 4;

export const Register = () => {
  const { email, name, picture, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [major, setMajor] = React.useState("");
  const [GPA, setGPA] = React.useState(0);
  const [interests, setInterests] = React.useState([]);
  const [error, setError] = React.useState();

  const sendSubmit = () => {
    if (major.length < 1) return setError("Please enter a major.");
    axios
      .post(`${backendUrl}/register`, {
        email,
        name,
        picture,
        major,
        interests,
        gpa: GPA,
      })
      .then((res) => {
        setUser({ id: res.data, major, gpa: GPA, interests });
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Unable to complete your request. Please try again later.");
      });
  };

  return (
    <div className="registerContainer">
      <Link
        to="/signin"
        onClick={() => {
          setUser({ email: "", name: null });
        }}
      >
        <ArrowBackUp height="30" width="30" />
      </Link>
      <Typography variant="h2">Welcome.</Typography>
      <Typography variant="h6">
        To complete your profile, we need more information.
      </Typography>
      <FormControl sx={{ width: "40%", margin: "auto" }} error={error}>
        <FormGroup>
          <FormLabel id="major-select" sx={{ marginTop: "5%" }}>
            Major
          </FormLabel>
          <Select
            id="major-select"
            label="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          >
            {majors.map((major, index) => (
              <MenuItem key={index} value={major}>
                {major}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel id="gpa-text" sx={{ marginTop: "5%" }}>
            GPA
          </FormLabel>
          <TextField
            required
            type="number"
            label="GPA"
            InputProps={{
              inputMode: "numeric",
              inputProps: {
                max: maxGPA,
                min: 0,
              },
            }}
            onChange={(e) => setGPA(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel id="interest-select" sx={{ marginTop: "5%" }}>
            Interests
          </FormLabel>
          <Select
            id="interests-select"
            label="interests"
            value={interests}
            onChange={(e) =>
              interests.indexOf(e.target.value) === -1 &&
              setInterests([...interests, e.target.value])
            }
          >
            {Object.keys(interestsList).map((interest, index) => (
              <MenuItem key={index} value={interest}>
                {interest}
              </MenuItem>
            ))}
          </Select>
          <div className="tagHolder">
            {interests.map((interest, index) => (
              <React.Fragment key={index}>
                <Chip
                  key={index}
                  label={interest}
                  color={interestsList[interest]}
                />
                <Button
                  variant="text"
                  onClick={() => {
                    setInterests(
                      interests.filter(
                        (item, interestIndex) => interestIndex !== index
                      )
                    );
                  }}
                >
                  x
                </Button>
              </React.Fragment>
            ))}
          </div>
        </FormGroup>
        <FormGroup>
          <Button
            variant="contained"
            sx={{ margin: "auto", marginTop: "5%", width: "10%" }}
            type="submit"
            onClick={sendSubmit}
          >
            Submit
          </Button>
        </FormGroup>
        <FormHelperText sx={{ margin: "auto", marginTop: "5%" }}>
          {error
            ? error
            : "This information will be visible to professors when applying to roles."}
        </FormHelperText>
      </FormControl>
    </div>
  );
};
