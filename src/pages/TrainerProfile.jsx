import React, { useEffect, useState } from 'react';
import { Container, Box, CssBaseline, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import Header from "../components/TrainerProfile/Header";
import InfoSection from "../components/TrainerProfile/InfoSection";
import CommentSection from "../components/TrainerProfile/CommentSection";
import Footer from "../components/Footer";
import SuccessModal from "../components/modals/SuccessfulModal";
import ErrorModal from "../components/modals/ErrorModal";
import axios from "axios";
import config from "../config";

const TrainerProfile = () => {
  const {trainerID} = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const fetchTrainer = async () =>
  {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/trainer/trainers/${trainerID}/profile/`);
      setTrainer(response.data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching trainer:", error);
      if (error.response.status === 404)
        navigate("/404");
      if (error.response.status === 500)
        navigate("/500");
      setLoading(false);
    }
  };

  const fetchComments = async () =>
  {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/trainer/comments/${trainerID}/`);
      setComments(response.data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching comments:", error);
      if (error.response.status === 404)
        navigate("/404");
      if (error.response.status === 500)
        navigate("/500");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTrainer();
    fetchComments();
  }, []);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        setOpenErrorModal(true);
        console.error("کاربر وارد نشده است.");
        return;
      }

      const response = await axios.post(
        `${config.API_BASE_URL}/api/mentorship/mentorships/`,
        {
          trainer: trainer.trainer_id
        },
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      
      setSuccessMessage("سفارش شما با موفقیت ثبت شد.");
      setOpenSuccessModal(true);
    }
    catch (error) {
      console.error("خطا در ثبت سفارش:", error);
      if (error.response.status === 403)
      {
        setErrorMessage("شما با این مربی یک برنامه ورزشی فعال از قبل دارید.");
        setOpenErrorModal(true);
      }
      if (error.response.status === 500)
        navigate("/500");
    }
  };

  const handleSubmitComment = async (newCommentText, newRating) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      setOpenErrorModal(true);
      console.error("کاربر وارد نشده است.");
      return;
    }
    if (!newCommentText || newRating === 0)
    {
      setErrorMessage("لطفا فیلد امتیاز و نظر خود را کامل پر کنید.");
      setOpenErrorModal(true);
      return;
    }

    try {
      await axios.post(`${config.API_BASE_URL}/api/trainer/comments/create/`, 
      {
        trainer: parseInt(trainerID),
        comment: newCommentText,
        rating: newRating
      },
      {
        headers: {Authorization: `Bearer ${token}`}
      });

      setSuccessMessage("نظر شما با موفقیت ثبت شد.");
      setOpenSuccessModal(true);
      // fetch new comments after submit
      fetchComments();
    }
    catch (error) {
      setErrorMessage(error.response.statusText);
      setOpenErrorModal(true);
      console.error("خطا در ارسال نظر:", error);
      if (error.response.status === 500)
        navigate("/500");
    }
  };


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header />
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{my: 4}}>
        {loading ? (
        <>
          <CircularProgress/>
          <Typography fontSize={20} my={5}>در حال دریافت اطلاعات مربی ...</Typography>
        </>
        ) : (
        <>
          <InfoSection trainer={trainer} />
          <Button onClick={handleOrder} disabled={!trainer?.isAvailableForReservation} variant="contained" fullWidth sx={{mt: 4, maxWidth: 200, borderRadius: 2.5, fontSize: "1.2rem"}}>ثبت سفارش</Button>
          <CommentSection comments={comments} onSubmitComment={handleSubmitComment} />
        </>
        )}

        <SuccessModal open={openSuccessModal} onClose={() => {setOpenSuccessModal(false); /*navigate("/");*/}} successMessage={successMessage} />
        <ErrorModal open={openErrorModal} onClose={() => {setOpenErrorModal(false); /*navigate("/signin");*/}} errorMessage={errorMessage} />
      </Container>
      <Footer />
    </Box>
  );
};

export default TrainerProfile;