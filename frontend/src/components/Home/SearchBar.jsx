import { Autocomplete, TextField } from "@mui/material";
import { interestsList } from "../../constants/interestsList";

export const SearchBar = (data) => {
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={interestsList}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Movie" />}
  />;
};
