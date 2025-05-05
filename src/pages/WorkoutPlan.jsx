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
import ClientSidebar from "../components/ClientSidebar";
import Vazneh from "../assets/imgs/home/vazneh.png";
import Footer from "../components/Footer.jsx";
import { AuthContext, AuthProvider } from '../contexts/AuthContext.jsx';
import axios from 'axios';

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

export default function WorkoutPlan() {
  const { userInfo } = useContext(AuthContext);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  console.log(userInfo);
  useEffect(() => {
    console.log("useEffect triggered. userInfo:", userInfo);
  
    const fetchWorkoutPlans = async (access) => {
      console.log("Inside fetchWorkoutPlans");
      try {
        const response = await axios.get('http://84.234.29.28:8000/api/workout/workout-plans/', {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        console.log('Workout Plans:', response.data);
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error('خطا در گرفتن workout plans:', error);
      }
    };
    let access_token = localStorage.getItem("access_token")
    if (access_token) {
      console.log("Calling fetchWorkoutPlans");
      fetchWorkoutPlans(access_token);
    } else {
      console.log("No access token, fetch skipped");
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
            width: {xs:"87.67%", sm: "89.67%",md: "75.67%" , lg: "82.67%",xl:"86.67%" },
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
                        <Typography variant="h6" fontWeight="bold">
                          {program.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          (شروع از {program.created_at})
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
