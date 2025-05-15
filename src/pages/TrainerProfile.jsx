import React, { useEffect, useState } from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import Header from "../components/TrainerProfile/Header";
import InfoSection from "../components/TrainerProfile/InfoSection";
import CommentSection from "../components/TrainerProfile/CommentSection";
import Footer from "../components/Footer";
import axios from 'axios'

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://84.234.29.28:8000/api/trainer/info/"); // آدرس فرضی
        setTrainer(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching trainer:", error);
        setLoading(false);
      }
    };

    fetchTrainer();
  }, []);


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header />
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{my: 4}}>
        <InfoSection trainer={trainer} />
        <CommentSection />
      </Container>
      <Footer />
    </Box>
  );
};

export default TrainerProfile;