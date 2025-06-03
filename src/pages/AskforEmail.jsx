import { Box, Container, Paper, Stack } from "@mui/material";
import React from "react";
import ForgotPassword from "../assets/imgs/main_forgotpassword.png";
import CssBaseline from "@mui/material/CssBaseline";
import AskforEmailCard from "../components/forgotpassword/AskforEmailCard";
import CompactFooter from "../components/CompactFooter";

export default function AskforEmail() {
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
          <Box>
            <Paper
              elevation={20}
              sx={{
                borderRadius: "30px",
                overflow: "hidden",
              }}
            >
              <Stack direction={"row"}>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    borderRadius: "30px 0 0 30px",
                    overflow: "hidden",
                    height: "30rem",
                  }}
                >
                  <img
                    src={ForgotPassword}
                    width={"400rem"}
                    height={"100%"}
                    style={{ borderRadius: "0 30px 30px 0" }}
                    alt="Forgot Password"
                  />
                </Box>

                <Box sx={{ height: "30rem" }}>
                  <AskforEmailCard />
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Container>

        {/* Footer */}
        <Box component="footer" sx={{ mt: "auto" }}>
          <CompactFooter />
        </Box>
      </Box>
    </>
  );
}