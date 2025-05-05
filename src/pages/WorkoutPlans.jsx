import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ClientSidebar from "../components/ClientSidebar.jsx";
import Vazneh from "../assets/imgs/home/vazneh.png";
import Footer from "../components/Footer.jsx";
import { AuthContext } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "30px",
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

  const navigate = useNavigate();

  const handleShowWorkoutPlanClick = (id) => {
    navigate("/workoutdetails", { state: { workoutId: id } });
  };
   
  

  useEffect(() => {
    const fetchWorkoutPlans = async (access) => {
      try {
        const response = await axios.get('http://84.234.29.28:8000/api/workout/workout-plans/', {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        setWorkoutPlans(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('خطا در گرفتن workout plans:', error);
      }
    };
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      fetchWorkoutPlans(access_token);
    }
  }, [userInfo]);

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
            width: { xs: "87.67%", sm: "89.67%", md: "75.67%", lg: "82.67%", xl: "86.67%" },
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
                        xs: "1.2rem",
                        sm: "1.5rem",
                        md: "1.7rem",
                        lg: "2rem",
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
                        sx={{ minWidth: 80 }}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: 2 }}
                        onClick={() => handleShowWorkoutPlanClick(program.id)}
                      >
                        مشاهده برنامه
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
