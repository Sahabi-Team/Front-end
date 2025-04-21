import React, { useState, useEffect } from 'react';
import { Box, Container, Chip, Stack, Avatar, Typography, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLatestTest } from '../services/testService';
import BMICard from '../components/TestResult/BMICard';
import BFPCard from '../components/TestResult/BFPCard';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';
import CommunityCard from '../components/TestResult/CommunityCard';
import UserInfoCard from '../components/TestResult/UserInfoCard';
import Navbar from '../components/home/NavbarCard';
import subtract from '../assets/imgs/Subtract.png';

// Helper function to calculate BMI
const calculateBMI = (weight, height) => {
  // Convert height from cm to m
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Helper function to calculate BFP (Body Fat Percentage)
const calculateBFP = (bmi, age, gender) => {
  // This is a simplified calculation - you might want to use a more accurate formula
  const baseBFP = (1.20 * bmi) + (0.23 * age) - (10.8 * (gender === 'male' ? 1 : 0)) - 5.4;
  return Math.max(0, Math.min(100, baseBFP)).toFixed(1);
};

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
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      const fetchTestData = async () => {
        try {
          const data = await getLatestTest();
          if (data && data.length > 0) {
            const latestTest = data[0];
            // Calculate BMI and BFP
            const bmi = calculateBMI(latestTest.weight, latestTest.height);
            const bfp = calculateBFP(bmi, 25, 'male'); // Assuming male for now, you might want to get gender from user data
            
            setTestData({
              ...latestTest,
              bmi,
              bfp
            });
          }
        } catch (error) {
          setError('خطا در دریافت اطلاعات');
          console.error('Error fetching test data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTestData();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleLoginClick = () => {
    navigate('/signin', { state: { from: '/test_result' } });
  };

  if (loading || authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>در حال بارگذاری...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <BackgroundPattern imageUrl={subtract} repeatDirection="repeat-y">
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000 }}/>
        
        <Container maxWidth="md" sx={{ 
          filter: user ? 'none' : 'blur(8px)',
          pointerEvents: user ? 'auto' : 'none',
          userSelect: user ? 'auto' : 'none',
          transition: 'filter 0.3s ease-in-out',
          padding: '24px'
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
          {testData && (
            <>
              <UserInfoCard userInfo={testData} />

              {/* BMI and BFP section */}
              <Stack 
                direction={{ xs: 'column', md: 'row' }} 
                spacing={2} 
                sx={{ mb: 2, border: 'none' }}
              >
                <Box sx={{ width: { xs: '100%', md: '50%' }, border: 'none' }}>
                  <BFPCard bfpValue={testData.bfp} />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, border: 'none' }}>
                  <BMICard bmiValue={testData.bmi} />
                </Box>
              </Stack>
              
              {/* Goal Timeline*/}
              <GoalTimelineCard weeks={12} days={90} />
              
              {/* Community section */}
              <CommunityCard memberCount={11210} />
            </>
          )}

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

        {/* Login Overlay */}
        {!user && (
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
                onClick={handleLoginClick}
              >
                ورود به حساب کاربری
              </GreenButton>
            </Box>
          </Box>
        )}
      </Box>
    </BackgroundPattern>
  );
};

export default TestResultPage;