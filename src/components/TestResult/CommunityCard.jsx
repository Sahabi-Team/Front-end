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
  padding: '0 8px',
  fontSize: '1rem',
}));

const CommunityCard = ({ memberCount = 11210 }) => {
  return (
    <GreenCard>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold',textShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
          تو تنها نیستی!
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <GreenChip label={memberCount.toLocaleString('fa-IR') }  sx={{margin:'0px 8px'}}/>
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
             نفر دیگه قبلا از جیمباتو برنامه گرفتن و تونستن به تناسب اندام برسن
          </Typography>
        </Box>
        
        <Typography variant="body2" align="center" sx={{ mt: 2 ,fontWeight:'bold'}}>
          وقتشه باهم شروع کنیم :)
        </Typography>
      </CardContent>
    </GreenCard>
  );
};

export default CommunityCard;