import React from 'react';
import { Box, Card, CardContent, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '8px',
  backgroundColor: '#fff',
  direction: 'rtl'
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '6px',
  width: '100%',
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'right',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  color: '#000',
  textAlign: 'right',
}));

const UserInfoCard = ({ userInfo }) => {
  const info = userInfo || {};

  return (
    <GreenCard>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'left' }}>
          : اطلاعات اولیه
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* First Row - Age, Weight, Height */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            '& > div': { 
              flex: 1,
              width: { xs: '100%', sm: '33.33%' }
            }
          }}>
            <InfoRow>
              <InfoValue>سال </InfoValue>
              <InfoValue>{info.age.toLocaleString('fa-IR')}</InfoValue>
              <InfoLabel>: سن</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>کیلوگرم </InfoValue>
              <InfoValue>{info.weight.toLocaleString('fa-IR')} </InfoValue>
              <InfoLabel>: وزن</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>سانتی متر </InfoValue>
              <InfoValue>{info.height.toLocaleString('fa-IR')}  </InfoValue>
              <InfoLabel>: قد</InfoLabel>
            </InfoRow>
          </Box>

          {/* Second Row - Training Location, Target Weight, Available Time */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            '& > div': { 
              flex: 1,
              width: { xs: '100%', sm: '33.33%' }
            }
          }}>
            <InfoRow>
              <InfoValue>{info.trainingLocation}</InfoValue>
              <InfoLabel>:وسیله تمرین</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>کیلوگرم </InfoValue>
              <InfoValue>{info.targetWeight.toLocaleString('fa-IR')} </InfoValue>
              <InfoLabel>: وزن هدف</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>{info.availableTime.toLocaleString('fa-IR')}</InfoValue>
              <InfoLabel>: وقت موجود</InfoLabel>
            </InfoRow>
          </Box>

          {/* Single Row Items */}
          <InfoRow>
            <InfoValue>{info.targetMuscles}</InfoValue>
            <InfoLabel>:عضلات هدف</InfoLabel>
          </InfoRow>

          <InfoRow>
            <InfoValue>{info.fitnessGoal}</InfoValue>
            <InfoLabel>:هدف از ورزش</InfoLabel>
          </InfoRow>

          <InfoRow>
            <InfoValue>{info.medicalConditions}</InfoValue>
            <InfoLabel>:بیماری ها</InfoLabel>
          </InfoRow>
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default UserInfoCard;
