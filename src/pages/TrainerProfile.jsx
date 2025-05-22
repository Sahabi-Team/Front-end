import React, { useEffect, useState } from 'react';
import { Container, Box, CssBaseline, Button } from '@mui/material';
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
    fetchTrainer();
    fetchComments();
  }, []);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
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
      setOpenSuccessModal(true);
    }
    catch (error) {
      setOpenErrorModal(true);
      console.error("خطا در ثبت سفارش:", error);
    }
  };

  const handleSubmitComment = async (newCommentText, newRating) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setOpenErrorModal(true);
      console.error("کاربر وارد نشده است.");
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

      // fetch new comments after submit
      fetchComments();
    }
    catch (error) {
      setOpenErrorModal(true);
      console.error("خطا در ارسال نظر:", error);
    }
  };


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header />
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{my: 4}}>
        <InfoSection trainer={trainer} />
        <Button onClick={handleOrder} disabled={!trainer?.isAvailableForReservation} variant="contained" fullWidth sx={{mt: 4, maxWidth: 200, borderRadius: 2.5, fontSize: "1.2rem"}}>ثبت سفارش</Button>
        <CommentSection comments={comments} onSubmitComment={handleSubmitComment} />

        <SuccessModal open={openSuccessModal} onClose={() => {setOpenSuccessModal(false); navigate("/");}} successMessage="سفارش شما با موفقیت ثبت شد." />
        <ErrorModal open={openErrorModal} onClose={() => {setOpenErrorModal(false); navigate("/signin");}} errorMessage="سفارش شما ثبت نشد! لطفا ابتدا وارد حساب کاربری خود شوید!" />
      </Container>
      <Footer />
    </Box>
  );
};

export default TrainerProfile;