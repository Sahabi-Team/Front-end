import React from 'react';
import { Box, Typography, Paper, IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function ShareCard() {
  const iconStyle = {
    backgroundColor: "primary.main",
    color: "white",
    boxShadow: 3,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "primary.dark",
      transform: "scale(1.2) rotate(-5deg)",
      boxShadow: 6,
    },
    width: 35,
    height: 35,
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        px: {xs:2,md:6},
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* آیکن‌ها */}
      <Box display="flex" alignItems="center">
        <Box mx={1}>
          <IconButton
            sx={iconStyle}
            component="a"
            href="https://t.me/yourchannel" // آدرس موردنظر
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon sx={{ color: "white" }}/>
          </IconButton>
        </Box>
        <Box mx={1}>
          <IconButton
            sx={iconStyle}
            component="a"
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon sx={{ color: "white" }}/>
          </IconButton>
        </Box>
        <Box mx={1}>
          <IconButton
            sx={iconStyle}
            component="a"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon sx={{ color: "white" }}/>
          </IconButton>
        </Box>
        <Box mx={1}>
          <IconButton
            sx={iconStyle}
            component="a"
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon sx={{ color: "white" }}/>
          </IconButton>
        </Box>
      </Box>

      {/* متن */}
      <Typography fontWeight="bold">به اشتراک بگذارید</Typography>
    </Paper>
  );
}
