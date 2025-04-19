import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import NorthIcon from '@mui/icons-material/North';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '8px',
  backgroundColor: '#fff',
  direction: 'rtl',
}));

const StatusChip = styled(Chip)(({ color }) => ({
  backgroundColor: color || '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 16,
  padding: '0 8px',
  direction: 'rtl',
}));

const BMIArrow = styled(Box)(({ left }) => ({
  position: 'absolute',
  left: `${left}%`,
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px', // Increased gap for more spacing
  zIndex: 1,
  marginTop: '-24px', // 
  direction: 'rtl', // Pull up arrow for better spacing from scale
}));

// BMI ranges and their corresponding colors and labels
const BMI_RANGES = [
  { min: 0, max: 18.5, color: '#00BCD4', label: 'کمبود وزن' },
  { min: 18.5, max: 25, color: '#4CAF50', label: 'متناسب' },
  { min: 25, max: 30, color: '#FF9800', label: 'اضافه وزن' },
  { min: 30, max: Infinity, color: '#F44336', label: 'چاقی' },
];

const BMICard = ({ bmiValue = 21.5, weight = 76, recommendedWeight = { min: 70, max: 83 } }) => {
  // Get BMI status based on value
  const getBMIStatus = (bmi) => {
    return BMI_RANGES.find(range => bmi >= range.min && bmi < range.max) || BMI_RANGES[0];
  };

  // Calculate position percentage for the arrow
  const calculatePosition = (bmi) => {
    const minBMI = 15; // Starting point for visualization
    const maxBMI = 35; // Maximum BMI value for visualization
    const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  const bmiStatus = getBMIStatus(bmiValue);
  const arrowPosition = calculatePosition(bmiValue);

  return (
    <GreenCard >
      <CardContent>
        {/* Right-aligned header */}
        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', direction: 'rtl' }}>
            :BMI وضعیت شاخص
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ direction: 'rtl' }}>
            (شاخص توده بدنی)
          </Typography>
        </Box>
        
        {/* BMI Scale with Arrow */}
        <Box sx={{ px: 2, position: 'relative', mt: 6, mb: 10 }}> {/* Increased margin for better spacing */}
          
          {/* Fixed color sections */}
          <Box>
            <Box sx={{ 
              height: '12px',
              borderRadius: '6px',
              display: 'flex',
              overflow: 'hidden',
              marginTop: '32px' // Add space between arrow and scale
            }}>
              {/* Colors from right to left: cyan, green, orange, red */}
              <Box sx={{ flex: 1, backgroundColor: '#00BCD4', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#4CAF50', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#FF9800', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#F44336', height: '100%' }} />
            </Box>
          </Box>
          
          {/* Scale Values - Left to Right */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'relative', 
            px: 1, 
            mt: 1,
            direction: 'rtl' // Explicitly set LTR direction for numbers
          }}>
            <Typography variant="body2" sx={{ color: '#00BCD4' ,position:'relative',left:'-65px'}}>
              ۱۸.۵
            </Typography>
            <Typography variant="body2" sx={{ color: '#4CAF50' ,position:'relative',left:'-120px'}}>
              ۲۵.۰
            </Typography>
            <Typography variant="body2" sx={{ color: '#FF9800' ,position:'relative',left:'-180px'}}>
              ۳۰.۰
            </Typography>
            <Typography variant="body2" sx={{ color: '#F44336' ,position:'relative',left:'-240px'}}>
              +۴۰
            </Typography>
          </Box>

          {/* Arrow and Status */}
          <BMIArrow right={arrowPosition}>
            <NorthIcon sx={{ color: bmiStatus.color, fontSize: 32 }} />
              <StatusChip 
                label={bmiValue.toLocaleString('fa-IR')} // Show the number instead of just the label
                size="small" 
                color="primary"
                sx={{ 
                  backgroundColor: bmiStatus.color, 
                  padding: '8px 12px',
                  fontWeight: 'bold'
                }} 
                />
          </BMIArrow>
        </Box>
        {/* Status Text - RTL with fixed format */}
        <Typography 
          variant="body1" 
          align="right" 
          sx={{ 
            mt: 4, 
            fontWeight: 'bold', 
            fontSize: '0.9rem',
            direction: 'rtl' 
          }}
        >
          شاخص توده بدنی شما {bmiValue.toLocaleString('fa-IR')} هست و وزن شما در حالت {bmiStatus.label} قرار داره 
        </Typography>
        
        {/* Recommended Weight Chip */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <StatusChip 
            label={`وزن پیشنهادی : ${recommendedWeight.min.toLocaleString('fa-IR')}-${recommendedWeight.max.toLocaleString('fa-IR')} کیلوگرم`}
            color="primary"
            sx={{ 
              backgroundColor:'#00AF66',
              padding: '20px 12px' 
            }} 
          />
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default BMICard;