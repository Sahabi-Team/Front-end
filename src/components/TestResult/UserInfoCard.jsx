import React from 'react';
import { Box, Card, CardContent, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px auto',
  padding: '8px',
  backgroundColor: '#fff',
  direction: 'rtl',
  maxWidth: '800px',
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '6px',
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
  const defaultUserInfo = {
    gender: 'مرد',
    height: 178,
    weight: 76,
    targetWeight: 80,
    age: 30,
    availableTime: '۳-۵ روز در هفته',
    trainingLocation: 'باشگاه',
    targetMuscles: 'جلو بازو-پشت بازو- سینه',
    fitnessGoal: 'تناسب اندام - کاهش وزن',
    medicalConditions: 'تنگی نفس - کف پای صاف'
  };

  const info = { ...defaultUserInfo, ...userInfo };

  return (
    <GreenCard>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'left' }}>
          : اطلاعات اولیه
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 0,
            '& > div': { flex: 1 },
            gap: 2
          }}>
            <InfoRow>
                <InfoValue>{info.age}</InfoValue>
                <InfoLabel>: سن</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>{info.weight}</InfoValue>
              <InfoLabel>: وزن</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>{info.height}</InfoValue>
              <InfoLabel>: قد</InfoLabel>
            </InfoRow>

          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 0,
            '& > div': { flex: 1 },
            gap: 2
          }}>
            <InfoRow>
            <InfoValue>{info.trainingLocation}</InfoValue>
            <InfoLabel>:مکان تمرین</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>{info.targetWeight}</InfoValue>
              <InfoLabel>: وزن هدف</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoValue>{info.availableTime}</InfoValue>
              <InfoLabel>: وقت موجود</InfoLabel>
            </InfoRow>
          </Box>


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
