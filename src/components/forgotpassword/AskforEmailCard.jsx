import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

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

export default function AskforEmailCard() {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [firstboxvisibility, setFirstBoxVisibility] = React.useState(true);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateInput(newEmail);
  };

  const handlegoBackClick = () => {
    navigate("/signin"); // تغییر مسیر به صفحه ورود
  };

  const handlesubmit = (event) => {
    event.preventDefault(); // جلوگیری از ارسال فرم
    if (!validateInput(email)) return; // اعتبارسنجی ایمیل
    setFirstBoxVisibility(false); // تغییر state برای نمایش جعبه دوم


   // send email

  };

  const handleresend = (event) => {
    setFirstBoxVisibility(false); // تغییر state برای نمایش جعبه دوم

    //resend email
  };

  const handlereturntoemail = (event) => {
    setFirstBoxVisibility(true); // تغییر state برای نمایش جعبه اول
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
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: { md: "0 30px 30px 0", xs: "30px 30px 30px 30px" },
      }}
    >
      <Box component={"form"} onSubmit={handlesubmit}>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            marginBottom: "1rem",
          }}
        >
          فراموشی رمز عبور
        </Typography>
        <Divider sx={{ color: "primary" }} />

        {/* جعبه اول */}
        <Box sx={{ display: firstboxvisibility ? "block" : "none" }}>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography>
              لطفا ایمیل خود را وارد کنید تا لینکی برای بازیابی رمزعبور برای شما
              ارسال شود.
            </Typography>
          </Box>
          <FormControl>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              autoFocus
              required
              variant="outlined"
              color={emailError ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon sx={{ marginRight: "-1rem" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: "20rem",
                position: "relative",
                marginTop: "2rem",
                direction: "ltr",
                textAlign: "left",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  direction: "ltr",
                  textAlign: "left",
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
                  direction: "ltr",
                  textAlign: "left",
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

          <Box
            sx={{
              position: "relative",
              top: "3rem",
              marginBottom: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack direction={"column"} spacing={2} sx={{ alignItems: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "15rem",
                  backgroundColor: "#00A359",
                  color: "#ffffff",
                  fontSize: "0.9rem",
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
                ادامه
              </Button>
              <Button
                variant="outlined"
                onClick={handlegoBackClick}
                sx={{
                  width: "15rem",
                  borderColor: "#00A359",
                  color: "#00A359",
                  fontSize: "0.9rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#008A4F",
                    color: "#008A4F",
                    backgroundColor: "rgba(0, 163, 89, 0.1)",
                  },
                }}
              >
                بازگشت به صفحه ورود
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* جعبه دوم */}
        <Box sx={{ display: firstboxvisibility ? "none" : "block" }}>
        <Box sx={{position:'fixed',justifyContent:"center",alignItems:"center"}}>
        <Typography sx={{justifyContent:'center',marginRight:'1.5rem'}}>
            ایمیلی حاوی لینک تغییر رمز عبور برای شما فرستاده شد.
          </Typography>
          <Typography  sx={{justifyContent:'center',marginRight:'1.5rem'}}>
          لطفا ایمیل خود را چک کنید
          </Typography>
        </Box>
          <Box
            sx={{
              position: "relative",
              top: "8.5rem",
              marginBottom: "10.53rem",
              marginTop: "3.4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack direction={"column"} spacing={2} sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={handleresend}
                sx={{
                  width: "15rem",
                  backgroundColor: "#00A359",
                  color: "#ffffff",
                  fontSize: "0.9rem",
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
                فرستادن دوباره
              </Button>
              <Button
                variant="outlined"
                onClick={handlereturntoemail}
                sx={{
                  width: "15rem",
                  borderColor: "#00A359",
                  color: "#00A359",
                  fontSize: "0.9rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#008A4F",
                    color: "#008A4F",
                    backgroundColor: "rgba(0, 163, 89, 0.1)",
                  },
                }}
              >
                تغییر آدرس ایمیل
              </Button>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ color: "primary" }} />
        <Box sx={{ marginTop: "0.3rem", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00A359, #007744)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
             جیمباتو
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}