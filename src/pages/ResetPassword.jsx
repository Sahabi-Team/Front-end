import { Box, Container, Paper, Stack } from "@mui/material";
import React from "react";
import ForgotPassword from "../assets/imgs/forgotpassword4.png";
import SignIn from "../components/signin/SignInCard";
import CssBaseline from "@mui/material/CssBaseline";
import AskforEmailCard from "../components/forgotpassword/AskforEmailCard";
import ResetPasswordCard from "../components/forgotpassword/ResetPasswordCard"

function ResetPassword() {

    const [passwordError, setPasswordError] = React.useState(false);
      const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
      const [confirmpasswordError, setConfirmpasswordError] = React.useState(false);
      const [confirmpasswordErrorMessage, setConfirmpasswordErrorMessage] =
        React.useState("");


  return (
    <>
    <CssBaseline enableColorScheme></CssBaseline>
    <Container>
      <Box justifyContent={"center"}>
        <Paper elevation={20} sx={{ borderRadius: "30px" , overflow: "hidden"  }}  >
            <ResetPasswordCard/>
        </Paper>
        </Box>
        </Container>
        </>
  )
}

export default ResetPassword
