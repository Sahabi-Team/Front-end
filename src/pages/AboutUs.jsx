import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Container
} from '@mui/material';
import Navbar from "../components/home/NavbarCard";
import Footer from '../components/Footer';

const teamMembers = [
  'مهدی شرف بیانی',
  'نازنین شریفی',
  'معین خان محمدی',
  'علی کارگر',
  'ایمان قادر',
  'حبیب الله پنبه چی'
];

const TeamPage = () => {
  return (
    <>
    <Navbar/>
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
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', letterSpacing: 1 }}>
          درباره ما
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 10 }}>
        <Paper elevation={10} sx={{ borderRadius: 5, p: 6 }}>
        <Box sx={{textAlign: 'left' ,mb:3}}>
          <Typography variant="h5" fontWeight="bold" mb={4}  sx={{mb:3,display:'inline-block',borderBottom: '4px solid #4CAF50'}}>
            اعضای تیم
          </Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {teamMembers.slice(0, 4).map((name, index) => (
              <Grid item xs={6} sm={3} md={3} key={index} textAlign="center">
                <Box
                  sx={{
                    display: 'inline-block',
                    borderRadius: '50%',
                    boxShadow: '0 0 12px 0 #00af6644',
                    p: .5,
                    background: '#fff',
                    marginBottom: 1.5,
                  }}
                >
                  <Avatar
                    src={index === 2 ? '/moein.jpg' : 
                         index === 3 ? '/ali.jpg' : 
                         index === 1 ? '/nazanin.jpg' : 
                         '/mahdi.jpg'}
                    sx={{
                      width: 110,
                      height: 110,
                      mx: 'auto',
                      mb: 0,
                      bgcolor: '#f5f5f5',
                    }}
                  />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>{name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  عضو تیم {index < 4 ? 'فرانت اند' : 'بک اند'}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 1 }}>
            {teamMembers.slice(4).map((name, index) => (
              <Grid item xs={6} sm={3} md={3} key={index + 4} textAlign="center">
                <Box
                  sx={{
                    display: 'inline-block',
                    borderRadius: '50%',
                    boxShadow: '0 0 12px 0 #00af6644',
                    p: 0.5,
                    background: '#fff',
                    marginBottom: 1.5,
                  }}
                >
                  <Avatar
                    src={index === 0 ? '/iman.jpg' : 
                      '/habib.jpg' 
                      }
                    sx={{
                      width: 110,
                      height: 110,
                      mx: 'auto',
                      mb: 0,
                      bgcolor: '#f5f5f5',
                    }}
                  />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>{name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  عضو تیم بک اند
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box my={8}  sx={{ textAlign: 'left' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 ,display:'inline-block',borderBottom: '4px solid #4CAF50'}}>
                ما کی هستیم؟
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.25 }} >
                ما یک تیم ۶ نفره‌ از جوان‌های پرانرژی و عاشق تکنولوژی و ورزش هستیم که با یک هدف مشخص کنار هم جمع شدیم: ساده‌تر کردن مسیر رسیدن به تناسب اندام برای همه.
                </Typography>

                <Typography variant="body1" sx={{ mb:1.25 }} >
                 در دنیای پر از اطلاعات امروز، پیدا کردن برنامه تمرینی مناسب و مربی قابل اعتماد کار ساده‌ای نیست. ما این مشکل رو از نزدیک حس کردیم برای همین تصمیم گرفتیم 
                </Typography>
                <Typography variant="body1" sx={{ mb:1.25 }} >
                پلتفرمی بسازیم که شما بتونید به‌راحتی ثبت‌نام کنید، مربی مورد علاقه‌تون رو انتخاب کنید و برنامه تمرینی اختصاصی خودتون رو دریافت کنید .
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.25 }} >
                توی تیم ما، تخصص‌های مختلف کنار هم قرار گرفتن: از طراحی رابط کاربری و توسعه وب گرفته تا برنامه‌نویسی بک‌اند و مدیریت محتوا. همه‌مون با انگیزه‌ هستیم که تجربه‌ای
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.25 }} >
                راحت، کاربردی و الهام‌بخش رو برای شما بسازیم .
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.25 }} >
                ما به بازخوردهای شما گوش می‌دیم، دائم در حال بهبود و توسعه هستیم و باور داریم که این تازه شروع کارمونه.
                </Typography>
            </Box>

            <Box my={8} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 ,display:'inline-block',borderBottom: '4px solid #4CAF50'}}>
                هدف ما چیه؟
                </Typography>
                    <ul style={{ marginRight:8 }}>
                        <li>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <Box component="span" fontWeight="bold">ساده‌سازی دسترسی به مربیان حرفه‌ای</Box> برای همه، صرف‌نظر از موقعیت جغرافیایی.
                        </Typography>
                        </li>
                        <li>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <Box component="span" fontWeight="bold">ارائه برنامه‌های تمرینی کاملاً شخصی‌سازی‌شده</Box> بر اساس نیازهای فردی.
                        </Typography>
                        </li>
                        <li>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <Box component="span" fontWeight="bold">ایجاد فضایی قابل اعتماد و حرفه‌ای</Box> برای تعامل مستقیم بین مربیان و ورزش‌دوستان.
                        </Typography>
                        </li>
                        <li>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <Box component="span" fontWeight="bold">پیشرفت مداوم پلتفرم</Box> با استفاده از بازخورد کاربران و فناوری‌های روز.
                        </Typography>
                        </li>
                    </ul>
          </Box>
        </Paper>
      </Container>
      <Footer/>
    </>
  );
};

export default TeamPage;
