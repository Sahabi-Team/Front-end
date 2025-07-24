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
import TrainerSidebar from "../components/TrainerSidebar.jsx";
import Vazneh from "../assets/imgs/home/vazneh.png";
import Footer from "../components/Footer.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TestResultCard from "../components/CreateWorkoutPlan/TestResultCard.jsx";
import WorkoutPlanCard from "../components/CreateWorkoutPlan/WorkoutPlan_card.jsx";
import ErrorModal from "../components/modals/ErrorModal.jsx";
import MainLayout from "../components/MainLayout.jsx";
import config from "../config.js";


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

export default function WorkoutPlans() {
  const { traineeID } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(traineeID);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [istestreadonly, setIstestreadonly] = React.useState(true);
  const [initialsession, setInitialsession] = React.useState(null);
  const [mentorshipId, setMentorshipId] = React.useState(null);
  const [workoutplanIdonUpdate, setWorkoutplanIdonUpdate] =
    React.useState(null);

  // console.log(selectedUserId);
  const handleStartWritingPlan = () => {
    if (istestreadonly) {
      setIstestreadonly(false);
    }
    setShowWorkoutPlan(true);
  };
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };

  // مثلا از route params یا props مقدار می‌گیری:
  useEffect(() => {
    // مثال:
    const idFromStorage = localStorage.getItem("mentorship_id");
    if (idFromStorage) setMentorshipId(idFromStorage);
  }, []);

  // اینجا فقط وقتی mentorshipId آماده شد، فراخوانی انجام بده
  useEffect(() => {
    if (mentorshipId) {
      fetchLatestWorkoutPlanAsSessions(mentorshipId);
    }
  }, [mentorshipId]);

  const fetchLatestWorkoutPlanAsSessions = async (mentorshipId) => {
    const token = localStorage.getItem("access_token");
    // alert(token);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/mentorship/mentorships/${mentorshipId}/last_workout_plan/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("ddd ",response.data);
      setWorkoutplanIdonUpdate(response.data.id);
      const exercises = response.data.exercises;
      // alert(response.data.exercises);

      function generateDayProgramsFromExercises(exercises) {
        const dayMap = {};

        exercises.forEach((exercise) => {
          // console.log(exercise, "  edef");
          const { day, exercise_id_display, exercise_name, reps, sets } =
            exercise;

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
            id: exercise_id_display,
            name: exercise_name, // یا اگر نام واقعی از API داری، اینجا جایگزین کن
            sets: setsArray,
          });
        });

        // تبدیل dayMap به آرایه dayPrograms
        const dayPrograms = Object.values(dayMap);
        return dayPrograms;
      }

      let dayprograms = generateDayProgramsFromExercises(exercises);

      function generateSessionsFromDayPrograms(dayPrograms) {
        return dayPrograms.map((day) => {
          const moves = day.exercises.map((exercise) => {
            return {
              name: exercise.id,
              realname: exercise.name,
              sets: exercise.sets.map((set) => parseInt(set.reps)),
            };
          });

          return {
            moves,
            note: "", // چون گفتی خالی بذاریم
          };
        });
      }
      if(dayprograms.length!=0){
      setInitialsession(generateSessionsFromDayPrograms(dayprograms));
      }
    } catch (error) {
      console.error(
        "❌ خطا در دریافت برنامه از mentorship API:",
        error.response?.data || error.message
      );
    }
  };

  // console.log(mentorshipId);

  const navigate = useNavigate();

  if (userInfo.usertype == "trainer") {
    useEffect(() => {
      const loadSessions = async () => {
        const loadedSessions = await fetchLatestWorkoutPlanAsSessions();
        setInitialsession(loadedSessions);
      };

      loadSessions();
    }, []);

    // console.log("lll  ", initialsession);
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
                    p: 0,
                    borderRadius: 4,
                    maxWidth: 1300,
                    height: "80vh",
                    maxHeight: "80vh",
                    mx: "auto",
                    mt: 0,
                    overflowY: "auto",
                  }}
                >
                  {showWorkoutPlan ? (
                    selectedUserId != null ? (
                      <WorkoutPlanCard
                        workoutplanidonupdate={workoutplanIdonUpdate}
                        updating={true}
                        mentorshipId={mentorshipId}
                        setMentorshipId={setMentorshipId}
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                        showtest={setIstestreadonly}
                        setShowWorkoutPlan={setShowWorkoutPlan}
                        initialSessions={initialsession}
                        setInitialsession={setInitialsession}
                      />
                    ) : (
                      <>
                        <TestResultCard
                          onStartWritingPlan={handleStartWritingPlan}
                          setSelectedUserId={setSelectedUserId}
                          selectedUserId={selectedUserId}
                          isreadonly={istestreadonly}
                          updating={true}
                        />
                        {setErrorMessage("کاربری انتخاب نشده است.")}
                        {setOpenErrorModal(true)}
                        {setShowWorkoutPlan(false)}
                      </>
                    )
                  ) : (
                    <TestResultCard
                      onStartWritingPlan={handleStartWritingPlan}
                      setSelectedUserId={setSelectedUserId}
                      setMentorshipId={setMentorshipId}
                      selectedUserId={selectedUserId}
                      isreadonly={istestreadonly}
                      updating={true}
                    />
                  )}
                </Paper>

            
         
       
        <ErrorModal
          open={openErrorModal}
          onClose={handleCloseErrorModal}
          errorMessage={errorMessage}
        />
      </MainLayout>
    );
  } else {
    navigate("/404");
  }
}
