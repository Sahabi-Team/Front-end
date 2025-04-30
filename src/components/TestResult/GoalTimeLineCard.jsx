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

const GoalTimelineCard = ({ weeks = 12, days = 90 }) => {
  // Convert numbers to Persian format
  const persianWeeks = weeks.toLocaleString('fa-IR');
  const persianDays = days.toLocaleString('fa-IR');

  return (
    <GreenCard>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          زمان رسیدن به هدف :
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <GreenChip label={`${persianWeeks} هفته`} />
        </Box>
        
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {persianDays} روز
        </Typography>
        
        <Typography variant="body2" align="right" sx={{ mt: 2, fontSize: '0.9rem' }}>
          به طور کلی برای رسیدن به هدفی که تعیین کردی به {weeks.toLocaleString('fa-IR')} هفته نیاز داری ولی با توجه به روند ورزش کردن و شرایط این مقدار میتونه کمی بیشتر یا کمتر بشه.
        </Typography>
      </CardContent>
    </GreenCard>
  );
};

export default GoalTimelineCard;
