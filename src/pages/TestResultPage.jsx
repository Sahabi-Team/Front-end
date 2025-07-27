import React, { useEffect, useState } from 'react';
import { Box, Container, Chip, Stack, Avatar, Typography, CircularProgress, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import BMICard from '../components/TestResult/BMICard';
import BFPCard from '../components/TestResult/BFPCard';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';
import CommunityCard from '../components/TestResult/CommunityCard';
import UserInfoCard from '../components/TestResult/UserInfoCard';
import Navbar from '../components/home/NavbarCard';
import BackGround from '../assets/imgs/Subtract.png';
import subtract from '../assets/imgs/Subtract.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/CompactFooter';
import config from '../config';

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
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        

        // Create axios instance with default headers
        const api = axios.create({
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Fetch test data
        const testResponse = await api.get(`${config.API_BASE_URL}/api/tests/my-tests/`);
        if (testResponse.data && testResponse.data.length > 0) {
          setTestData(testResponse.data[0]);
        } else {
          setError('هیچ تستی یافت نشد');
        }

        // Fetch member count
        const memberResponse = await axios.get(`${config.API_BASE_URL}/api/analytics/total-clients/`);
        setMemberCount(memberResponse.data.total_clients || 0);

        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        if (err.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('access_token');
          navigate('/signin');
        } else {
          setError('خطا در دریافت اطلاعات');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);


if (loading) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6" color="green">
        در حال دریافت اطلاعات...
      </Typography>
    </Box>
  );
}

  if (error |  !testData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        textAlign: 'center',
        background: 'none',
        p: 3
      }}>
        <Navbar></Navbar>
        <Avatar sx={{ bgcolor: '#00AF66', width: 100, height: 100, mb: 1 }}>
          <AssignmentIcon sx={{ fontSize: 50 }} />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          نتیجه تست بدنسازی
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          هیچ تستی یافت نشد
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              bgcolor: '#00AF66',
              '&:hover': { bgcolor: '#008c52' },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            بازگشت به خانه
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/test')}
            sx={{
              borderColor: '#00AF66',
              color: '#00AF66',
              '&:hover': {
                borderColor: '#008c52',
                bgcolor: 'rgba(0, 175, 102, 0.04)'
              },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            تست جدید
          </Button>
        </Stack>
        
      </Box>
    );
  }


  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Calculate Body Fat Percentage (BFP)
  // Using the Deurenberg formula: BFP = 1.2 × BMI + 0.23 × Age - 10.8 × gender - 5.4
  // where gender is 1 for male and 0 for female
  const calculateBFP = (bmi, age, gender) => {
    const genderValue = gender === 'مرد' ? 1 : 0;
    const bfp = (1.2 * bmi) + (0.23 * age) - (10.8 * genderValue) - 5.4;
    return Math.max(0, Math.min(45, bfp.toFixed(1))); // Ensure BFP is between 0 and 100
  };

  // Calculate goal timeline
  const calculateGoalTimeline = (currentWeight, targetWeight) => {
    const weightDifference = Math.abs(currentWeight - targetWeight);
    // Assuming healthy weight loss/gain of 0.5-1 kg per week
    const weeks = Math.max(4, Math.ceil(weightDifference / 0.5)); // Minimum 2 weeks, even if weight difference is 0
    const days = weeks * 7;
    return { weeks, days };
  };

  const bmi = calculateBMI(testData.weight, testData.height);
  const bfp = calculateBFP(bmi, new Date().getFullYear() - new Date(testData.birth_date).getFullYear()-621, 'مرد');
  const { weeks, days } = calculateGoalTimeline(testData.weight, testData.goal_weight);

  // User info data
  const userInfo = {
    gender: testData.gender,
    height: testData.height,
    weight: testData.weight,
    goal_weight: testData.goal_weight,
    birth_date: testData.birth_date,
    workout_days: testData.workout_days,
    equipment: testData.equipment,
    focus_area: testData.focus_area,
    goal: testData.goal,
    diseases: testData.diseases,
    body_form: testData.body_form
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
                mt: 15
              }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 'bold',
                color: '#000',
                mt: 15
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
              <BFPCard bfpValue={bfp} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, border: 'none' }}>
              <BMICard bmiValue={bmi} height={userInfo.height} />
            </Box>
          </Stack>
          
          {/* Goal Timeline*/}
          <GoalTimelineCard weeks={weeks} days={days} />
          
          {/* Community section */}
          <CommunityCard memberCount={memberCount} />

          {/* Coach List Button */}
          <Link to="/trainers" style={{ textDecoration: 'none' }}>
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
          </Link>
        </Container>
      </Box>
      <Footer/>
    </BackgroundPattern>
  );
};

export default TestResultPage;