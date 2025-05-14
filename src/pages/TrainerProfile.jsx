import React from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import Header from "../components/TrainerProfile/Header";
import InfoSection from "../components/TrainerProfile/InfoSection";
import CommentSection from "../components/TrainerProfile/CommentSection";
import Navbar from "../components/home/NavbarCard";
import Footer from "../components/Footer";

const TrainerProfile = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header />
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{my: 4}}>
        <InfoSection />
        <CommentSection />
      </Container>
      <Footer />
    </Box>
  );
};

export default TrainerProfile;