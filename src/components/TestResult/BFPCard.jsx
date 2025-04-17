import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '8px',
  backgroundColor: '#fff',
}));

// Custom Gauge component for BFP visualization
const GaugeChart = ({ value }) => {
  // Calculate the rotation angle based on the value (0-40 range)
  const rotation = (value / 40) * 180 - 90;
  
  return (
    <Box sx={{ position: 'relative', width: '100%', height: 120, mt: 2 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '50%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(90deg, #1DB954 0%, #FFEB3B 50%, #FF5722 100%)',
            height: '200%',
            width: '100%',
            borderRadius: '50%',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 60,
            width: 4,
            backgroundColor: '#000',
            transformOrigin: 'bottom',
            transform: `rotate(${rotation}deg)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: '#000',
              borderRadius: '50%',
              top: 0,
              left: -3,
            },
          }}
        />
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

const BFPCard = ({ bfpValue = 15.3 }) => {
  return (
    <GreenCard>
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          وضعیت شاخص BFP :
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          (درصد چربی بدن)
        </Typography>
        
        <GaugeChart value={bfpValue} />
        
        <Typography variant="body1" align="center" sx={{ mt: 2, fontWeight: 'bold', fontSize: '0.9rem' }}>
          میزان چربی بدنت بین ۱۴-۱۶ درصده و نرماله
        </Typography>
        
        <Typography variant="body2" align="center" sx={{ mt: 1, fontSize: '0.8rem' }}>
          با ورزش کردن و برنامه ورزشی و غذایی اصولی میتونی سلامتت رو بیشتر کنی و تناسب اندام بهتری داشته باشی
        </Typography>
      </CardContent>
    </GreenCard>
  );
};

export default BFPCard;
