import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "../components/signin/SignInCard";
import SignIn_img from "../components/signin/SignIn_img";
import { Box, Container, Paper } from "@mui/material";
import NavBar from "../components/home/NavbarCard";
// import Container from '@mui/material/Container';
import CFooter from "../components/CompactFooter";
import Footer from "../components/Footer"
import { AuthContext } from "../contexts/AuthContext";

export default function Sign_in(props) {

    const { userInfo, logout } = useContext(AuthContext);
  
    if(userInfo){
      window.location.href = "/";

    }
else
  return (
    <>
      {/* <NavBar /> */}
      <CssBaseline enableColorScheme />
     

        <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
          mt:5
        }}
      >
        <Paper
          elevation={24} // مقدار سایه (0 تا 24)
          sx={{
            // p: 3, // padding داخلی
            borderRadius: "30px", // گوشه‌های گرد
            // width: '100%',
            maxWidth: "lg", // یا اندازه دلخواه
            backdropFilter: "blur(8px)", // افکت بلور پس‌زمینه (اختیاری)
            backgroundColor: "rgba(255, 255, 255, 0.8)", // پس‌زمینه نیمه شفاف
          }}
        >
        
          <Stack
            direction="column"
            component="main"
            sx={[
              {
                justifyContent: "center",
                height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
                // marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
                minHeight: "100%",
              },
            ]}
          >
            <Stack
              direction={{ xs: "column-reverse", md: "row" }}
              sx={{
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Stack
                direction={{ xs: "column-reverse", md: "row" }}
                sx={{
                  justifyContent: "center",
                  m: "auto",
                }}
              >
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <SignIn_img />
                </Box>

                <SignInCard />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
      {/* <Footer/> */}
    </>
  );
}
