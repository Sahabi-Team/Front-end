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
        marginTop: '10px', 
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingY: 4,
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
            marginBottom: 3,
          }}
        >
          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: { xs: 'center', sm: 'flex-start' },
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            <Link href="#" color="inherit" underline="none">صفحه اصلی</Link>
            <Link href="#" color="inherit" underline="none">درباره ما</Link>
            <Link href="#" color="inherit" underline="none">سوالات متداول</Link>
            <Link href="#" color="inherit" underline="none">ارتباط با ما</Link>
          </Box>

          {/* Social Media */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
              ما را در شبکه های اجتماعی دنبال کنید
            </Typography>
            <IconButton color="inherit"><TelegramIcon /></IconButton>
            <IconButton color="inherit"><TwitterIcon /></IconButton>
            <IconButton color="inherit"><LinkedInIcon /></IconButton>
            <IconButton color="inherit"><InstagramIcon /></IconButton>
          </Box>
        </Box>

        {/* Copyright */}
        <Typography variant="caption" align="center" display="block">
          کلیه حقوق این سایت متعلق به مجموعه سحابی می‌باشد
        </Typography>
      </Container>
    </Box>
  );
};

export default CompactFooter;
