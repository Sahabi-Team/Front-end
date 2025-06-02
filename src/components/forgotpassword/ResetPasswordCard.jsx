import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../modals/ForgotPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../CustomIcons";
import { BorderAll } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import { Paper, Stack } from "@mui/material";
import axios from "axios";
import ErrorModal from "../modals/ErrorModal";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import SuccessfulModal from "../modals/SuccessfulModal";
import SuccessModal from "../modals/SuccessfulModal";
import config from "../../config";
import LoginIcon from "@mui/icons-material/Login";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function ResetPasswordCard(token) {
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmpasswordError, setConfirmpasswordError] = React.useState(false);
  const [confirmpasswordErrorMessage, setConfirmpasswordErrorMessage] =
    React.useState("");
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };
  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

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

    // اعتبارسنجی
    if (
      !validatePassword(password) ||
      !validateConfirmPassword(password, confirmpassword) ||
      !token
    )
      return;

    console.log(token);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/auth/reset-password/${token.token}/`,
        { new_password: password, confirm_password: confirmpassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("رمز عبور با موفقیت تغییر یافت.");
      setOpenSuccessModal(true);

      setTimeout(() => {
        navigate("/signin");
      }, 1300); // 2 ثانیه برای دیدن مدال
    } catch (error) {
      console.error(error);
      let msg = "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";

      if (error.response?.status === 400) {
        // بررسی وجود جزئیات خطا در پاسخ
        msg =
          "توکن منقضی شده است یا معتبر نیست. لطفاً مجدداً درخواست بازیابی رمز عبور ارسال کنید.";
      }

      setErrorMessage(msg);
      setOpenErrorModal(true);
    }
  };

  const validatePassword = (pass) => {
    if (pass && pass != "") {
      if (pass.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage("پسورد نباید کمتر از 6 کاراکتر باشد.");
        return false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
        return true;
      }
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("این فیلد ضروری است.");
      return false;
    }
  };

  const validateConfirmPassword = (pass, conpass) => {
    if (conpass && conpass != "") {
      if (conpass != pass) {
        setConfirmpasswordError(true);
        setConfirmpasswordErrorMessage("با پسورد جدید هم خوانی ندارد.");
        return false;
      } else {
        setConfirmpasswordError(false);
        setConfirmpasswordErrorMessage("");
        return true;
      }
    } else {
      setConfirmpasswordError(true);
      setConfirmpasswordErrorMessage("این فیلد ضروری است.");
      return false;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "30.7rem",
        borderRadius: "30px",
        // backgroundColor:"green",
      }}
    >
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <Stack direction={"row"} gap={23}>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography sx={{ fontSize: "150%" }}> تغییر رمز عبور :</Typography>
          </Box>
          <Box sx={{ alignSelf: "flex-end" }}>
            <IconButton
              onClick={() => navigate("/signin")}
              sx={{
                // marginBottom: 1,
                backgroundColor: "#f5f5f5",
                color: "#00A359",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  color: "#008A4F",
                },
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                marginLeft: "0.5rem",
              }}
            >
              <LoginIcon />
            </IconButton>
          </Box>
        </Stack>

        <FormControl sx={{ marginTop: "2.5rem" }}>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder=" رمز عبور جدید"
            type="text"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              marginTop: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px", // گوشه‌های گرد
                backgroundColor: "background.paper", // رنگ پس‌زمینه
                "& fieldset": {
                  borderColor: passwordError ? "error.main" : "divider", // رنگ border پیش‌فرض
                },
                "&:hover fieldset": {
                  borderColor: passwordError ? "error.main" : "primary.main", // رنگ border هنگام hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: passwordError ? "error.main" : "primary.main", // رنگ border هنگام focus
                  boxShadow: passwordError
                    ? "0 0 0 3px rgba(244, 67, 54, 0.2)" // سایه قرمز هنگام error
                    : "0 0 0 3px rgba(0, 163, 89, 0.2)", // سایه سبز هنگام focus
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px", // padding داخلی
                fontSize: "1rem", // اندازه فونت
                color: "text.primary", // رنگ متن
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary", // رنگ placeholder
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.875rem", // اندازه فونت متن راهنما
                color: passwordError ? "error.main" : "text.secondary", // رنگ متن راهنما
                position: "absolute", // قرار دادن helperText در موقعیت مطلق
                bottom: "-25px", // تنظیم موقعیت عمودی
              },
            }}
          />
        </FormControl>

        <FormControl sx={{ marginTop: "2rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              error={confirmpasswordError}
              helperText={confirmpasswordErrorMessage}
              name="confirmpassword"
              placeholder="تکرار رمزعبور جدید"
              type="text"
              id="confirmpassword"
              autoComplete="current-password"
              required
              fullWidth
              value={confirmpassword}
              onChange={handleConfirmPasswordChange}
              variant="outlined"
              color={confirmpasswordError ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                marginTop: "1rem",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px", // گوشه‌های گرد
                  backgroundColor: "background.paper", // رنگ پس‌زمینه
                  "& fieldset": {
                    borderColor: confirmpasswordError
                      ? "error.main"
                      : "divider", // رنگ border پیش‌فرض
                  },
                  "&:hover fieldset": {
                    borderColor: confirmpasswordError
                      ? "error.main"
                      : "primary.main", // رنگ border هنگام hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: confirmpasswordError
                      ? "error.main"
                      : "primary.main", // رنگ border هنگام focus
                    boxShadow: confirmpasswordError
                      ? "0 0 0 3px rgba(244, 67, 54, 0.2)" // سایه قرمز هنگام error
                      : "0 0 0 3px rgba(0, 163, 89, 0.2)", // سایه سبز هنگام focus
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px", // padding داخلی
                  fontSize: "1rem", // اندازه فونت
                  color: "text.primary", // رنگ متن
                },
                "& .MuiInputLabel-root": {
                  color: "text.secondary", // رنگ placeholder
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.875rem", // اندازه فونت متن راهنما
                  color: confirmpasswordError ? "error.main" : "text.secondary", // رنگ متن راهنما
                  position: "absolute", // قرار دادن helperText در موقعیت مطلق
                  bottom: "-25px", // تنظیم موقعیت عمودی
                },
              }}
            />
          </Box>
        </FormControl>

        <FormControl sx={{ marginTop: "0.75rem", marginBottom: "2rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSavePassword}
              sx={{
                alignContent: "center",
                justifyContent: "center",
                marginTop: "3rem",
                width: "50%",
                alignItems: "center",
                backgroundColor: "#00A359",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 163, 89, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#008A4F",
                  boxShadow: "0 6px 8px rgba(0, 163, 89, 0.3)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  backgroundColor: "#007744",
                  boxShadow: "0 3px 5px rgba(0, 163, 89, 0.2)",
                  transform: "translateY(0)",
                },
              }}
            >
              ذخیره
            </Button>
          </Box>
        </FormControl>
      </Box>

      <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <SuccessModal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        successMessage={successMessage}
      />
      <SuccessfulModal />
    </Card>
  );
}
