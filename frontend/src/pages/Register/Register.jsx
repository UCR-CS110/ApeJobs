import React from "react";
import {
  InputLabel,
  TextField,
  Select,
  FormGroup,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import { majors } from "../../constants/majors";
import { interestsList } from "../../constants/interests";
import "./Register.css";
const maxGPA = 4;

export const Register = () => {
  const [major, setMajor] = React.useState("");
  const [GPA, setGPA] = React.useState(0);
  const [interests, setInterests] = React.useState([]);
  const [error, setError] = React.useState(false);

  return (
    <div className="registerContainer">
      <Typography variant="h2">Welcome.</Typography>
      <Typography variant="h6">
        To complete your profile, we need more information.
      </Typography>
      <FormGroup sx={{ width: "40%", margin: "auto" }}>
        <InputLabel id="major-select" sx={{ marginTop: "5%" }}>
          Major
        </InputLabel>
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
        <InputLabel id="gpa-text" sx={{ marginTop: "5%" }}>
          GPA
        </InputLabel>
        <TextField
          required
          type="number"
          InputProps={{
            inputMode: "numeric",
            inputProps: {
              max: maxGPA,
              min: 0,
            },
          }}
          onChange={(e) => setGPA(e.target.value)}
        />
        <InputLabel id="interest-select" sx={{ marginTop: "5%" }}>
          Interests
        </InputLabel>
        <Select
          id="interests-select"
          label="interests"
          value={interests}
          onChange={(e) =>
            interests.indexOf(e.target.value) === -1 &&
            setInterests([...interests, e.target.value])
          }
          required
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
        <Button
          variant="contained"
          sx={{ margin: "auto", marginTop: "5%", width: "10%" }}
        >
          Submit
        </Button>
        <FormHelperText sx={{ margin: "auto", marginTop: "5%" }}>
          This information will be visible to professors when applying to roles.{" "}
        </FormHelperText>
      </FormGroup>
    </div>
  );
};
