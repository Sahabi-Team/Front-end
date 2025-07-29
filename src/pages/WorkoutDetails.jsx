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
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import config from "../config.js";
import MainLayout from "../components/MainLayout.jsx";
import {
  differenceInDays,
  addDays,
  parseISO,
  formatDistanceToNow,
} from "date-fns";

const WorkoutDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo } = useContext(AuthContext);
  const { workoutId } = useParams();

  const [workout, setWorkout] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const access_token = localStorage.getItem("access_token");

  const toPersianNumber = (num) =>
    num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

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
      const targetPlan = workoutPlans.find(
        (plan) => plan.id === parseInt(workoutId)
      );
      if (!targetPlan) navigate("/400");
      else {
        setWorkout(targetPlan);
      }
    }
  }, [workoutPlans, workout, workoutId]);

  const handleBackClick = () => {
    navigate("/workoutplans");
  };

  const handleExerciseClick = (exercise_id) => {
    navigate(`/exercisedetail/${exercise_id}`, {
      state: {
        returndata: `/workoutDetails/${workoutId}`,
      },
    });
  };

  const generateDayProgramsFromExercises = (exercises) => {
    const dayMap = {};
    exercises.forEach((exercise) => {
      const { day, exercise_id_display, exercise_name, reps, sets } = exercise;
      if (!dayMap[day]) {
        dayMap[day] = {
          title: `برنامه روز ${toPersianNumber(day)}`,
          exercises: [],
        };
      }
      const setsArray = Array.from({ length: sets }, (_, index) => ({
        setNumber: index + 1,
        reps,
      }));

      dayMap[day].exercises.push({
        exercise_id_display,
        name: exercise_name,
        sets: setsArray,
      });
    });

    return Object.values(dayMap);
  };

  if (userInfo.usertype !== "trainee") {
    navigate("/404");
    return null;
  }

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
            textAlign: "center",
          }}
        >
          <CircularProgress size={70} thickness={4.5} color="primary" />
          <Typography variant="h6" mt={4} fontWeight={600}>
            در حال بارگذاری برنامه ورزشی شما...
          </Typography>
        </Box>
      </Fade>
    );
  }

  const dayPrograms = generateDayProgramsFromExercises(workout.exercises);

  return (
    <MainLayout>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 4,
          maxWidth: 1100,
          mx: "auto",
          mt: 2,
          mb: 2,
          height: "78vh",
          overflowY: "auto",
          bgcolor: "#F8F8F8",
        }}
      >
        <Stack spacing={3}>
          {/* Title and Back */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="bold"
            >
              {workout.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography variant="body1" color="text.secondary">
                بازگشت
              </Typography>
              <IconButton
                onClick={handleBackClick}
                sx={{
                  backgroundColor: "#eeeeee",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#dddddd",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>

          <Stack direction={"row"} sx={{ mt: 0 }}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="bold"
              sx={{ mr: 1 }}
            >
              مربی :
            </Typography>
            <Typography>رضا یزدی</Typography>
          </Stack>

          <Divider
            sx={{
              my: 3,
              borderColor: "#ddd",
              borderWidth: "1px",
              width: "50%",
              mx: "auto 0",
            }}
          />
          {/* Workout Accordion */}
          <Stack spacing={2}>
            {dayPrograms.map((program, index) => (
              <Accordion key={index} sx={{ borderRadius: 2, boxShadow: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#666" }} />}
                  sx={{
                    flexDirection: "row-reverse",
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  <Typography fontWeight="bold">{program.title}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
                  <Stack spacing={3}>
                    {program.exercises.map((exercise, i) => (
                      <Box key={i}>
                        <Typography
                          onClick={() =>
                            handleExerciseClick(exercise.exercise_id_display)
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "primary.main",
                            fontWeight: "bold",
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

                        {/* Sets */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            mt: 2,
                          }}
                        >
                          {exercise.sets.map((set, j) => (
                            <Box
                              key={j}
                              sx={{
                                minWidth: 100,
                                borderRadius: 2,
                                p: 1.5,
                                textAlign: "center",
                                backgroundColor: "#ececec",
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">
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
                                  ][set.setNumber - 1]
                                }
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {toPersianNumber(set.reps)} تکرار
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />
                      </Box>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </MainLayout>
  );
};

export default WorkoutDetails;
