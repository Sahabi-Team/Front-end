import { Box, Container, Paper, Stack } from "@mui/material";
import React from "react";
import ForgotPassword from "../assets/imgs/forgotpassword4.png";
import SignIn from "../components/signin/SignInCard";
import CssBaseline from "@mui/material/CssBaseline";
import AskforEmailCard from "../components/forgotpassword/AskforEmailCard";
import ResetPasswordCard from "../components/forgotpassword/ResetPasswordCard"
import { useParams } from "react-router-dom";

function ResetPassword() {

    const [passwordError, setPasswordError] = React.useState(false);
      const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
      const [confirmpasswordError, setConfirmpasswordError] = React.useState(false);
      const [confirmpasswordErrorMessage, setConfirmpasswordErrorMessage] =
        React.useState("");
       const { token } = useParams();


  return (
    <>
    <CssBaseline enableColorScheme></CssBaseline>
    <Container>

      <Box
      sx={{
        display: "flex",
        justifyContent: "center",  // وسط افقی
        alignItems: "center",      // وسط عمودی
        minHeight: "100vh",        // کل ارتفاع صفحه
        // backgroundColor: "#f2f2f2", // رنگ پس‌زمینه اختیاری
      }}
    >
      <ResetPasswordCard token={{ token: "123" }} />
    </Box>

      {/* <Box justifyContent={"center"} bgcolor={"red"}> */}
        {/* <Paper elevation={20} sx={{ borderRadius: "30px" , overflow: "hidden"  }}  > */}
            {/* <ResetPasswordCard token={token}/> */}
        {/* </Paper> */}
        {/* </Box> */}
        </Container>
        </>
  )
}

export default ResetPassword
