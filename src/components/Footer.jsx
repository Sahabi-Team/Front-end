import React from 'react';
import { Box, Grid, Typography, Divider, Link, IconButton } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';
import { Instagram, Telegram, LinkedIn, Twitter } from '@mui/icons-material';
import logo from '../assets/Logo/Logo3.svg';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        background: 'linear-gradient(to bottom, #007941 85%, #00A358 100%)',
        color: 'white',
        textAlign: 'center',
        flexDirection: 'column',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 800,
        paddingBottom: '50px',
        marginTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box sx={{ width: '100%', overflow: 'hidden', position: 'absolute', top: '-30px' }}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '60px', width: '100%' }}>
          <path d="M0,10 C150,180 350,-60 500,40 L500,150 L0,150 Z" style={{ fill: '#007941' }} />
        </svg>
      </Box>

      <Grid container justifyContent="center" sx={{ position: 'relative', paddingTop: '60px', px: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h4">وقت یه شروع جدیده :)</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ backgroundColor: '#DADBD8', margin: '20px 0', width: '60%', height: '2px' }} />
        </Grid>

        {/* بخش آدرس و تلفن و لوگو */}
        <Grid item xs={12} md={6} container sx={{ 
          px: { xs: "10px" },
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ 
            textAlign: 'right',
            order: { xs: 2, md: 1 },
            mt: { xs: 2, md: 0 }
          }}>
            <Typography>
              <LocationOn sx={{ marginRight: 1 }} />
              نشانی: دانشگاه علم و صنعت - دپارتمان مهندسی کامپیوتر
            </Typography>
            <Typography sx={{ marginTop: 2, textAlign: "left" }}>
              <Phone sx={{ marginRight: 1 }} /> 021-12345678
            </Typography>
          </Box>
          <Box sx={{ 
            order: { xs: 1, md: 2 },
            mb: { xs: 2, md: 0 },
            mt :{ xs:2}
          }}>
            <img src={logo} alt="Logo" style={{ height: '100px' }} />
            <Typography>جیمباتو</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ backgroundColor: '#DADBD8', margin: '20px 0', width: '60%', height: '2px' }} />
        </Grid>

        {/* بخش لینک‌ها و شبکه‌های اجتماعی */}
        <Grid item xs={12} md={6} container sx={{ 
          px: { xs: "1px" },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            mb: { xs: 0, md: 0 }
          }}>
              <Link
              href="/about_us"
              color="inherit"
              sx={{
                margin: '0 10px',
                my: { xs: 1, sm: 0 },
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  color: '#e0e0e0',
                }
              }}
            >
              درباره ما
            </Link>

              <Link href="/FAQ" color="inherit"
              sx={{
                margin: '0 10px',
                my: { xs: 0, sm: 0 },
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  color: '#e0e0e0',
                }
              }}>سوالات متداول</Link>
              <Link href="/contact_us" color="inherit"
                sx={{
                  margin: '0 10px',
                  my: { xs: 1, sm: 0 },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#ffffff',
                    textDecoration: 'underline',
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    color: '#e0e0e0',
                  }
                }}>ارتباط با ما</Link>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            mt: { xs: 2, md: 0 }
          }}>
            <Typography sx={{ color: '#DADBD8', mr: { md: 1 }, mb: { xs: 1, md: 0 } }}>شبکه‌های اجتماعی</Typography>
            <Box>
                  <IconButton href="#" color="inherit"sx={{
                  transition: 'all 0.2s ease',
                  mx: 0.5,
                  '&:hover': {
                    color: '#ffffff',
                    transform: 'scale(1.2)',
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    color: '#e0e0e0',
                    transform: 'scale(1.1)',
                  },
                }}><Telegram /></IconButton>
              <IconButton href="#" color="inherit" sx={{  transition: 'all 0.2s ease',
                  mx: 0.5,
                  '&:hover': {
                    color: '#ffffff',
                    transform: 'scale(1.2)',
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    color: '#e0e0e0',
                    transform: 'scale(1.1)',
                  },
                 }}><Twitter /></IconButton>
              <IconButton href="#" color="inherit" sx={{  transition: 'all 0.2s ease',
                  mx: 0.5,
                  '&:hover': {
                    color: '#ffffff',
                    transform: 'scale(1.2)',
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    color: '#e0e0e0',
                    transform: 'scale(1.1)',
                  },
                   }}><LinkedIn /></IconButton>
              <IconButton href="#" color="inherit" sx={{  transition: 'all 0.2s ease',
                  mx: 0.5,
                  '&:hover': {
                    color: '#ffffff',
                    transform: 'scale(1.2)',
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    color: '#e0e0e0',
                    transform: 'scale(1.1)',
                  },
                   }}><Instagram /></IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 10 }}>
        <Typography variant="body2" sx={{ color: '#DADBD8' }}>
          کلیه حقوق این سایت متعلق به مجموعه سحابی می‌باشد
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;