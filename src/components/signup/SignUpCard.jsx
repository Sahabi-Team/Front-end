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
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../CustomIcons";
import { BorderAll } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorModal from "../modals/ErrorModal";
import SuccessfulModal from "../modals/SuccessfulModal";
import axios from "axios";

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

export default function SignUpCard() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmpasswordError, setConfirmpasswordError] = React.useState(false);
  const [confirmpasswordErrorMessage, setConfirmpasswordErrorMessage] =
    React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [successmessage, setSuccessMessage] = React.useState("");
  const [opensuccessfulmodal, setOpenSuccessfulModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");


  const navigate = useNavigate();

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };
  const handleCloseSuccessfulModal = () => {
    setOpenSuccessfulModal(false); // بستن مودال
  };

  const handlechangeusername = (event) => {
    setUsername(event.target.value);
    validateusername(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlechangepassword = (event) => {
    setPassword(event.target.value);
    validatepassword(event.target.value);
  };

  const handlechangeconfirmpassword = (event) => {
    setConfirmPassword(event.target.value);
    validateconfirmpassword(event.target.value, password);
  };

  const handlechangeemail = (event) => {
    setEmail(event.target.value);
    validateemail(event.target.value);
  };

  const validateusername = (input) => {
    if (input && input != "") {
      // if (!/\S+@\S+\.\S+/.test(input)) {
      //   setUsernameError(true);
      //   setUsernameErrorMessage("نام کاربری نامعتبر است");
      //   return false;
      // } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
      return true;
      // }
    } else {
      setUsernameError(true);
      setUsernameErrorMessage("این فیلد ضروری است.");
      return true;
    }
  };

  const validatepassword = (input) => {
    if (input && input != "") {
      if (input.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage("رمزعبور نامعتبر است");
        return false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
        return true;
      }
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("این فیلد ضروری است.");
      return true;
    }
  };

  const validateconfirmpassword = (input, pass) => {
    if (input && input != "") {
      if (input != pass) {
        setConfirmpasswordError(true);
        setConfirmpasswordErrorMessage(
          "با رمزعبور که وارد کردید همخوانی ندارد."
        );
        return false;
      } else {
        setConfirmpasswordError(false);
        setConfirmpasswordErrorMessage("");
        return true;
      }
    } else {
      setConfirmpasswordError(true);
      setConfirmpasswordErrorMessage("این فیلد ضروری است.");
      return true;
    }
  };

  const validateemail = (input) => {
    if (input && input != "") {
      if (!/\S+@\S+\.\S+/.test(input)) {
        setEmailError(true);
        setEmailErrorMessage("ایمیل نامعتبر است");
        return false;
      } else {
        setEmailError(false);
        setEmailErrorMessage("");
        return true;
      }
    } else {
      setEmailError(true);
      setEmailErrorMessage("این فیلد ضروری است.");
      return true;
    }
  };

  const handlesigninclick = () => {
    navigate("/signin"); // تغییر مسیر به /askforemail
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post(
        "https://ighader.pythonanywhere.com/api/auth/register/", // آدرس API ثبت‌نام
        
          {
            "username": username,
            "email": email,
            "password": password,
            "phone_number": " ",
            "role": "trainee"
        }
        ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("تبریک\nشما با موفقیت ثبت نام شدید.");
        setOpenSuccessfulModal(true);
        // console.log("User registered successfully:", response.data.user);
      }
    } catch (error) {
      if (error.response) {
        // اگر سرور پاسخ دهد اما خطایی وجود داشته باشد
        setErrorMessage("ثبت نام ناموفق بود\nدوباره امتحان کنید.");
        setOpenErrorModal(true);
        // setError(error.response.data.errors || "Registration failed");
        // setSuccessMessage(null);
      } else {
        // اگر مشکلی در ارتباط با سرور وجود داشته باشد
        setErrorMessage("خطای سرور\n دوباره تلاش کنید");
        setOpenErrorModal(true);
        // setError("An error occurred while registering. Please try again.");
        // setSuccessMessage(null);
      }
    }
  };

  const validateInputs = () => {
    if (
      validateusername(username) &&
      validatepassword(password) &&
      validateconfirmpassword(confirmpassword, password) &&
      validateemail(email)
    )
      return true;
    return false;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "40.7rem",
        borderRadius: { md: "30px 0 0 30px", xs: "30px 30px 30px 30px" },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          marginBottom: "1rem",
        }}
      >
        ثبت نام در سایت
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            required
            fullWidth
            variant="outlined"
            value={username}
            onChange={handlechangeusername}
            color={emailError ? "error" : "primary"}
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
              height: "3rem",
              position: "relative",
              maxHeight: "3.5rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
                "& fieldset": {
                  borderColor: usernameError ? "error.main" : "divider",
                },
                "&:hover fieldset": {
                  borderColor: usernameError ? "error.main" : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: usernameError ? "error.main" : "primary.main",
                  boxShadow: usernameError
                    ? "0 0 0 3px rgba(244, 67, 54, 0.2)"
                    : "0 0 0 3px rgba(0, 163, 89, 0.2)",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "1rem",
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.875rem",
                color: usernameError ? "error.main" : "text.secondary",
                textAlign: "right", // متن خطا در سمت راست باشد
              },
            }}
          />
        </FormControl>

        <FormControl>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            name="email"
            placeholder="ایمیل"
            type="email"
            id="email"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={handlechangeemail}
            color={emailError ? "error" : "primary"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              height: "3rem",
              maxHeight: "3.5rem",
              position: "relative",
              marginTop: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
                "& fieldset": {
                  borderColor: emailError ? "error.main" : "divider",
                },
                "&:hover fieldset": {
                  borderColor: emailError ? "error.main" : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: emailError ? "error.main" : "primary.main",
                  boxShadow: emailError
                    ? "0 0 0 3px rgba(244, 67, 54, 0.2)"
                    : "0 0 0 3px rgba(0, 163, 89, 0.2)",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "1rem",
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.875rem",
                color: emailError ? "error.main" : "text.secondary",
                textAlign: "right", // متن خطا در سمت راست باشد
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
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            value={password}
            onChange={handlechangepassword}
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
              height: "3rem",
              maxHeight: "3.5rem",
              position: "relative",
              marginTop: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
                "& fieldset": {
                  borderColor: passwordError ? "error.main" : "divider",
                },
                "&:hover fieldset": {
                  borderColor: passwordError ? "error.main" : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: passwordError ? "error.main" : "primary.main",
                  boxShadow: passwordError
                    ? "0 0 0 3px rgba(244, 67, 54, 0.2)"
                    : "0 0 0 3px rgba(0, 163, 89, 0.2)",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "1rem",
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.875rem",
                color: passwordError ? "error.main" : "text.secondary",
                textAlign: "right", // متن خطا در سمت راست باشد
              },
            }}
          />
        </FormControl>

        <FormControl>
          <TextField
            error={confirmpasswordError}
            helperText={confirmpasswordErrorMessage}
            name="confirmpassword"
            placeholder="تکرار رمز عبور"
            type="password"
            id="confirmpassword"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={confirmpasswordError ? "error" : "primary"}
            value={confirmpassword}
            onChange={handlechangeconfirmpassword}
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
              height: "3rem",
              maxHeight: "3.5rem",
              position: "relative",
              marginTop: "1rem",
              "& .MuiOutlined Input-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
                "& fieldset": {
                  borderColor: confirmpasswordError ? "error.main" : "divider",
                },
                "&:hover fieldset": {
                  borderColor: confirmpasswordError
                    ? "error.main"
                    : "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: confirmpasswordError
                    ? "error.main"
                    : "primary.main",
                  boxShadow: confirmpasswordError
                    ? "0 0 0 3px rgba(244, 67, 54, 0.2)"
                    : "0 0 0 3px rgba(0, 163, 89, 0.2)",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "1rem",
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.875rem",
                color: confirmpasswordError ? "error.main" : "text.secondary",
                textAlign: "right", // متن خطا در سمت راست باشد
              },
            }}
          />
        </FormControl>

        <Box display="flex" justifyContent="center" width="100%">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "50%",
              alignItems: "center",
              marginTop: "1.5rem",
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
            ثبت نام
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", marginTop: "0.5rem" }}>
          حساب کاربری دارید ؟{"        "}
          <span>
            <Link
              component="button"
              variant="body2"
              onClick={handlesigninclick}
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
              ورود
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
      <Divider sx={{ color: "primary", marginTop: "-0.5rem" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign up with Google")}
          startIcon={<GoogleIcon />}
          sx={{
            marginTop: "0.5rem",
            "& .MuiButton-startIcon": {
              marginLeft: "0.3rem",
            },
          }}
        >
          ثبت نام با حساب گوگل
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
  );
}
