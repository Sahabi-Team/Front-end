import React, { useContext } from "react";
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
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../CustomIcons";
import { BorderAll } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import { Paper } from "@mui/material";
import axios from "axios";
import ErrorModal from "../modals/ErrorModal";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import SuccessfulModal from "../modals/SuccessfulModal";
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from "../../contexts/AuthContext";
import config from '../../config';



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

export default function SignInCard() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [successmessage, setSuccessMessage] = React.useState("");
  const [opensuccessfulmodal, setOpenSuccessfulModal] = React.useState(false);
  const { userInfo, logout } = useContext(AuthContext);
  

  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate("/askforemail"); // تغییر مسیر به /askforemail
  };
  const handleSignupClick = () => {
    navigate("/signup"); // تغییر مسیر به /askforemail
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/auth/login/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("خوش آمدید");
      setOpenSuccessfulModal(true);

      localStorage.setItem("access_token",  response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      window.location.href = "/";
      

      // ذخیره اطلاعات ورود در localStorage اگر "مرا به خاطر بسپار" فعال باشد
      if (rememberMe) {
        localStorage.setItem("rememberMeUsername", username);
        localStorage.setItem("rememberMePassword", password);
      } else {
        localStorage.removeItem("rememberMeUsername");
        localStorage.removeItem("rememberMePassword");
      }

      // هدایت کاربر به داشبورد یا صفحه اصلی
      // window.location.href = "/dashboard";
    } catch (error) {
      setErrorMessage("نام کاربری یا رمز عبور اشتباه است.");
      setOpenErrorModal(true);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("نام کاربری یا رمز عبور اشتباه است.");
          setOpenErrorModal(true);
        } else {
          setErrorMessage(
            "خطایی در ورود به سیستم رخ داده است. لطفاً دوباره امتحان کنید."
          );
          setOpenErrorModal(true);
        }
      }
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };
  const handleCloseSuccessfulModal = () => {
    setOpenSuccessfulModal(false); // بستن مودال
  };

  const validateInputs = () => {
    let isValid = true;
    if (username) {
      // if (!/\S+@\S+\.\S+/.test(username)) {
      //   setUsernameError(true);
      //   setUsernameErrorMessage("نام کاربری نامعتبر است.");
      //   isValid = false;
      // } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
      //  }
    } else {
      setUsernameError(true);
      setUsernameErrorMessage("لطفا نام کاربری خود را وارد کنید.");
      isValid = false;
    }

    if (password) {
      if (password.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage("رمزعبور نامعتبر است.");
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
      }
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("لطفا رمزعبور خود را وارد کنید.");
      isValid = false;
    }

    return isValid;
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // به‌روزرسانی مقدار username
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // به‌روزرسانی مقدار password
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked); // به‌روزرسانی وضعیت "مرا به خاطر بسپار"
  };
  const handleHomeClick = () => {
    navigate('/'); // تغییر مسیر به صفحه اصلی
  };
  
  
  return (   
    <>
   
    <Card
      variant="outlined"
      sx={{
        height: "40.7rem",
        borderRadius: { md: "0 30px 30px 0", xs: "30px 30px 30px 30px" },
      }}
    >
      <IconButton
        onClick={handleHomeClick}
        sx={{
          position: "absolute",
          top:5,
          right:10,
          color: "primary.main",
          "&:hover": {
            backgroundColor: "rgba(0, 163, 89, 0.1)",
          },
        }}
      >
        <HomeIcon />
      </IconButton>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          marginBottom: "1rem",
        }}
      >
        ورود به حساب کاربری
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="username"
            name="username"
            placeholder="نام کاربری"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError ? "error" : "primary"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px", // گوشه‌های گرد
                backgroundColor: "background.paper", // رنگ پس‌زمینه
                "& fieldset": {
                  borderColor: usernameError ? "error.main" : "divider", // رنگ border پیش‌فرض
                },
                "&:hover fieldset": {
                  borderColor: usernameError ? "error.main" : "primary.main", // رنگ border هنگام hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: usernameError ? "error.main" : "primary.main", // رنگ border هنگام focus
                  boxShadow: usernameError
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
                color: usernameError ? "error.main" : "text.secondary", // رنگ متن راهنما
                position: "absolute", // قرار دادن helperText در موقعیت مطلق
                bottom: "-25px", // تنظیم موقعیت عمودی
              },
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="رمز عبور"
            type={showPassword ? "text" : "password"}
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
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ marginLeft: "-12px" }} // کاهش فاصله آیکون چشم از انتهای فیلد
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ padding: "8px" }} // کاهش padding آیکون
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  paddingRight: "8px", // کاهش padding سمت راست فیلد ورودی
                },
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
        <FormControlLabel
          sx={{ marginRight: "-0.6rem", marginTop: "1rem" }}
          control={
            <Checkbox
              value="remember"
              color="primary"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
          }
          label="مرا به خاطر بسپار"
        />

        <Box
          display="flex"
          justifyContent="center" // وسط‌چین کردن افقی
          width="100%" // عرض کامل
        >
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "50%", // عرض دکمه
              alignItems: "center",
              marginTop: "1rem",
              backgroundColor: "#00A359", // رنگ پس‌زمینه سبز
              color: "#ffffff", // رنگ متن سفید
              fontSize: "1rem", // اندازه فونت
              fontWeight: "600", // ضخامت فونت
              padding: "12px 24px", // padding داخلی
              borderRadius: "8px", // گوشه‌های گرد
              boxShadow: "0 4px 6px rgba(0, 163, 89, 0.2)", // سایه سبز
              transition: "all 0.3s ease", // انیمیشن نرم
              "&:hover": {
                backgroundColor: "#008A4F", // تغییر رنگ پس‌زمینه هنگام hover
                boxShadow: "0 6px 8px rgba(0, 163, 89, 0.3)", // سایه بیشتر هنگام hover
                transform: "translateY(-2px)", // حرکت کمی به بالا
              },
              "&:active": {
                backgroundColor: "#007744", // تغییر رنگ پس‌زمینه هنگام کلیک
                boxShadow: "0 3px 5px rgba(0, 163, 89, 0.2)", // سایه کمتر هنگام کلیک
                transform: "translateY(0)", // بازگشت به موقعیت اولیه
              },
            }}
          >
            ورود
          </Button>
        </Box>
        <Link
          component="button"
          type="button"
          onClick={handleForgotPasswordClick}
          variant="body2"
          sx={{
            border: "none",
            marginTop: "1rem",
            textAlign: "center",
            textDecoration: "none", // حذف خط زیر لینک
            color: "primary.main", // تغییر رنگ لینک به رنگ اصلی
            "&:hover": {
              color: "primary.light", // رنگ متن لینک هنگام hover
            },
            "&:focus": {
              outline: "none", // حذف outline پیش‌فرض
              borderColor: "primary.main", // رنگ border هنگام focus
              boxShadow: "0 0 0 3px rgba(0, 163, 89, 0.2)", // سایه سبز هنگام focus
            },
          }}
        >
          رمز عبور خود را فراموش کردید؟
        </Link>
        <Typography sx={{ textAlign: "center" }}>
          حساب کاربری ندارید ؟ {"        "}
          <span>
            <Link
              component="button"
              variant="body2"
              onClick={handleSignupClick}
              sx={{
                alignSelf: "center",
                textDecoration: "none",
                color: "primary.main", // رنگ متن لینک
                "&:hover": {
                  color: "primary.light", // رنگ متن لینک هنگام hover
                },
                "&:focus": {
                  outline: "none", // حذف outline پیش‌فرض
                  borderColor: "primary.main", // رنگ border هنگام focus
                  boxShadow: "0 0 0 3px rgba(0, 163, 89, 0.2)", // سایه سبز هنگام focus
                },
              }}
            >
              ثبت نام
            </Link>
          </span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        ></Box>
      </Box>
      <Divider sx={{ color: "primary" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
          sx={{
            marginTop: "2rem",
            "& .MuiButton-startIcon": {
              marginLeft: "0.3rem", // اطمینان از عدم وجود margin-left
            },
          }}
        >
          ورود با حساب گوگل
        </Button>
      </Box>
      <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <SuccessfulModal
        open={opensuccessfulmodal}
        onClose={handleCloseSuccessfulModal}
        successMessage={successmessage}
      />
    </Card>
    </>
  );
}
