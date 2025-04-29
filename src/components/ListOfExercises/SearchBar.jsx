import React, { useState } from "react";
import { InputBase, IconButton, Paper, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchBar = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

 
  const handleSearch = () => {
    onResults(searchTerm); // فقط عبارت جستجو را به بالا پاس می‌دهیم
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
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
        <Typography variant="h5"   color="black">
          بانک حرکات ورزشی
        </Typography>
      </Box>

      {/* کادر جستجو در سمت چپ */}
      <Paper
        component="form"
        sx={{
          p: "1px 4px px px",
          display: "flex",
          alignItems: "center", borderRadius: 1,
          width: 300,
          border: "1px solid #f5f5f5",
          backgroundColor:"#f5f5f5"
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="دنبال چه حرکتی هستی؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          inputProps={{ "aria-label": "جستجوی حرکت ورزشی" }}
        />
        <IconButton
          type="button"
          sx={{
            color: "white",
            backgroundColor: "#00A359",
            "&:hover": {
              backgroundColor: "#008a4f", // رنگ سبز تیره‌تر هنگام هاور
            },
            borderRadius: "0%",}}
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