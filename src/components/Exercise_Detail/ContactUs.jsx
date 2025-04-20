import React from 'react'
import { Box, Typography, Stack, Paper, IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";


export default function ShareCard() {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p:2,
        paddingLeft:10 ,
        paddingRight:10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        direction: "rtl", // برای راست‌چین کردن
      }}
    >
     

      <Stack direction="row" spacing={3}>
        <IconButton>
          <TelegramIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <LinkedInIcon />
        </IconButton>
        <IconButton>
          <InstagramIcon />
        </IconButton>
      </Stack>
      <Typography fontWeight="bold">به اشتراک بگذارید</Typography>
    </Paper>
  );
}
