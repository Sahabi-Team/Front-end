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
import TrainerSidebar from "../TrainerSidebar.jsx";
import Vazneh from "../../assets/imgs/home/vazneh.png";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import axios from "axios";
import config from "../../config.js";
import { useLocation } from "react-router-dom";
import MainLayout from "../MainLayout.jsx";

const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

// const dayPrograms = [
//   {
//     title: "برنامه روز اول",
//     exercises: [
//       {
//         id: "1",
//         name: "جلو پا دستگاه نشسته",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//           { setNumber: 4, reps: 12 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز دوم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز سوم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز چهارم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز پنجم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز ششم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز هفتم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     title: "برنامه روز هشتم",
//     exercises: [
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "پشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsfپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dscdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 12 },
//         ],
//       },
//       {
//         id: "2",
//         name: "dsvcsdپشت پا دستگاه",
//         sets: [
//           { setNumber: 1, reps: 12 },
//           { setNumber: 2, reps: 12 },
//           { setNumber: 3, reps: 10 },
//         ],
//       },
//     ],
//   },
// ];

export default function WorkoutDetails() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userInfo } = useContext(AuthContext);

  const [loadingVisible, setLoadingVisible] = useState(false);
  let access_token = localStorage.getItem("access_token");
  const location = useLocation();
  const dayPrograms = location.state?.dayPrograms || [];

  //   const selectedUserId = location.state?.selectedUserId;
  //   const setSelectedUserId=  location.state?.setSelectedUserId;
  //   const showtest = location.state?.showtest;
  //   const setShowWorkoutPlan = location.state?.setShowWorkoutPlan;
  //   const sessions = location.state?.sessions;
  //   const setInitialsession = location.state?.setInitialsession;

  // console.log(dayPrograms);

  const handleBackClick = () => {
    navigate("/trainer_students");
  };

  if (!dayPrograms) {
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

  return (
    <MainLayout>
      <Paper
        elevation={0}
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
              {/* {workout.name} */}
              پیش نمایش برنامه :
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                  expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                  sx={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
                  }}
                >
                  <Typography fontWeight="bold">{program.title}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ bgcolor: "background.default" }}>
                  <Stack spacing={4}>
                    {program.exercises.map((exercise, i) => (
                      <Box key={i}>
                        <Typography
                          fontWeight="bold"
                          gutterBottom
                          component={Link}
                          to={`/exercisedetail/${exercise.id}`}
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
                              <Typography variant="body2" fontWeight="bold">
                                ست{" "}
                                {
                                  ["اول", "دوم", "سوم", "چهارم", "پنجم"][
                                    set.setNumber - 1
                                  ]
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
    </MainLayout>
  );
}
