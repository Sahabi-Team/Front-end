import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Container,
  IconButton,
  Modal,
  CircularProgress
} from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { Telegram, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import contactImage from "../../public/contactus.svg"
import Navbar from '../components/home/NavbarCard';
import Footer from '../components/Footer';
import axios from 'axios';
import config from '../config';
import SuccessfulModal from "../components/modals/SuccessfulModal";
import ErrorModal from "../components/modals/ErrorModal";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    text: '',
    phone_number: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const [successmessage, setSuccessMessage] = React.useState("");
  const [opensuccessfulmodal, setOpenSuccessfulModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = () => {
    setSuccessMessage("پیام شما با موفقیت ارسال شد . در اسرع وقت به شما پاسخ خواهیم داد!");
    setOpenSuccessfulModal(true);
  };

  
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };
  const handleCloseSuccessfulModal = () => {
    setOpenSuccessfulModal(false); // بستن مودال
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await axios.post(`${config.API_BASE_URL}/api/opinions/create/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
  
      setSuccessMessage("پیام شما با موفقیت ارسال شد . در اسرع وقت به شما پاسخ خواهیم داد!");
      setOpenSuccessfulModal(true); // ✅ fix here
  
      setFormData({
        title: '',
        name: '',
        text: '',
        phone_number: '',
        email: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("ارسال پیام با خطا مواجه شد. لطفا دوباره تلاش کنید.");
      setOpenErrorModal(true); // ✅ show error modal
    } finally {
      setLoading(false);
    }

  };

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

          <Box mt={7} component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="left">
              با ما در ارتباط باشید
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  label="نام و نام خانوادگی" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  label="ایمیل" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  label="شماره تماس" 
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="عنوان"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="پیام"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
              <Button 
                type="submit"
                variant="contained" 
                color="success" 
                disabled={loading}
                sx={{ 
                  fontSize: '1.1rem', 
                  px: 5, 
                  py: 1.5, 
                  backgroundColor: '#0A9A59', 
                  '&:hover': { backgroundColor: '#066c3f' } 
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'ارسال پیام'}
              </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <SuccessfulModal
        open={opensuccessfulmodal}
        onClose={handleCloseSuccessfulModal}
        successMessage={successmessage}
      />     


      <Footer />
    </>
  );
};

export default ContactUsPage;
