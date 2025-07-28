import React, { useContext} from "react";
import ExerciseCard from "../components/Exercise_Detail/ExerciseCard";
import Navbar from "../components/home/NavbarCard";
import { CssBaseline, Box, Typography, Stack } from "@mui/material";
import Contactus from "../components/Exercise_Detail/ContactUs";
import Footer from "../components/Footer";
import { IconButton, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../config";
import { AuthContext } from "../contexts/AuthContext";

export default function Exercise_Detail() {
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت به صفحه جدید
  const { id } = useParams();
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { returndata } = location.state || {};
  const { userInfo, logout } = useContext(AuthContext);
//  console.log(location.state)
  const handleBackClick = () => {
   if(userInfo!=null){
    if (userInfo.usertype == "trainer") {
      navigate("/exercises");
    } 
    else if (userInfo.usertype == "trainee") {
      // console.log("salam");
      if (returndata == null) {
        navigate("/exercises");
      } else {
        // alert(returndata);
        navigate(returndata);
      }
    } 
  }
    else {
      navigate("/exercises");
    }
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(
          `${config.API_BASE_URL}/api/exercises/exercises/${id}/`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setExerciseData(data);
        // console.log(data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  return (
    <>
      <Navbar showInitialBorder={true} />
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          flex: 1,
          marginTop: 15,
          marginBottom: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#fff",
              direction: "rtl", // راست‌چین برای عنوان
            }}
          >
            {/* دکمه بازگشت */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5, // فاصله بین آیکون و متن
              }}
            >
              <IconButton
                onClick={handleBackClick} // فراخوانی تابع برای هدایت
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

              <Typography variant="h6" color="text.secondary">
                بازگشت
              </Typography>
            </Box>
            <Stack direction={"row"}>
              {loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <Typography variant="h6" fontWeight="bold">
                  {exerciseData.name}
                </Typography>
              )}
              <Box sx={{ width: 10 }}></Box>
              <Typography variant="h6" fontWeight="bold">
                : عنوان حرکت
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mt: 2 }}>
          <ExerciseCard exerciseId={id} />
          <Box sx={{ mt: 7 }}>
            <Contactus />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
