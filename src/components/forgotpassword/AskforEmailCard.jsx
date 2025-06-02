import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import config from "../../config";
import ErrorModal from "../modals/ErrorModal";
import SuccessfulModal from "../modals/SuccessfulModal";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

const toPersianDigits = (num) => {
  return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

export default function AskforEmailCard() {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [firstboxvisibility, setFirstBoxVisibility] = React.useState(true);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successmessage, setSuccessMessage] = React.useState("");
  const [opensuccessfulmodal, setOpenSuccessfulModal] = React.useState(false);

  const [resendCount, setResendCount] = React.useState(0);
  const [cooldown, setCooldown] = React.useState(0);
  const timerRef = React.useRef(null);

  const navigate = useNavigate();

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };
  const handleCloseSuccessfulModal = () => {
    setOpenSuccessfulModal(false);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateInput(newEmail);
  };

  const handlegoBackClick = () => {
    navigate("/signin");
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!validateInput(email)) return;

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/auth/request-reset-password/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFirstBoxVisibility(false);
    } catch (error) {
      setErrorMessage(
        error.response
          ? "کاربری با این ایمیل یافت نشد"
          : "خطای سرور ، لطفا دوباره تلاش کنید"
      );
      setOpenErrorModal(true);
    }
  };

  const handleresend = async () => {
    if (resendCount > 0 && cooldown > 0) return;

    try {
      await axios.post(
        `${config.API_BASE_URL}/api/auth/request-reset-password/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResendCount((prev) => prev + 1);
      setCooldown(60);
    } catch (error) {
      setErrorMessage("ارسال دوباره با مشکل مواجه شد");
      setOpenErrorModal(true);
    }
  };

  React.useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  const handlereturntoemail = () => {
    setFirstBoxVisibility(true);
  };

  const validateInput = (input) => {
    if (input && input !== "") {
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
      setEmailErrorMessage("این فیلد نمیتواند خالی باشد");
      return false;
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          borderRadius: { md: "0 30px 30px 0", xs: "30px" },
        }}
      >
        <Box component={"form"} onSubmit={handlesubmit}>
          <Typography
            variant="h4"
            sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)", mb: 2 }}
          >
            فراموشی رمز عبور
          </Typography>
          <Divider />

          {/* جعبه اول */}
          {firstboxvisibility && (
            <>
              <Box mt={2}>
                <Typography>
                  لطفا ایمیل خود را وارد کنید تا لینکی برای بازیابی رمزعبور برای
                  شما ارسال شود.
                </Typography>
              </Box>
              <FormControl>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoFocus
                  required
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon sx={{ marginLeft: "-0.7rem" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "20rem",
                    position: "relative",
                    marginTop: "2rem",
                    direction: "rtl", // کل فیلد راست‌به‌چپ
                    textAlign: "right",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "background.paper",
                      direction: "rtl",
                      textAlign: "right",
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
                      direction: "rtl", // متن داخل input راست‌چین
                      textAlign: "right",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.875rem",
                      color: emailError ? "error.main" : "text.secondary",
                      position: "absolute",
                      bottom: "-25px",
                      right: 0,
                      textAlign: "right",
                    },
                  }}
                />
              </FormControl>

              <Box mt={5} mb={5} display="flex" justifyContent="center">
                <Stack direction="column" spacing={2} alignItems="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "15rem", backgroundColor: "#00A359" }}
                  >
                    ادامه
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handlegoBackClick}
                    sx={{ width: "15rem", borderColor: "#00A359" }}
                  >
                    بازگشت به صفحه ورود
                  </Button>
                </Stack>
              </Box>
            </>
          )}

          {/* جعبه دوم */}
          {!firstboxvisibility && (
            <>
              <Box textAlign="center" mt={5}>
                <Typography>
                  ایمیلی حاوی لینک تغییر رمز عبور برای شما فرستاده شد.
                </Typography>
                <Typography>لطفا ایمیل خود را چک کنید</Typography>
              </Box>
              <Box
                mt={15}
                mb={7}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack direction="column" spacing={2} alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      onClick={handleresend}
                      disabled={cooldown > 0}
                      sx={{
                        width: cooldown > 0 ? "12rem" : "15rem",
                        transition: "width 0.3s ease",
                        backgroundColor: "#00A359",
                        "&:disabled": {
                          backgroundColor: "#ccc",
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      ارسال دوباره
                    </Button>

                    {cooldown > 0 && (
                      <Box width={48} height={48}>
                        <CircularProgressbar
                          value={(60 - cooldown) * (100 / 60)}
                          text={toPersianDigits(cooldown)}
                          styles={buildStyles({
                            textSize: "30px",
                            pathColor: "#00A359",
                            textColor: "#007744",
                          })}
                        />
                      </Box>
                    )}
                  </Stack>

                  <Button
                    variant="outlined"
                    onClick={handlereturntoemail}
                    sx={{ width: "15rem" }}
                  >
                    تغییر آدرس ایمیل
                  </Button>
                </Stack>
              </Box>
            </>
          )}

          {/* <Divider />
          <Box mt={1} textAlign="center">
            <Typography
              variant="h4"
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #00A359, #007744)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              جیمباتو
            </Typography>
          </Box> */}
        </Box>
      </Card>

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
    </>
  );
}
