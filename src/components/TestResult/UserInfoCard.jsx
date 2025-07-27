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


const GreenCard = styled(Card)(() => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '16px',
  backgroundColor: '#fff',
}));

const InfoItemWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
}));

const InfoItem = ({ label, value, unit }) => (
  <InfoItemWrapper>
    <Typography fontWeight="bold">{label}:</Typography>
    <Box display="flex" gap={0.5} alignItems="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <Typography>{value}</Typography>
      {unit && <Typography>{unit}</Typography>}
    </Box>
  </InfoItemWrapper>
);

const toPersianDigits = (num) => {
  return num?.toString().replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);
};

const UserInfoCard = ({ userInfo }) => {
  const info = userInfo || {};

  const calculateAge = (birthDate) => {
    if (!birthDate) return '-';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return toPersianDigits(age-621);
  };

  const maleImages = [male1, male2, male3, male4, male5, male6];
  const femaleImages = [female1, female2, female3, female4, female5, female6];
  const selectedImages = info.gender === 'male' ? maleImages : femaleImages;
  const bodyFormImage = selectedImages[info.body_form - 1];

  const infoItems = [
    { label: 'سن', value: calculateAge(info.birth_date) ,unit: 'سال'},
    { label: 'وزن', value: toPersianDigits(info.weight), unit: 'کیلوگرم' },
    { label: 'قد', value: toPersianDigits(info.height), unit: 'سانتی متر' },
    { label: 'وسیله تمرین', value: info.equipment  },
    { label: 'وزن هدف', value: toPersianDigits(info.goal_weight) , unit: 'کیلوگرم' },
    { label: 'زمان هفتگی', value: toPersianDigits(info.workout_days)  },
    { label: 'عضلات هدف', value: info.focus_area  },
    { label: 'هدف از ورزش', value: info.goal },
  ];

  return (
    <GreenCard>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Right Side */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'left' }}>
              اطلاعات اولیه
            </Typography>

            {/* Info Grid */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                alignItems: 'flex-start',
                mb: 3 ,
                
              }}
            >
              {infoItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: { xs: '100%', sm: '0 0 calc(33.333% - 16px)' },
                    mb: 1,
                  }}
                >
                  <InfoItem label={item.label} value={item.value} unit={item.unit} />
                </Box>
              ))}
            </Box>

            {/* Diseases */}
            <Box sx={{ mt: 2 }}>
              <InfoItem label="بیماری‌ها" value={info.diseases || 'ندارد'} />
            </Box>
          </Box>

          {/* Left Side - Image */}
          <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 4, sm: 0 },
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
        </Box>
      </CardContent>
    </GreenCard>
  );
};

export default UserInfoCard;
