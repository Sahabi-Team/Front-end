import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const CompactFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#00994d',
        color: 'white',
        mt: 4,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        py: { xs: 3, md: 2 },
        width: '100%',
        boxShadow: '0px -6px 5px rgba(0,0,0,0.10)',
      }}
    >
      <Container maxWidth="lg">
        {/* Navigation Links */}
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          justifyContent="center"
          alignItems="center"
          sx={{
            mb: { xs: 1, md: 0 },
          }}
        >
          <Grid item xs={6} md="auto">
            <Link href="/" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                fontSize: { xs: '15px', sm: '17px', md: '20px' },
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >صفحه اصلی</Link>
          </Grid>
          <Grid item xs={6} md="auto">
            <Link href="/about_us" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                fontSize: { xs: '15px', sm: '17px', md: '20px' },
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >درباره ما</Link>
          </Grid>
          <Grid item xs={6} md="auto">
            <Link href="/faq" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                fontSize: { xs: '15px', sm: '17px', md: '20px' },
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >سوالات متداول</Link>
          </Grid>
          <Grid item xs={6} md="auto">
            <Link href="/contact_us" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                fontSize: { xs: '15px', sm: '17px', md: '20px' },
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >ارتباط با ما</Link>
          </Grid>
        </Grid>

        {/* Social title - visible only on mobile */}
        <Typography
          variant="body1"
          sx={{
            display: { xs: 'block', md: 'none' }, // Display block on mobile, none on desktop
            textAlign: 'center',
            mb: 1,
            fontWeight: 500,
            fontSize: { xs: 15, sm: 16 }
          }}
        >
          ما را در شبکه های اجتماعی دنبال کنید
        </Typography>

        {/* Social icons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'center', md: 'center' }, // Center on mobile, right-align on desktop
            alignItems: 'center',
            gap: 2,
            mt: 1.5
          }}
        >
          {/* Social title - visible only on desktop */}
          <Typography
            variant="body1"
            sx={{
              display: { xs: 'none', md: 'block' }, // Display none on mobile, block on desktop
              whiteSpace: 'nowrap',
              mr: 1
            }}
          >
            ما را در شبکه های اجتماعی دنبال کنید
          </Typography>
          <a href="https://t.me/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Telegram" style={{ color: 'inherit' }}>
            <IconButton color="inherit"><TelegramIcon /></IconButton>
          </a>
          <a href="https://twitter.com/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Twitter" style={{ color: 'inherit' }}>
            <IconButton color="inherit"><TwitterIcon /></IconButton>
          </a>
          <a href="https://linkedin.com/company/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato LinkedIn" style={{ color: 'inherit' }}>
            <IconButton color="inherit"><LinkedInIcon /></IconButton>
          </a>
          <a href="https://instagram.com/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Instagram" style={{ color: 'inherit' }}>
            <IconButton color="inherit"><InstagramIcon /></IconButton>
          </a>
        </Box>

        {/* Copyright */}
        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ mt: 2, fontSize: { xs: '12px', sm: '13px' } }}
        >
          {'\u00A9'} تمامی حقوق این سایت متعلق به مجموعه سحابی می‌باشد
        </Typography>
      </Container>
    </Box>
  );
};

export default CompactFooter;
