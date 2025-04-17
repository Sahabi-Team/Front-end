import React from 'react';
import { Box, Container, Chip, Stack,Avatar,Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import BMICard from '../components/TestResult/BMICard';
import BFPCard from '../components/TestResult/BFPCard';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';
import CommunityCard from '../components/TestResult/CommunityCard';
import UserInfoCard from '../components/TestResult/UserInfoCard';
import Navbar from '../components/home/NavbarCard';

const GreenChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#00AF66',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 16,
  padding: '0 8px',
}));

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
      <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh', py: 4 }}>
      <Navbar sx={{position: '',top:0,left:0,right:0,zIndex:1000}}/> 
      <Container maxWidth="md">
        {/* Added Persian text at the top */}
        
      <Box sx={{ 
        mb: 3,
        p: 2,
        textAlign: 'center'  // Center all content
      }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',  // Center horizontally
            mb: 1  // Margin bottom for the title row
          }}>
            <Avatar sx={{ 
              bgcolor: '#00AF66',  // Green color
              mr: 1  // Margin right to separate from text
            }}>
              <AssignmentIcon />
            </Avatar>
            <Typography variant="h4" component="div" sx={{ 
              fontWeight: 'bold',
              color: '#000'
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

        {/* BMI and BFP section - Replaced Grid with Stack */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <BFPCard bfpValue={15.3} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <BMICard bmiValue={21.5} />
          </Box>
        </Stack>
        
        {/* Goal Timeline */}
        <GoalTimelineCard weeks={12} days={90} />
        
        {/* Community section */}
        <CommunityCard memberCount={11210} />

        
        {/* Coach List Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5 }}>
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
  );
};

export default TestResultPage;