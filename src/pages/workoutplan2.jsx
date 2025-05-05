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
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

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
            width: {
              xs: "87.67%",
              sm: "89.67%",
              md: "78.67%",
              lg: "82.67%",
              xl: "86.67%",
            },
            marginLeft: { xs: 8, md: 28.9 },
            padding: 8,
          }}
        >
          <Stack direction={"column"}>
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
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.25rem",
                        md: "1.5rem",
                        lg: "1.75rem",
                        xl: "2rem",
                      },
                    }}
                  >
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
                  height: 1200,
                  mx: "auto",
                  mt: 0,
                  maxHeight: "70vh",
                  overflowY: "auto",
                }}
              >
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.2rem",
                            lg: "1.3rem",
                            xl: "1.4rem",
                          },
                        }}
                      >
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
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.85rem",
                            sm: "0.9rem",
                            md: "1rem",
                            lg: "1.05rem",
                            xl: "1.1rem",
                          },
                        }}
                      >
                        بازگشت
                      </Typography>
                      <IconButton
                        onClick={handleBackClick}
                        sx={{
                          backgroundColor: "#f5f5f5",
                          color: "#333",
                          boxShadow: 2,
                          width: {
                            xs: 28,
                            sm: 32,
                            md: 36,
                            lg: 40,
                            xl: 44,
                          },
                          height: {
                            xs: 28,
                            sm: 32,
                            md: 36,
                            lg: 40,
                            xl: 44,
                          },
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                            transform: "scale(1.05)",
                          },
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                      >
                        <ArrowBackIosNewIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Stack>

                  <Stack direction="column" spacing={3}>
                    {/* آکاردئون‌ها */}
                    {dayPrograms.map((program, index) => (
                      <Accordion
                        key={index}
                        sx={{
                          borderRadius: 3,
                          overflow: "hidden",
                          backgroundColor: "background.paper",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            boxShadow: "0 6px 30px rgba(0, 0, 0, 0.1)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                          sx={{
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
                            px: 3,
                            py: 2,
                          }}
                        >
                          <Typography
                            fontWeight="bold"
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                                md: "1.2rem",
                                lg: "1.25rem",
                                xl: "1.3rem",
                              },
                            }}
                            color="text.primary"
                          >
                            {program.title}
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ bgcolor: "background.default", px: 3, py: 2 }}>
                          <Stack spacing={4}>
                            {program.exercises.map((exercise, i) => (
                              <Box key={i} sx={{ animation: "fadeIn 0.5s ease-in" }}>
                                <Typography
                                  fontWeight="bold"
                                  gutterBottom
                                  component={Link}
                                  to={`/exercise-details/${i}`}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    fontSize: {
                                      xs: "0.85rem",
                                      sm: "0.9rem",
                                      md: "1rem",
                                      lg: "1.05rem",
                                      xl: "1.1rem",
                                    },
                                    color: "primary.main",
                                    cursor: "pointer",
                                    transition: "0.2s ease",
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
                                    justifyContent: "flex-start",
                                    gap: 2,
                                    flexWrap: "wrap",
                                    marginTop: 3,
                                  }}
                                >
                                  {exercise.sets.map((set, j) => (
                                    <Box
                                      key={j}
                                      sx={{
                                        width: {'xs':90,'md':120},
                                        borderRadius: 3,
                                        p: 2,
                                        textAlign: "center",
                                        background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.background.paper})`,
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                        transition: "0.3s",
                                        "&:hover": {
                                          transform: "scale(1.05)",
                                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        },
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        color="text.primary"
                                        sx={{
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.8rem",
                                            md: "0.9rem",
                                            lg: "1rem",
                                            xl: "1.05rem",
                                          },
                                        }}
                                      >
                                        ست {["اول", "دوم", "سوم", "چهارم", "پنجم"][set.setNumber - 1]}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          fontSize: {
                                            xs: "0.7rem",
                                            sm: "0.75rem",
                                            md: "0.85rem",
                                            lg: "0.95rem",
                                            xl: "1rem",
                                          },
                                        }}
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