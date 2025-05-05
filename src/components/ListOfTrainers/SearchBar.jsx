import React, { useState } from "react";
import { InputBase, IconButton, Paper, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearch = () => {
    onResults(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      handleSearch();
  };

  return (
    <Paper elevation={3} sx={{display: "flex", alignItems: "center", mb: 4, p: 2, borderRadius: 2}}>
      <Box sx={{ flexGrow: 1, textAlign: "left" }}>
        <Typography fontSize={24} fontWeight={500}>
          لیست مربی ها
        </Typography>
      </Box>

      <Paper component="form" sx={{p: "0px 0px 0px 5px", display: "flex", borderRadius: "6px", backgroundColor:"#F7F7F7"}}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="دنبال شخص خاصی میگردی؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconButton
          type="button"
          sx={{color: "white", backgroundColor: "#00A359", "&:hover": {backgroundColor: "#008a4f"}, borderRadius: "0px 6px 6px 0px"}}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
};

export default SearchBar;