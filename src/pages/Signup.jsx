import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignUpCard from "../components/signup/SignUpCard";
import { Box, Paper, Container } from "@mui/material";
import SignUp_img from "../components/signup/SignUp_img";
import CompactFooter from "../components/CompactFooter";
import { AuthContext } from "../contexts/AuthContext";

export default function Sign_up(props) {
  const { userInfo, logout } = useContext(AuthContext);

  if (userInfo) {
    window.location.href = "/";
  }

  return (
    <>
      <CssBaseline enableColorScheme />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 5,
          }}
        >
          <Paper elevation={20} sx={{ borderRadius: "30px" }}>
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
                sx={{
                  justifyContent: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <SignUp_img />
                </Box>

                <SignUpCard />
              </Stack>
            </Stack>
          </Paper>
        </Container>

        <Box component="footer" sx={{ mt: "auto" }}>
          <CompactFooter />
        </Box>
      </Box>
    </>
  );
}
