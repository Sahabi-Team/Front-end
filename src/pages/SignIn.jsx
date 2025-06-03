import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "../components/signin/SignInCard";
import SignIn_img from "../components/signin/SignIn_img";
import { Box, Container, Paper } from "@mui/material";
import CompactFooter from "../components/CompactFooter";
import { AuthContext } from "../contexts/AuthContext";

export default function Sign_in() {
  const { userInfo } = useContext(AuthContext);

  if (userInfo) {
    window.location.href = "/";
    return null; // جلوگیری از رندر اضافی
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      
      {/* ساختار اصلی صفحه با minHeight برابر 100vh */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* محتوای اصلی */}
        <Container
          sx={{
            flex: 1, // بخش اصلی صفحه بسط داده می‌شود
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Paper
            elevation={24}
            sx={{
              borderRadius: "30px",
              maxWidth: "lg",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Stack
              direction="column"
              component="main"
              sx={{
                justifyContent: "center",
                minHeight: "100%",
              }}
            >
              <Stack
                direction={{ xs: "column-reverse", md: "row" }}
                sx={{ justifyContent: "center", mx: "auto" }}
              >
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <SignIn_img />
                </Box>

                <SignInCard />
              </Stack>
            </Stack>
          </Paper>
        </Container>

        {/* فوتر در پایین صفحه */}
        <Box component="footer">
          <CompactFooter />
        </Box>
      </Box>
    </>
  );
}
