import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  FormGroup,
  FormHelperText,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  Chip,
} from "@mui/material";
import { backendUrl } from "../../constants/backendUrl";
import { majors } from "../../constants/majors";
import { interestsList } from "../../constants/interests";

const maxGPA = 4;

export const Form = ({ type, email, name, picture, setUser }) => {
  const navigate = useNavigate();
  const [major, setMajor] = React.useState("");
  const [GPA, setGPA] = React.useState(0);
  const [interests, setInterests] = React.useState([]);
  const [error, setError] = React.useState();

  const sendSubmit = () => {
    if (major.length < 1) return setError("Please enter a major.");
    const user =
      type === "professor"
        ? {
            email,
            name,
            department: major,
            interests,
            picture,
            type,
          }
        : {
            email,
            name,
            major,
            interests,
            gpa: GPA,
            picture,
            type,
          };
    axios
      .post(`${backendUrl}/register`, user)
      .then((res) => {
        setUser({ id: res.data, major, gpa: GPA, interests });
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Unable to complete your request. Please try again later.");
      });
  };

  return (
    <FormControl sx={{ width: "40%", margin: "auto" }} error={error}>
      <FormGroup>
        <FormLabel id="major-select" sx={{ marginTop: "5%" }}>
          {type === "professor" ? "Department" : "Major"}
        </FormLabel>
        <Select
          id="major-select"
          label={type === "professor" ? "department" : "major"}
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
      {type === "student" && (
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
      )}
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
          : "This information will be visible to others when applying or posting applications."}
      </FormHelperText>
    </FormControl>
  );
};
