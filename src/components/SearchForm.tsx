import React from "react";
import TextField from "@mui/material/TextField";

// import InputLabel from '@mui/material/InputLabel';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm: React.FC<{
  keywordChangeHandler: (value: string) => void;
}> = (props) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.keywordChangeHandler(event.target.value);
  };
  return (
    <React.Fragment>
      <h4>Filter by keywords:</h4>
      <form>
        <TextField
          sx={{ width: 600, boxShadow: "6", mb: "10px" }}
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          name="name"
          onChange={changeHandler}
        >
          <SearchIcon />
        </TextField>
      </form>
    </React.Fragment>
  );
};
export default SearchForm;
