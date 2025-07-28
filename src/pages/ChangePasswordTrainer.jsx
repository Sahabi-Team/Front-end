import React, { useEffect ,useContext} from "react";  
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
import { trainerProfileAPI } from '../services/TrainerProfileApi.jsx';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.jsx';
import MainLayout from "../components/MainLayout";

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
      await trainerProfileAPI.changePassword({
        new_password: password,
        confirm_password: confirmpassword,
      });

      setSuccessMessage("رمز عبور با موفقیت تغییر یافت.");
      setOpenSuccessModal(true);
      //setPassword("");
      //setConfirmPassword("");
      setTimeout(() => {
        navigate('/trainereditprofile');
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
                if (!userInfo) {
                  navigate('/signin');
                }
                if (userInfo.usertype !=="trainer")
                {
                navigate ('/404');
                }
              }, [userInfo, navigate]);
  
            

  return (
    
    <MainLayout>
      <Container maxWidth="sm" sx={{ my: 6,
       display: "flex",
      justifyContent: { xs: "center", md: "flex-start" }, }}>
        <Card elevation={0}>
          <Typography sx={{ fontSize: "200%", textAlign: "center", mb: 3 }}>
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
          navigate('/trainereditprofile'); 
        }}
        successMessage={successMessage}
      />
  
     
     </MainLayout>
    
  );
}

export default ResetPassword;
