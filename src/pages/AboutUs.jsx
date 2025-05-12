import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Container
} from '@mui/material';


const teamMembers = [
  'مهدی شرف بیانی',
  'نازنین شریفی',
  'معین خان محمدی',
  'علی کارگر',
  'ایمان قادر',
  'حبیب الله بنیه چی'
];

const TeamPage = () => {
  return (
    <>
      <Box sx={{ bgcolor: 'green', color: 'white', py: 2, textAlign: 'center' }}>
        <Typography variant="h6">درباره ما</Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: -3 }}>
        <Paper elevation={3} sx={{ borderRadius: 3, p: 4 }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            اعضای تیم
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {teamMembers.map((name, index) => (
              <Grid item xs={6} sm={4} md={3} key={index} textAlign="center">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 1,
                    boxShadow: 2
                  }}
                />
                <Typography variant="body1">{name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  عضو تیم {index < 4 ? 'فرانت اند' : 'یک اند'}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box mt={6} sx={{textAlign: 'left' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ما کی هستیم؟
            </Typography>
            <Typography variant="body2" paragraph>
              ما یک تیم از افراد با تجربه‌های بازی‌سازی و علاقه‌مند به تکنولوژی و ورزش هستیم که با یک هدف مشخص کنار هم جمع شده‌ایم...
            </Typography>
            <Typography variant="body2" paragraph>
              در دنیای پر از اطلاعات امروز، پیدا کردن یک برنامه‌ریزی مناسب و مربی قابل اعتماد کار ساده‌ای نیست...
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              هدف ما چیه؟
            </Typography>
            <ul>
              <li><Typography variant="body2">هماهنگی مناسب بین برنامه تمرینی و شرایط فیزیکی برای همه مخاطبان</Typography></li>
              <li><Typography variant="body2">ایجاد فضایی قابل اعتماد و حرفه‌ای برای نمایش عملکرد تیم مربیان و توانایی‌هایشان</Typography></li>
              <li><Typography variant="body2">پیشرفت مداوم با بازخورد کاربران</Typography></li>
            </ul>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default TeamPage;
