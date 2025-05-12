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
import { Telegram, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
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
        <Typography variant="h4" sx={{ fontWeight:'bold', color: 'white' }}>
          تماس با ما
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 10 }}>
        <Paper elevation={10} sx={{ borderRadius: 5, p: 6 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} textAlign="center">
              <img src={contactImage} alt="تماس با ما" style={{ width: '100%', maxWidth: 380 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{mb:8}}>
                  ما به صورت ۲۴ ساعته آماده پاسخگویی هستیم!
                </Typography>
                <Box sx={{  width: '100%', pr: 2 }}>
                  <Typography variant="body1"  gutterBottom mb={2.5}  fontSize={18}>
                    <strong>آدرس:</strong> دانشگاه علم و صنعت - دپارتمان مهندسی کامپیوتر
                  </Typography>
                  <Typography variant="body1" gutterBottom mb={2.5} fontSize={18}>
                    <strong>شماره تلفن:</strong> ۰۲۱-۱۲۳۴۵۶۷۸
                  </Typography>
                  <Typography variant="body1" gutterBottom mb={1.5} fontSize={18}>
                    <strong>آدرس ایمیل:</strong> gymbato@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" fontWeight="bold" fontSize={18} sx={{ whiteSpace: 'nowrap' }}>
                    شبکه های اجتماعی:
                  </Typography>
                  <a href="https://t.me/gymbato" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ fontSize: 26, background: '#0A9A59', borderRadius: '50%', transition: 'background 0.2s', '&:hover': { background: '#066c3f' } }}>
                      <Telegram sx={{ fontSize: 26, color: '#fff' }} />
                    </IconButton>
                  </a>
                  <a href="https://twitter.com/gymbato" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ fontSize: 26, background: '#0A9A59', borderRadius: '50%', transition: 'background 0.2s', '&:hover': { background: '#066c3f' } }}>
                      <Twitter sx={{ fontSize: 26, color: '#fff' }} />
                    </IconButton>
                  </a>
                  <a href="https://linkedin.com/company/gymbato" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ fontSize: 26, background: '#0A9A59', borderRadius: '50%', transition: 'background 0.2s', '&:hover': { background: '#066c3f' } }}>
                      <LinkedIn sx={{ fontSize: 26, color: '#fff' }} />
                    </IconButton>
                  </a>
                  <a href="https://instagram.com/gymbato" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ fontSize: 26, background: '#0A9A59', borderRadius: '50%', transition: 'background 0.2s', '&:hover': { background: '#066c3f' } }}>
                      <Instagram sx={{ fontSize: 26, color: '#fff' }} />
                    </IconButton>
                  </a>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box mt={7}>
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="left">
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
                <Button variant="contained" color="success" sx={{ fontSize: '1.1rem', px: 5, py: 1.5, backgroundColor: '#0A9A59', '&:hover': { backgroundColor: '#066c3f' } }}>
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
