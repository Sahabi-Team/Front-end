// src/pages/TestResultPage.jsx
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';
import CommunityCard from '../components/TestResult/CommunityCard';
import UserInfoCard from '../components/TestResult/UserInfoCard';

const TestResultPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserInfoCard 
              userInfo={{
                gender: 'مرد',
                height: '۱۷۸ ',
                weight: '۷۶ ',
                targetWeight: '۸۰',
                age: '۳۰ سال',
                availableTime: '۳-۵ ',
                trainingLocation: 'باشگاه',
                targetMuscles: 'جلو بازو-پشت بازو- سینه',
                fitnessGoal: 'تناسب اندام - کاهش وزن',
                medicalConditions: 'تنگی نفس - کف پای صاف'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommunityCard 
              memberCount={299}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TestResultPage;