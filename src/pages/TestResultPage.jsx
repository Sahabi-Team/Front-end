// src/pages/TestResultPage.jsx
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import GoalTimelineCard from '../components/TestResult/GoalTimeLineCard';

const TestResultPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <GoalTimelineCard 
              weeks={12}
              days={90}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TestResultPage;