import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import male1 from '../../assets/imgs/body_shapes/male/Select Field 1.svg';
import male2 from '../../assets/imgs/body_shapes/male/Select Field 2.svg';
import male3 from '../../assets/imgs/body_shapes/male/Select Field 3.svg';
import male4 from '../../assets/imgs/body_shapes/male/Select Field 4.svg';
import male5 from '../../assets/imgs/body_shapes/male/Select Field 5.svg';
import male6 from '../../assets/imgs/body_shapes/male/Select Field 6.svg';

import female1 from '../../assets/imgs/body_shapes/female/Select Field 1.svg';
import female2 from '../../assets/imgs/body_shapes/female/Select Field 2.svg';
import female3 from '../../assets/imgs/body_shapes/female/Select Field 3.svg';
import female4 from '../../assets/imgs/body_shapes/female/Select Field 4.svg';
import female5 from '../../assets/imgs/body_shapes/female/Select Field 5.svg';
import female6 from '../../assets/imgs/body_shapes/female/Select Field 6.svg';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '16px',
  backgroundColor: '#fff',
  direction: 'rtl', // Changed to right-to-left for Persian alignment
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
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

const toPersianDigits = (num) => {
  return num.toString().replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);
};

const UserInfoCard = ({ userInfo }) => {
  const info = userInfo || {};

  const maleImages = [male1, male2, male3, male4, male5, male6];
  const femaleImages = [female1, female2, female3, female4, female5, female6];

  const selectedImages = info.gender === 'male' ? maleImages : femaleImages;
  const bodyFormImage = selectedImages[info.body_form - 1];

  return (
    <GreenCard>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-start',
            gap: 3,
          }}
        >
          {/* Left Side: Body Form Image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={bodyFormImage}
              alt="فرم بدن"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Right Side: Information */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'right' }}>
              اطلاعات اولیه
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* First Row - Age, Weight, Height */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                gap: 2,
                '& > div': { flex: 1 }
              }}>
                <InfoRow>
                  <InfoLabel>: سن</InfoLabel>
                  <InfoValue>{info.age ? toPersianDigits(info.age) : '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: وزن</InfoLabel>
                  <InfoValue>{info.weight ? toPersianDigits(info.weight) : '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: قد</InfoLabel>
                  <InfoValue>{info.height ? toPersianDigits(info.height) : '-'}</InfoValue>
                </InfoRow>
              </Box>

              {/* Second Row - Training Location, Target Weight, Available Time */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                gap: 2,
                '& > div': { flex: 1 }
              }}>
                <InfoRow>
                  <InfoLabel>: وسیله تمرین</InfoLabel>
                  <InfoValue>{info.equipment || '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: وزن هدف</InfoLabel>
                  <InfoValue>{info.goal_weight ? toPersianDigits(info.goal_weight) : '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: زمان هفتگی</InfoLabel>
                  <InfoValue>{info.workout_days || '-'}</InfoValue>
                </InfoRow>
              </Box>

              {/* Third Row - Target Muscles, Goal, Diseases */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                gap: 2,
                '& > div': { flex: 1 }
              }}>
                <InfoRow>
                  <InfoLabel>: عضلات هدف</InfoLabel>
                  <InfoValue>{info.focus_area || '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: هدف از ورزش</InfoLabel>
                  <InfoValue>{info.goal || '-'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>: بیماری‌ها</InfoLabel>
                  <InfoValue>{info.diseases || '-'}</InfoValue>
                </InfoRow>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default UserInfoCard;
