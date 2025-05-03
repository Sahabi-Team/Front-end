import React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CssBaseline,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link, useNavigate } from "react-router-dom";
import ClientSidebar from "../components/ClientSidebar";
import Footer from "../components/Footer";
import Vazneh from "../assets/imgs/home/vazneh.png";

const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

const dayPrograms = [
  {
    title: "برنامه روز اول",
    exercises: [
      {
        name: "جلو پا دستگاه نشسته",
        sets: [
          { setNumber: 1, reps: 12 },
          { setNumber: 2, reps: 12 },
          { setNumber: 3, reps: 12 },
          { setNumber: 4, reps: 12 },
        ],
      },
      {
        name: "پشت پا دستگاه",
        sets: [
          { setNumber: 1, reps: 12 },
          { setNumber: 2, reps: 12 },
          { setNumber: 3, reps: 12 },
        ],
      },
    ],
  },
  {
    title: "برنامه روز دوم",
    exercises: [
      {
        name: "پرس سینه با هالتر",
        sets: [
          { setNumber: 1, reps: 10 },
          { setNumber: 2, reps: 10 },
          { setNumber: 3, reps: 8 },
        ],
      },
    ],
  },
  {
    title: "برنامه روز سوم",
    exercises: [
      {
        name: "زیر بغل سیم کش",
        sets: [
          { setNumber: 1, reps: 12 },
          { setNumber: 2, reps: 12 },
          { setNumber: 3, reps: 12 },
        ],
      },
    ],
  },
  {
    title: "برنامه روز چهارم",
    exercises: [
      {
        name: "اسکات با هالتر",
        sets: [
          { setNumber: 1, reps: 10 },
          { setNumber: 2, reps: 10 },
          { setNumber: 3, reps: 8 },
        ],
      },
    ],
  },
];

export default function WorkoutPlan2() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/exercises");
  };

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
            width: { xs: "86.67%", md: "86.67%" },
            marginLeft: { xs: 8, md: 28.9 },
            padding: 8,
          }}
        >
          <Stack direction={"column"}>
            {/* هدر بالا */}
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ direction: "rtl", p: 2.5 }}
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

            {/* بدنه اصلی */}
            <Box>
              <Paper
                elevation={7}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  maxWidth: 1300,
                  height: 1200,
                  mx: "auto",
                  mt: 0,
                  maxHeight: "70vh",
                  overflowY: "auto",
                }}
              >
                <Stack spacing={3}>
                  {/* نوار عنوان */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Stack direction="row" alignItems="center">
                      <Typography variant="h6" fontWeight="bold">
                        دوره یک ماهه
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                      }}
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
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                      >
                        <ArrowBackIosNewIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>

                  {/* آکاردئون تمرینات */}
                  <Stack direction={"column"}>
                    <Box sx={{ width: "100%", mx: "auto" }}>
                      {dayPrograms.map((program, index) => (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                              bgcolor: "#f5f5f5",
                              borderRadius: 2,
                              boxShadow: 2,
                              my: 1,
                            }}
                          >
                            <Typography fontWeight="bold">
                              {program.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Stack spacing={4}>
                              {program.exercises.map((exercise, i) => (
                                <Box key={i}>
                                  <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    textAlign="left"
                                    component={Link}
                                    to={`/exercise-details/${i}`}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      color: "#1976d2",
                                      cursor: "pointer",
                                      "&:hover": {
                                        textDecoration: "underline",
                                      },
                                    }}
                                  >
                                    <PlayArrowIcon fontSize="small" />
                                    {exercise.name}
                                  </Typography>

                                  <Stack direction="row" flexWrap="wrap" gap={2}>
                                    {exercise.sets.map((set, j) => (
                                      <Box
                                        key={j}
                                        sx={{
                                          borderRadius: 3,
                                          p: 2,
                                          minWidth: 100,
                                          textAlign: "center",
                                          background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
                                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                          transition: "transform 0.3s, box-shadow 0.3s",
                                          "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                          },
                                        }}
                                      >
                                        <Typography variant="body2" fontWeight="bold">
                                          ست{" "}
                                          {["اول", "دوم", "سوم", "چهارم", "پنجم"][set.setNumber - 1]}
                                        </Typography>
                                        <Typography variant="body2">{set.reps} تکرار</Typography>
                                      </Box>
                                    ))}
                                  </Stack>

                                  {/* جداکننده بین حرکات */}
                                  <Divider sx={{ my: 2 }} />
                                </Box>
                              ))}
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
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
