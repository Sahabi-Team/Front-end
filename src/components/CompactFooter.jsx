import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton
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
        marginBottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingY: 3,
        width: '100%',
        boxShadow: '0px -4px 16px rgba(0,0,0,0.10)',
      }}
    >
      <Container maxWidth="lg">
        {/* Responsive row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            marginBottom: 1,
          }}
        >
          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 3,
              justifyContent: { xs: 'center', sm: 'flex-start' },
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            <Link href="/" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >صفحه اصلی</Link>
            <Link href="/about_us" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >درباره ما</Link>
            <Link href="/faq" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >سوالات متداول</Link>
            <Link href="/contact_us" color="inherit" underline="none"
              sx={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 175, 102, 0.08)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }
              }}
            >ارتباط با ما</Link>
          </Box>

          {/* Social Media */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
              ما را در شبکه های اجتماعی دنبال کنید
            </Typography>
            <a href="https://t.me/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Telegram" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit"><TelegramIcon /></IconButton>
            </a>
            <a href="https://twitter.com/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Twitter" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
            </a>
            <a href="https://linkedin.com/company/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato LinkedIn" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit"><LinkedInIcon /></IconButton>
            </a>
            <a href="https://instagram.com/gymbato" target="_blank" rel="noopener noreferrer" aria-label="Gymbato Instagram" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit"><InstagramIcon /></IconButton>
            </a>

          </Box>
        </Box>

        {/* Copyright */}
        <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
          کلیه حقوق این سایت متعلق به مجموعه سحابی می‌باشد
        </Typography>
      </Container>
    </Box>
  );
};

export default CompactFooter;
