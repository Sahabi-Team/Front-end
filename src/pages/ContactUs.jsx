import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Container,
  IconButton
} from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { Telegram, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import contactImage from "../../public/contactus.svg"
import Navbar from '../components/home/NavbarCard';
import Footer from '../components/Footer';

const ContactUsPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          minHeight: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #00994d 0%,rgb(192, 222, 209) 60%, #00994d 100%)',
          marginBottom: 4,
          marginTop: 10,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'white' }}>
          تماس با ما
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: -6, mb: 10 }}>
        <Paper elevation={10} sx={{ borderRadius: 5, p: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} textAlign="center">
              <img src={contactImage} alt="تماس با ما" style={{ width: '100%', maxWidth: 300 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                ما به صورت ۲۴ ساعته آماده پاسخگویی هستیم!
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>آدرس:</strong> دانشگاه علم و صنعت - دپارتمان مهندسی کامپیوتر
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>شماره تلفن:</strong> ۰۲۱-۱۲۳۴۵۶۷۸
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>آدرس ایمیل:</strong> gymbato@gmail.com
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  شبکه های اجتماعی:
                </Typography>
                <IconButton color="success"><Telegram /></IconButton>
                <IconButton color="success"><WhatsApp /></IconButton>
                <IconButton color="success"><LinkedIn /></IconButton>
                <IconButton color="success"><Instagram /></IconButton>
              </Box>
            </Grid>

            
          </Grid>

          <Box mt={5}>
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="left">
              با ما در ارتباط باشید
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="نام و نام خانوادگی" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="شماره تماس" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="شغل" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="پیام"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="success">
                  ارسال پیام
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUsPage;
