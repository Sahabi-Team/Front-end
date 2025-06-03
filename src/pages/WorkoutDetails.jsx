import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  styled,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CssBaseline,
  Divider,
  CircularProgress,
  Fade,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClientSidebar from "../components/ClientSidebar";
import Vazneh from "../assets/imgs/home/vazneh.png";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import config from "../config.js";

const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export default function WorkoutDetails() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userInfo } = useContext(AuthContext);
  const { workoutId } = useParams();

  const [workout, setWorkout] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(false);
  let access_token = localStorage.getItem("access_token");
  const [arr, setArr] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlans = async (access) => {
      try {
        setLoadingVisible(true);
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
        navigate("/500");
      }
    };
    if (access_token) {
      fetchWorkoutPlans(access_token);
    }
  }, [userInfo]);

  useEffect(() => {
    if (workoutPlans.length > 0 && !workout) {
    const targetPlan = workoutPlans.find((plan) => plan.id === parseInt(workoutId));
    if(!targetPlan)navigate("/400");
    else setWorkout(targetPlan);
}
    
  }, [workoutPlans, workout,workoutId]);

 
  const handleBackClick = () => {
    navigate("/workoutplans");
  };

  function generateDayProgramsFromExercises(exercises) {
    const dayMap = {};

    exercises.forEach((exercise) => {
      console.log(exercise,"  edef");
      const { day, exercise_id,exercise_name, reps, sets} = exercise;

      // اگر روز هنوز در dayMap تعریف نشده، ایجادش کن
      if (!dayMap[day]) {
        dayMap[day] = {
          title: `برنامه روز ${day}`,
          exercises: [],
        };
      }

      // ایجاد آرایه ست‌ها بر اساس تعداد sets
      const setsArray = Array.from({ length: sets }, (_, index) => ({
        setNumber: index + 1,
        reps: reps,
      }));

      // اضافه کردن تمرین به لیست تمرین‌های آن روز
      dayMap[day].exercises.push({
        exercise_id,
        name: exercise_name, // یا اگر نام واقعی از API داری، اینجا جایگزین کن
        sets: setsArray,
      });
    });

    // تبدیل dayMap به آرایه dayPrograms
    const dayPrograms = Object.values(dayMap);
    return dayPrograms;
  }
  if(userInfo.usertype=="trainee"){
  if (!workout) {
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
          <Typography variant="h6" mt={4} fontWeight="600" color="text.primary">
            در حال بارگذاری برنامه ورزشی شما...
          </Typography>
        </Box>
      </Fade>
    );
  }
  
  //console.log(workout);
  const dayPrograms = generateDayProgramsFromExercises(workout.exercises);

  return (
    <>
      <CssBaseline />
      <Stack direction={"column"}>
        <Box>
          <Paper elevation={50}>
            <ClientSidebar />
          </Paper>
        </Box>
        <Box
          sx={{
            // width: {
            //   xs: "87.67%",
            //   sm: "89.67%",
            //   md: "78.67%",
            //   lg: "82.67%",
            //   xl: "86.67%",
            // },
            width: {
              xs: "87.67%",
              sm: "89.67%",
              md: "75.67%",
              lg: "82.67%",
              xl: "86.67%",
            },
            marginLeft: { xs: 7.5, md: 25.9 },
            padding: 2,
            marginTop: 3,
          }}
        >
          <Stack direction={"column"}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  direction: "rtl",
                  pl: { sm: 2.5, lg: 1.5, xl: 9.5 },
                  pr: { sm: 2.5, lg: 1.5, xl: 9.5 },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <LogoImage src={Vazneh} alt="لوگو وزنه" />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    صفحه کاربر
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Paper
                elevation={7}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  maxWidth: 1300,
                  height: "80vh",
                  maxHeight: "80vh",
                  mx: "auto",
                  mt: 0,
                  // maxHeight: "70vh",
                  overflowY: "auto",
                }}
              >
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {workout.name}
                    </Typography>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Typography variant="h6" color="text.secondary">
                        بازگشت
                      </Typography>
                      <IconButton
                        onClick={handleBackClick}
                        sx={{
                          backgroundColor: "#f5f5f5",
                          color: "#333",
                          boxShadow: 2,
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <ArrowBackIosNewIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Stack>

                  <Stack direction="column" spacing={3}>
                    {dayPrograms.map((program, index) => (
                      <Accordion key={index} sx={{ borderRadius: 3 }}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: "primary.main" }} />
                          }
                          sx={{
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
                          }}
                        >
                          <Typography fontWeight="bold">
                            {program.title}
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                          sx={{ bgcolor: "background.default" }}
                        >
                          <Stack spacing={4}>
                            {program.exercises.map((exercise, i) => (
                              <Box key={i}>
                                <Typography
                                  fontWeight="bold"
                                  gutterBottom
                                  component={Link}
                                  to={`/exercisedetail/${exercise.exercise_id}`}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "primary.main",
                                    cursor: "pointer",
                                    "&:hover": {
                                      textDecoration: "underline",
                                      transform: "translateX(4px)",
                                    },
                                  }}
                                >
                                  <PlayArrowIcon fontSize="small" />
                                  {exercise.name}
                                </Typography>

                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 2,
                                    flexWrap: "wrap",
                                    mt: 3,
                                  }}
                                >
                                  {exercise.sets.map((set, j) => (
                                    <Box
                                      key={j}
                                      sx={{
                                        width: 120,
                                        borderRadius: 3,
                                        p: 2,
                                        textAlign: "center",
                                        background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.background.paper})`,
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                      >
                                        ست{" "}
                                        {
                                          [
                                            "اول",
                                            "دوم",
                                            "سوم",
                                            "چهارم",
                                            "پنجم",
                                            "ششم",
                                            "هفتم",
                                            "هشتم",
                                            "نهم",
                                            "دهم",
                                            "یازدهم",
                                            "دوازدهم",
                                            "سیزدهم",
                                          ][set.setNumber - 1]
                                        }
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {set.reps} تکرار
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>

                                <Divider sx={{ my: 3 }} />
                              </Box>
                            ))}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
} 
else{
  navigate("/404");
}

}
