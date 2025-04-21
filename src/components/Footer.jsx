import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider, Link, IconButton } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';
import { Instagram, Telegram, LinkedIn, Twitter } from '@mui/icons-material';
import logo from '../assets/Logo/Logo3.svg';

const Footer = () => {
 
  return (
    <Box
      sx={{
        display:'flex',
        background: 'linear-gradient(to bottom, #007941 85%, #00A358 100%)',
        color: 'white',
        textAlign: 'center',
        flexDirection: 'column',
        bottom: 0,
       left: 0,
       right:0,
        width: '100%',
        zIndex: 800,
        paddingBottom: '50px',
        margintop:'auto',
        justifyContent:'center',
        alignItems:'center',
         position: 'relative',
         
      }}
    >
      
        <Box sx={{ width: '100%', overflow: 'hidden', position: 'absolute', top: '-30px' }}>
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '60px', width: '100%' }}>
        <path d="M0,10 C150,180 350,-60 500,40 L500,150 L0,150 Z" style={{ fill: '#007941' }} />
    </svg>
    </Box>
     
      <Grid container justifyContent="center" sx={{ position: 'relative', paddingTop: '60px' , px: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h4">وقت یه شروع جدیده :)</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ backgroundColor: '#DADBD8', margin: '20px 0', width: '60%', height: '2px' }} />
        </Grid>

        <Grid item xs={12} md={6} container justifyContent="space-between" alignItems="center"sx={{ px: { xs: "10px",} }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography>
              <LocationOn sx={{ marginRight: 1 }} />
              نشانی: دانشگاه علم و صنعت - دپارتمان مهندسی کامپیوتر
            </Typography>
            <Typography sx={{ marginTop: 2,textAlign:"left" }}>
              <Phone sx={{ marginRight: 1 }} /> 021-12345678
            </Typography>
          </Box>
          <Box>
            <img src={logo} alt="Logo" style={{ height: '100px' }} />
            <Typography>جیمباتو</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ backgroundColor: '#DADBD8', margin: '20px 0', width: '60%', height: '2px' }} />
        </Grid>

        <Grid item xs={12} md={6} container justifyContent="space-between" alignItems="center"sx={{ px: { xs: "10px",} }}>
          <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>درباره ما</Link>
          <Link href="/FAQ" color="inherit" sx={{ margin: '0 10px' }}>سوالات متداول</Link>
          <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>ارتباط با ما</Link>

          <Grid item xs={12} sm={6} container justifyContent="flex-start" alignItems="center"sx={{ px: { xs: "10px",} }}>
            <Typography sx={{ color: '#DADBD8' }}>شبکه‌های اجتماعی</Typography>
            <IconButton href="#" color="inherit"><Telegram /></IconButton>
            <IconButton href="#" color="inherit"><Twitter /></IconButton>
            <IconButton href="#" color="inherit"><LinkedIn /></IconButton>
            <IconButton href="#" color="inherit"><Instagram /></IconButton>
          </Grid>
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

export default Footer