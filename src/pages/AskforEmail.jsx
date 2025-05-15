import { Box, Container, Paper, Stack } from "@mui/material";
import React from "react";
import ForgotPassword from "../assets/imgs/main_forgotpassword.png";
import SignIn from "../components/signin/SignInCard";
import CssBaseline from "@mui/material/CssBaseline";
import AskforEmailCard from "../components/forgotpassword/AskforEmailCard";
import Footer from "../components/Footer";


export default function AskforEmail() {
  return (
    <>
      <CssBaseline enableColorScheme></CssBaseline>
      <Container sx={{ display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          mb:10}}>
        <Box justifyContent={"center"}>
          <Paper elevation={20} sx={{ borderRadius: "30px" , overflow: "hidden"  }}  >
            <Stack direction={"row"}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  borderRadius: "30px 0 0 30px",
                  overflow: "hidden",
                  height : "30rem",
                }}
              >
                <img
                  src={ForgotPassword}
                  width={"400rem"}
                  height={"100%"}
                  style={{ borderRadius: "0 30px 30px 0" }}
                />
              </Box>

              <Box sx={{height : "30rem"}}>
                <AskforEmailCard  />
              </Box>
            </Stack>
          </Paper>
        </Box>
       
      </Container>
       <Footer/>
    </>
  );
}
