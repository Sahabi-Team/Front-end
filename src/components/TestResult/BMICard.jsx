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
  gap: '8px',
  zIndex: 1,
  // marginTop: '-5px',
}));

const BMI_RANGES = [
  { min: 0, max: 18.5, color: '#00BCD4', label: 'کمبود وزن' },
  { min: 18.5, max: 25, color: '#4CAF50', label: 'متناسب' },
  { min: 25, max: 30, color: '#FF9800', label: 'اضافه وزن' },
  { min: 30, max: Infinity, color: '#F44336', label: 'چاقی' },
];

const BMICard = ({ bmiValue, height }) => {
  const getBMIStatus = (bmi) => {
    return BMI_RANGES.find(range => bmi >= range.min && bmi < range.max) || BMI_RANGES[0];
  };

  const calculateRecommendedWeight = (height) => {
    const heightInMeters = height / 100;
    const minWeight = 18.5 * heightInMeters * heightInMeters;
    const maxWeight = 24.9 * heightInMeters * heightInMeters;
    return {
      min: Math.round(minWeight),
      max: Math.round(maxWeight),
    };
  };

  const barRef = React.useRef(null);
  const [barDimensions, setBarDimensions] = React.useState({ width: 0, left: 0 });

  React.useEffect(() => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      setBarDimensions({ width: rect.width, left: rect.left });
    }
  }, []);

  const calculatePosition = (bmi) => {
    const minBMI = 15;
    const maxBMI = 40;
    const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    const percentage = (clampedBMI - minBMI) / (maxBMI - minBMI);

    if (barDimensions.width > 0) {
      const positionInPixels = percentage * barDimensions.width;
      const positionAsPercent = (positionInPixels / barDimensions.width) * 100;
      return positionAsPercent;
    }

    return 0;
  };

  const bmiStatus = getBMIStatus(bmiValue);
  const recommendedWeight = calculateRecommendedWeight(height);
  const arrowPosition = React.useMemo(() => calculatePosition(bmiValue), [bmiValue, barDimensions]);

  return (
    <GreenCard>
      <CardContent>
        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', direction: 'rtl' }}>
            :BMI وضعیت شاخص
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ direction: 'rtl' }}>
            (شاخص توده بدنی)
          </Typography>
        </Box>

        <Box sx={{ px: 2, position: 'relative', mt: 6, mb: 10 }}>
          <Box>
            <Box
              ref={barRef}
              sx={{
                height: '12px',
                borderRadius: '6px',
                display: 'flex',
                overflow: 'hidden',
                marginTop: '32px',
              }}
            >
              <Box sx={{ flex: 1, backgroundColor: '#00BCD4', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#4CAF50', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#FF9800', height: '100%' }} />
              <Box sx={{ flex: 1, backgroundColor: '#F44336', height: '100%' }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'relative',
              px: 1,
              mt: 1,
              direction: 'rtl',
            }}
          >
            <Typography variant="body2" sx={{ color: '#00BCD4', position: 'relative', left: { xs: '10px', sm: '-65px' } }}>
              ۱۸.۵
            </Typography>
            <Typography variant="body2" sx={{ color: '#4CAF50', position: 'relative', left: { xs: '-33px', sm: '-120px' } }}>
              ۲۵.۰
            </Typography>
            <Typography variant="body2" sx={{ color: '#FF9800', position: 'relative', left: { xs: '-75px', sm: '-180px' } }}>
              ۳۰.۰
            </Typography>
            <Typography variant="body2" sx={{ color: '#F44336', position: 'relative', left: { xs: '-125px', sm: '-240px' } }}>
              +۴۰
            </Typography>
          </Box>

          <BMIArrow
            sx={{
              right: `${arrowPosition-4}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <NorthIcon sx={{ color: bmiStatus.color, fontSize: 32 }} />
            <StatusChip
              label={bmiValue.toLocaleString('fa-IR')}
              size="small"
              color="primary"
              sx={{
                backgroundColor: bmiStatus.color,
                padding: '8px 12px',
                fontWeight: 'bold',
              }}
            />
          </BMIArrow>
        </Box>

        <Typography
          variant="body1"
          align="right"
          sx={{
            mt: 4,
            fontWeight: 'bold',
            fontSize: '0.9rem',
            direction: 'rtl',
          }}
        >
          شاخص توده بدنی شما {bmiValue.toLocaleString('fa-IR')} هست و وزن شما در حالت {bmiStatus.label} قرار داره
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <StatusChip
            label={`وزن پیشنهادی : ${recommendedWeight.min.toLocaleString('fa-IR')}-${recommendedWeight.max.toLocaleString('fa-IR')} کیلوگرم`}
            color="primary"
            sx={{
              backgroundColor: '#00AF66',
              padding: '20px 12px',
            }}
          />
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default BMICard;
