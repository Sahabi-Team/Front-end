import React, { useState, useEffect } from 'react';
import { Box, Container, Chip, Stack, Avatar, Typography, Button } from '@mui/material';
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

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00AF66',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 24,
  padding: '10px 30px',
  '&:hover': {
    backgroundColor: '#008c52',
  },
}));

function BackgroundPattern({ imageUrl, children, repeatDirection = "repeat-y" }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "130vh",
        marginLeft: "calc(-50vw + 50%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 10,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

const TestResultPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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

  const handleLogin = () => {
    // Here you would typically handle authentication
    // For now, we'll just set the state to simulate login
    setIsAuthenticated(true);
  };
  
  return (
    <BackgroundPattern imageUrl={subtract} repeatDirection="repeat-y">
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000 }}/>
        
        {/* This is the content that will be blurred */}
        <Container maxWidth="md" sx={{ 
          filter: isAuthenticated ? 'none' : 'blur(8px)',
          pointerEvents: isAuthenticated ? 'auto' : 'none',
          userSelect: isAuthenticated ? 'auto' : 'none',
          transition: 'filter 0.3s ease-in-out'
        }}>
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
              mr: -2,
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
        
        {/* Login Overlay - shown when not authenticated */}
        {!isAuthenticated && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(4px)',
              minHeight: '100vh',
            }}
          >
            <Box
              sx={{
                maxWidth: 400,
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: '#00AF66',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                برای مشاهده نتیجه تست وارد شوید
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                برای دسترسی به نتیجه تست بدنسازی خود لطفا وارد حساب کاربری شوید
              </Typography>
              <GreenButton
                fullWidth
                variant="contained"
                onClick={handleLogin}
              >
                ورود
              </GreenButton>
            </Box>
          </Box>
        )}
      </Box>
    </BackgroundPattern>
  );
};

export default TestResultPage;