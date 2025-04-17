import React from 'react';
import { Box, Container, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import BMICard from './components/BMICard';
import BFPCard from './components/BFPCard';
import GoalTimelineCard from './components/GoalTimelineCard';
import CommunityCard from './components/CommunityCard';
import UserInfoCard from './components/UserInfoCard';


import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import BMICard from '../components/TestResult/BMICard';

const TestResultPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BMICard bmiValue={21.5} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TestResultPage;

