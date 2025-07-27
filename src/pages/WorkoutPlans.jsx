import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Fade,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ClientSidebar from "../components/ClientSidebar.jsx";
import Vazneh from "../assets/imgs/home/vazneh.png";
import Footer from "../components/Footer.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config.js";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import noWorkoutPlan from "../assets/imgs/NoWorkoutPlan.png";
import MainLayout from "../components/MainLayout.jsx";

const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

const statusColor = (status) => {
  switch (status) {
    case "در حال انجام":
      return "success";
    case "تمام شده":
      return "default";
    default:
      return "primary";
  }
};

function toPersianDate(dateStr) {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "persian",
  });
  return formatter.format(date);
}

export default function WorkoutPlans() {
  const { userInfo } = useContext(AuthContext);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);

  const navigate = useNavigate();
  //  console.log(userInfo);
  const handleShowWorkoutPlanClick = (workoutId) => {
    navigate(`/workoutDetails/${workoutId}`);
  };

  useEffect(() => {
    const fetchWorkoutPlans = async (access) => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/workout/workout-plans/`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error("خطا در گرفتن workout plans:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setLoadingVisible(false), 800); // برای انیمیشن Fade
      }
    };

    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      fetchWorkoutPlans(access_token);
    } else {
      setLoading(false);
      setTimeout(() => setLoadingVisible(false), 800);
    }
  }, [userInfo]);

  if (userInfo!=null&& userInfo.usertype == "trainee") {
    if (loading) {
      return (
        <Fade in={loadingVisible} timeout={800}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <CircularProgress size={70} thickness={4.5} color="primary" />
            <Typography
              variant="h6"
              mt={4}
              fontWeight="600"
              color="text.primary"
            >
              در حال بارگذاری برنامه ورزشی شما...
            </Typography>
          </Box>
        </Fade>
      );
    }

    return (
      <MainLayout>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            borderRadius: 4,
            maxWidth: 1300,
            height: "80vh",
            maxHeight: "80vh",
            mx: "auto",
            mt: 0,
            overflowY: "auto",
          }}
        >
          {workoutPlans && workoutPlans.length > 0 ? (
            <>
              <Stack spacing={3}>
                {workoutPlans.map((program, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "#f9f9f9",
                      borderRadius: 2,
                      boxShadow: 1,
                      gap: 1,
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            xs: "1rem",
                            sm: "1.2rem",
                            md: "1.3rem",
                            lg: "1.5rem",
                          },
                        }}
                      >
                        {program.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.8rem",
                            md: "0.9rem",
                            lg: "1rem",
                          },
                        }}
                      >
                        (شروع از {toPersianDate(program.created_at)})
                      </Typography>
                    </Box>
                    <Chip
                      label={program.status}
                      color={statusColor(program.status)}
                      variant="filled"
                      sx={{
                        fontSize: {
                          xs: "0.5rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        borderRadius: 2,
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        },
                      }}
                      onClick={() => handleShowWorkoutPlanClick(program.id)}
                    >
                      مشاهده برنامه
                    </Button>
                  </Box>
                ))}
              </Stack>
            </>
          ) : (
            <Box
              sx={{
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                // bgcolor: "#f5f5f5",
                // borderRadius: 2,
                // boxShadow: 1,
                textAlign: "center",
                // p: 4,
                // mt: 5,
                marginTop: 33,
              }}
            >
              <img
                src={noWorkoutPlan} // اگه تصویر خاصی نداری می‌تونم برات یک SVG ساده تولید کنم
                alt="No program"
                style={{
                  width: "200px",
                  marginBottom: "5px",
                  opacity: 0.9,
                }}
              />
              <Typography variant="h6" color="text.secondary" fontWeight="bold">
                برنامه‌ای برای شما تعریف نشده است
              </Typography>
            </Box>
          )}
        </Paper>
      </MainLayout>
    );
  } else {
    navigate("/404");
  }
}
