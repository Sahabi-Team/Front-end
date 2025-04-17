import React from 'react';
import { Box, Card, CardContent, Typography, Slider, Chip } from '@mui/material';
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
  borderRadius: 16,
  padding: '0 8px',
}));

const BMICard = ({ bmiValue = 21.5 }) => {
  return (
    <GreenCard>
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          وضعیت شاخص BMI:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          (شاخص توده بدنی)
        </Typography>
        
        <Box sx={{ px: 2 }}>
          <Slider
            value={bmiValue}
            min={18.5}
            max={30}
            step={0.1}
            disabled
            sx={{
              '& .MuiSlider-rail': {
                background: 'linear-gradient(90deg, #1DB954 0%, #FFEB3B 50%, #FF5722 100%)',
                height: 8,
              },
              '& .MuiSlider-thumb': {
                backgroundColor: '#00AF66',
                width: 16,
                height: 16,
              }
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mt: 1 }}>
          <Typography variant="caption">۳۰.۰</Typography>
          <Typography variant="caption">۲۴.۰</Typography>
          <Typography variant="caption">۱۸.۵</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <GreenChip label="طبیعی" />
        </Box>
        
        <Typography variant="body1" align="center" sx={{ mt: 2, fontWeight: 'bold', fontSize: '0.9rem' }}>
          شاخص توده بدنی شما ۲۱.۵ هست و وزن شما در حالت نرمال قرار داره
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <GreenChip label="وزن پیشنهادی : ۷۰-۸۳ کیلوگرم" />
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default BMICard;
