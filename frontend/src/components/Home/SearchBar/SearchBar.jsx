import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { interestsList } from "../../../constants/interests";

export const SearchBar = ({ onChange }) => (
  <Autocomplete
    freeSolo
    id="combo-box"
    options={Object.keys(interestsList)}
    sx={{ width: "60%", margin: "auto" }}
    onInputChange={(e, value) => onChange(value)}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search"
        InputProps={{
          ...params.InputProps,
          type: "search",
        }}
      />
    )}
  />
);
