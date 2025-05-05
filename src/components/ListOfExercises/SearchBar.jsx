import React, { useState } from "react";
import { InputBase, IconButton, Paper, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onResults(searchTerm); // فقط عبارت جستجو را به بالا پاس می‌دهیم
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "90%",
        maxWidth: 1200,
        mx: "auto",
        mb: 4,
        mr:0,
        p: 2,
        bgcolor: "#white",
        borderRadius: 2,
      }}
    >
      {/* عنوان بانک حرکات ورزشی در سمت راست */}
      <Box sx={{ flexGrow: 1, textAlign: "LEFT" }}>
        <Typography fontSize={24} fontWeight={500}>
          بانک حرکات ورزشی
        </Typography>
      </Box>

      {/* کادر جستجو در سمت چپ */}
      <Paper component="form" onSubmit={(e) => {e.preventDefault(); handleSearch();}} sx={{p: "0px 0px 0px 5px", display: "flex", borderRadius: "6px", backgroundColor:"#F7F7F7"}}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="دنبال چه حرکتی هستی؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputProps={{"aria-label": "جستجوی حرکت ورزشی"}}
        />
        <IconButton
          type="submit"
          sx={{color: "white", backgroundColor: "#00A359", "&:hover": {backgroundColor: "#008a4f"}, borderRadius: "0px 6px 6px 0px"}}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
};

export default SearchBar;