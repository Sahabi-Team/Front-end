import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '8px',
  backgroundColor: '#fff',  
}));

const GreenChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#00AF66',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 12,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  padding: '0 8px',
  margin:'2px',
}));

// Helper to convert numbers to Persian format
const toPersianDigits = (num) => {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const normalizePersianDigits = (str) => {
  if (!str) return '';
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

// Function to estimate goal timeline based on workout days and goal
const estimateGoalTimeline = (workoutDays, goal) => {
  workoutDays = normalizePersianDigits(workoutDays); 
  goal = normalizePersianDigits(goal);
  let baseWeeks = 12; // Base for moderate activity
  let weeklyWorkoutFactor = 1; // Factor for adjusting time

  switch (workoutDays) {
    case "۱ الی ۲ روز":
      weeklyWorkoutFactor = 1.5; // Longer time for less frequent workouts
      break;
    case "۳ الی ۴ روز":
      weeklyWorkoutFactor = 1; // Base time
      break;
    case "۵ الی ۶ روز":
      weeklyWorkoutFactor = 0.8; // Shorter time for more frequent workouts
      break;
    default:
      weeklyWorkoutFactor = 1;
  }

  let goalFactor = 1;
  // Adjust goal factor for specific goals (example: "کاهش سایز" might need more time than "افزایش وزن")
  if (goal === "کاهش وزن" || goal === "کاهش سایز") {
    goalFactor = 1.2; // Slightly longer
  } else if (goal === "افزایش وزن" || goal === "افزایش عضله") {
    goalFactor = 1; // No change
  } else if (goal === "افزایش استقامت") {
    goalFactor = 0.9; // Potentially shorter
  }


  const estimatedWeeks = Math.round(baseWeeks * weeklyWorkoutFactor * goalFactor);
  const estimatedDays = estimatedWeeks * 7;

  return {
    weeks: estimatedWeeks,
    days: estimatedDays,
  };
};

const GoalTimelineCard = ({ workoutDays, goal }) => {
  const { weeks, days } = estimateGoalTimeline(workoutDays, goal);

  return (
    <GreenCard>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          زمان رسیدن به هدف :
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <GreenChip label={`${toPersianDigits(weeks)} هفته`} />
        </Box>
        
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {toPersianDigits(days)} روز
        </Typography>
        
        <Typography variant="body2" align="right" sx={{ mt: 2, fontSize: '0.9rem' }}>
          به طور کلی برای رسیدن به هدفی که تعیین کردی به {toPersianDigits(weeks)} هفته نیاز داری ولی با توجه به روند ورزش کردن و شرایط این مقدار میتونه کمی بیشتر یا کمتر بشه.
        </Typography>
      </CardContent>
    </GreenCard>
  );
};

export default GoalTimelineCard;
