import React from 'react';
import { Box, Container, Chip, Stack, Avatar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import BMICard from '../components/TestResult/BMICard';
import BFPCard from '../components/TestResult/BFPCard';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';
import CommunityCard from '../components/TestResult/CommunityCard';
import UserInfoCard from '../components/TestResult/UserInfoCard';
import Navbar from '../components/home/NavbarCard';
import BackGround from '../assets/imgs/green_background.svg';
import subtract from '../assets/imgs/Subtract.png';

const GreenChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#00AF66',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 16,
  padding: '0 8px',
}));

// Similar to FullWidthRepeatingBackground from your first code
function BackgroundPattern({ imageUrl, children, repeatDirection = "repeat-y" }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "130vh",
        marginLeft: "calc(-50vw + 50%)", // Correction for centering layout
        overflow: "hidden",
      }}
    >
      {/* Background layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 10,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageUrl})`,
          // backgroundRepeat: repeatDirection,
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

const TestResultPage = () => {
  // User info data
  const userInfo = {
    gender: 'مرد',
    height: 178,
    weight: 76,
    targetWeight: 80,
    age: 30,
    availableTime: '۳-۵ روز در هفته',
    trainingLocation: 'باشگاه',
    targetMuscles: 'جلو بازو-پشت بازو- سینه',
    fitnessGoal: 'تناسب اندام - کاهش وزن',
    medicalConditions: 'تنگی نفس - کف پای صاف'
  };
  
  return (
    <BackgroundPattern imageUrl={subtract} repeatDirection="repeat-y">
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000 }}/> 
        <Container maxWidth="md">
          <Box sx={{ 
            mb: 3,
            p: 2,
            textAlign: 'center',
            border: 'none'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              border: 'none'
            }}>
              <Avatar sx={{ 
                bgcolor: '#00AF66',
                mr: 1,
                mt: 10

              }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 'bold',
                color: '#000',
                mt: 10
              }}>
                نتیجه تست بدنسازی
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ 
              mt: 1,  
              textAlign: 'center'
            }}>
              کلیاتی که لازمه بدونی رو میتونی این زیر ببینی
            </Typography>
          </Box>
                
          {/* Test Results */}
          <UserInfoCard userInfo={userInfo} />

          {/* BMI and BFP section */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2} 
            sx={{ mb: 2, border: 'none' }}
          >
            <Box sx={{ width: { xs: '100%', md: '50%' }, border: 'none' }}>
              <BFPCard bfpValue={30} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, border: 'none' }}>
              <BMICard bmiValue={10} />
            </Box>
          </Stack>
          
          {/* Goal Timeline*/}
          <GoalTimelineCard weeks={12} days={90} />
          
          {/* Community section */}
          <CommunityCard memberCount={11210} />

          {/* Coach List Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5, border: 'none' }}>
            <GreenChip 
              label="لیست مربی ها" 
              sx={{ 
                py: 2, 
                px: 4, 
                fontSize: '1rem',
                padding: '20px 20px',
                '&:hover': {
                  backgroundColor: '#008c52',
                  cursor: 'pointer'
                } 
              }} 
            />
          </Box>
        </Container>
      </Box>
    </BackgroundPattern>
  );
};

export default TestResultPage;