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
import { useNavigate } from "react-router-dom";
import TestResultCard from "../components/CreateWorkoutPlan/TestResultCard.jsx";
import WorkoutPlanCard from "../components/CreateWorkoutPlan/WorkoutPlan_card.jsx";
import ErrorModal from "../components/modals/ErrorModal.jsx";

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
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [istestreadonly , setIstestreadonly] = React.useState(false);
  const [initialsession,setInitialsession] = React.useState(null);
  const [mentorshipId,setMentorshipId] = React.useState(null);

 console.log(selectedUserId);
  const handleStartWritingPlan = () => {
    if(istestreadonly){
      setIstestreadonly(false);
    }
    setShowWorkoutPlan(true);
  };
   const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };

  const navigate = useNavigate();

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
          <Typography variant="h6" mt={4} fontWeight="600" color="text.primary">
            در حال بارگذاری برنامه ورزشی شما...
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <>
      <CssBaseline />
      <Stack direction={"column"}>
        <Box>
          <Paper elevation={50}>
            <TrainerSidebar />
          </Paper>
        </Box>
        <Box
          sx={{
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
                {showWorkoutPlan ? (
                  selectedUserId != null ? (
                    <WorkoutPlanCard  mentorshipId={mentorshipId} setMentorshipId={setMentorshipId}  selectedUserId={selectedUserId} setSelectedUserId = {setSelectedUserId} showtest={setIstestreadonly} setShowWorkoutPlan = {setShowWorkoutPlan} initialSessions = {initialsession} setInitialsession={setInitialsession} />
                  ) : (
                    <>
                      <TestResultCard
                        onStartWritingPlan={handleStartWritingPlan}
                        setSelectedUserId={setSelectedUserId}
                        
                        selectedUserId={selectedUserId}
                        isreadonly={istestreadonly}
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
                    isreadonly = {istestreadonly}
                  />
                )}
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Stack>
       <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
}
