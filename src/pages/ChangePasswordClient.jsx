import React, { useEffect,useContext } from "react";  
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessfulModal";
//import Footer from '../components/Footer.jsx';
import { profileAPI } from '../services/ClientProfileApi.jsx';
//import NavBar from "../components/home/NavbarCard";
import { useNavigate } from "react-router-dom";
import ClientSidebar from "../components/ClientSidebar.jsx";
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext.jsx';


const Card = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: "30px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

function ResetPassword() {
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmpasswordError, setConfirmpasswordError] = React.useState(false);
  const [confirmpasswordErrorMessage, setConfirmpasswordErrorMessage] = React.useState("");
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();


  
   useEffect(() => {
              if (!userInfo) {
                navigate('/signin');
              }
              if (userInfo.usertype !=="trainee")
              {
              navigate ('/404');
              }
            }, [userInfo, navigate]);
            

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    validateConfirmPassword(password, event.target.value);
  };

  const handleSavePassword = async (event) => {
    event.preventDefault();

    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(password, confirmpassword);
    if (!isPasswordValid || !isConfirmValid) return;

    try {
      await profileAPI.changePassword({
        new_password: password,
        confirm_password: confirmpassword,
      });

      setSuccessMessage("رمز عبور با موفقیت تغییر یافت.");
      setOpenSuccessModal(true);
      //setPassword("");
      //setConfirmPassword("");
      setTimeout(() => {
        navigate('/editprofile');
      }, 3000);
    } catch (error) {
      

      let errorMsg = "خطایی در تغییر رمز عبور رخ داد.";
      const errorData = error.response?.data;

      if (typeof errorData === "string") {
        errorMsg = errorData;
      } else if (errorData?.detail) {
        errorMsg = errorData.detail;
      } else if (typeof errorData === "object" && errorData !== null) {
        const firstKey = Object.keys(errorData)[0];
        const firstError = errorData[firstKey]?.[0] || errorData[firstKey];
        errorMsg = `${firstKey}: ${firstError}`;
      }

      setErrorMessage(errorMsg);
      setOpenErrorModal(true);
    }
  };

  const validatePassword = (pass) => {
    if (!pass) {
      setPasswordError(true);
      setPasswordErrorMessage("این فیلد ضروری است.");
      return false;
    }
    if (pass.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("رمز عبور نباید کمتر از ۸ کاراکتر باشد.");
      return false;
    }
    setPasswordError(false);
    setPasswordErrorMessage("");
    return true;
  };

  const validateConfirmPassword = (pass, conpass) => {
    if (!conpass) {
      setConfirmpasswordError(true);
      setConfirmpasswordErrorMessage("این فیلد ضروری است.");
      return false;
    }
    if (conpass !== pass) {
      setConfirmpasswordError(true);
      setConfirmpasswordErrorMessage("با رمز عبور جدید مطابقت ندارد.");
      return false;
    }
    setConfirmpasswordError(false);
    setConfirmpasswordErrorMessage("");
    return true;
  };


    useEffect(() => {
        document.body.style.background = "#F5F5F5";
        return () => {
       document.body.style.background = "#F5F5F5"; // پس‌زمینه‌ی پیش‌فرض برمی‌گردد
              };
      }, []);



  return (
    <>

     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
    <ClientSidebar />
       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Header pageTitle="صفحه کاربر" />  
      <CssBaseline />
      <Container maxWidth="sm" sx={{ my: 6,
       display: "flex",
      justifyContent: { xs: "center", md: "flex-start" }, }}>
        <Card elevation={20}>
          <Typography sx={{ fontSize: "150%", textAlign: "center", mb: 3 }}>
            تغییر رمز عبور
          </Typography>

          <FormControl>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              placeholder="رمز عبور جدید"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl sx={{ mt: 2 }}>
            <TextField
              error={confirmpasswordError}
              helperText={confirmpasswordErrorMessage}
              placeholder="تکرار رمز عبور جدید"
              type="password"
              fullWidth
              value={confirmpassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSavePassword}
            sx={{
              mt: 4,
              backgroundColor: "#00A359",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#008A4F",
              },
            }}
          >
            ذخیره
          </Button>
        </Card>
      </Container>

      <ErrorModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        errorMessage={errorMessage}
      />
      <SuccessModal
        open={openSuccessModal}
        onClose={() =>{ setOpenSuccessModal(false) ;
          navigate('/editprofile'); 
        }}
        successMessage={successMessage}
      />
      </Box>
</Box>
    </>
  );
}

export default ResetPassword;
