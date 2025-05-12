import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "center",
  //paddingTop: theme.spacing(6),
  direction: "rtl",
  fontFamily: "Vazirmatn, sans-serif",
}));

const Image = styled("img")({
  maxWidth: "700px",
  width: "95%",
});

function NotFoundPage() {
  return (
    <Container>
      <Image src="/404.svg" alt="404" />

      <Typography variant="h4" sx={{  fontWeight: "bold", color: "black", mb: 1 }}>
         !اوووووپس! این صفحه وجود نداره
      </Typography>

      <Typography variant="body1" sx={{ color: "black", fontSize: "1.4rem", mb: 0.5 }}>
        به نظر می‌رسه مسیر رو اشتباه رفتی <br />  ، اما نگران نباش
      </Typography>

      <Typography variant="body1" sx={{ color: "black", fontSize: "1.4rem", mb: 0.5 }}>
          !برگرد به {" "}
        <RouterLink
          to="/"
          style={{ color: "#2e7d32", fontWeight: "bold", textDecoration: "underline" }}
        >
          صفحه اصلی
        </RouterLink>{" "}
         و مربی مورد علاقت رو پیدا کن و ادامه بده
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2, color: "black", fontSize: "1.4rem" }}>
         (:یادت نره: حتی اشتباه رفتن هم بخشی از مسیر پیشرفته  
      </Typography>
    </Container>
  );
}

export default NotFoundPage;
