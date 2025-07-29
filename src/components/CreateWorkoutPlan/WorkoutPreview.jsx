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
  TextField,
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

export default function WorkoutDetails() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userInfo } = useContext(AuthContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loadingVisible, setLoadingVisible] = useState(false);
  let access_token = localStorage.getItem("access_token");
  const location = useLocation();
  const dayPrograms = location.state?.dayPrograms || [];
  const workoutdescription = location.state?.workoutdescription || "هیچ یادداشتی اضافه نشده است."

  const toPersianNumber = (num) =>
    num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

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
              {"پیش نمایش برنامه : "}
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
        <Box mt={3}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            توضیحات برنامه
          </Typography>
          <TextField
            readOnly={true}
            multiline
            minRows={3}
            fullWidth
            value={workoutdescription}
            placeholder=""
            sx={{
              backgroundColor: "#fafafa",
              borderRadius: 2,
            }}
          />
        </Box>
      </Paper>
    </MainLayout>
  );
}
