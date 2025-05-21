import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/CancelRounded';

const InfoSection = ({ trainer }) => (
  <Box textAlign={'left'}>
    <Box display="flex" flexDirection="column" alignItems="center" mt={-13}>
      <Avatar src={trainer?.user.profile_picture} alt={trainer?.user.name} sx={{width: 150, height: 150, border: '3px solid white'}} />
      <Typography fontSize={28} fontWeight="bold" my={1}>{trainer?.user.name}</Typography>
      <Rating value={trainer?.rating ?? 0} readOnly />
      <Typography
        variant="caption"
        fontSize={18}
        fontWeight="medium"
        sx={{
          mt: 2,
          px: 1.5,
          py: 0.4,
          backgroundColor: '#f0f0f0',
          border: "1px solid #BCA301",
          borderRadius: 2,
        }}
      >
        {trainer?.rating.toLocaleString('fa-IR')}
      </Typography>
    </Box>

    <Typography fontSize={20} fontWeight="bold">درباره مربی:</Typography>
    <Typography fontSize={18} mt={1} paddingX={2} lineHeight={2}>{trainer?.bio}</Typography>

    <Typography mt={3}>
      <Typography component="span" fontSize={20} fontWeight="bold">
        سابقه مربیگری:
      </Typography>
      <Typography component="span" fontSize={18} ml={1}>
        {trainer?.experience.toLocaleString('fa-IR')} سال
      </Typography>
    </Typography>

    <Typography mt={3} fontSize={20} fontWeight="bold">مدارک:</Typography>
    <ul style={{fontSize: "18px", lineHeight: "36px"}}>
      {trainer?.certificates.split(',').map((item, index) => (
        <li key={index}> {item.trim()} </li>
      ))}
    </ul>

    <Typography mt={3} fontSize={20} fontWeight="bold">تخصص‌ها:</Typography>
    <ul style={{fontSize: "18px", lineHeight: "36px"}}>
      {trainer?.specialties.split(',').map((item, index) => (
        <li key={index}> {item.trim()} </li>
      ))}
    </ul>
    
    <Box display="flex" alignItems="center" mt={3}>
      <Typography fontSize={20} fontWeight="bold">
        قابلیت رزرو:
      </Typography>

      <Typography fontSize={18} ml={1} display="flex" alignItems="center">
        {trainer?.isAvailableForReservation ? "دارد" : "ندارد"}
        {trainer?.isAvailableForReservation ? (
          <CheckCircleIcon sx={{color: "#00A359", fontSize: 26, ml: 0.5}} />
        ) : (
          <CancelIcon sx={{color: "red", fontSize: 26, ml: 0.5}} />
        )}
      </Typography>
    </Box>

    <Typography mt={3}>
      <Typography component="span" fontSize={20} fontWeight="bold">
        هزینه دریافتی:
      </Typography>
      <Typography component="span" fontSize={20} fontWeight="bold" color="#f39c12" ml={1}>
        {trainer?.price.toLocaleString('fa-IR')} هزار تومان
      </Typography>
    </Typography>
  </Box>
);

export default InfoSection;