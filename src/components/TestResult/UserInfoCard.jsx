import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  direction: 'rtl',
}));

const UserInfoCard = ({ userInfo }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* User Basic Info */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {userInfo.trainee_username}
            </Typography>
            <Chip 
              label={`تاریخ تست: ${formatDate(userInfo.created_at)}`} 
              color="primary" 
              sx={{ backgroundColor: '#00AF66' }}
            />
          </Box>

          {/* Physical Info */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              label={`وزن فعلی: ${userInfo.weight} کیلوگرم`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
            <Chip 
              label={`قد: ${userInfo.height} سانتی‌متر`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
            <Chip 
              label={`وزن هدف: ${userInfo.goal_weight} کیلوگرم`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
          </Box>

          {/* Goal and Equipment */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              label={`هدف: ${userInfo.goal}`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
            <Chip 
              label={`تجهیزات: ${userInfo.equipment}`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
            <Chip 
              label={`روزهای تمرین: ${userInfo.workout_days}`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
          </Box>

          {/* Additional Info */}
          {userInfo.diseases && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                بیماری‌ها: {userInfo.diseases}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              label={`ناحیه تمرکز: ${userInfo.focus_area}`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
            <Chip 
              label={`سطح آمادگی جسمانی: ${userInfo.fitness_level}/10`} 
              variant="outlined" 
              sx={{ borderColor: '#00AF66', color: '#00AF66' }}
            />
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default UserInfoCard;
