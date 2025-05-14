import React from 'react';
import { Box, Avatar, Typography, Rating, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';

const Header = () => (
  <Box sx={{ position: 'relative' }}>
    {/* نوار سبز */}
    <Box sx={{ height: 100, backgroundColor: "#00A359", boxShadow: 3, borderRadius: "0px 0px 10px 10px"}} />

    {/* دکمه بازگشت */}
    <IconButton onClick={() => window.history.back()} sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}>
      <Typography sx={{ mr: 0.5 }}>بازگشت</Typography>
      <ArrowBackIcon />
    </IconButton>

    {/* آواتار و اطلاعات */}
    <Box display="flex" flexDirection="column" alignItems="center" mt={-10}>
      <Avatar sx={{ width: 150, height: 150, border: '3px solid white' }} />
      <Typography fontSize={28} fontWeight="bold" mt={1}>صالح اعتمادی</Typography>
      <Rating value={4} readOnly />
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          backgroundColor: '#f0f0f0',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
        }}
        fontSize={16}
        fontWeight="medium"
      >
        ۴.۶
      </Typography>
    </Box>
  </Box>
);

export default Header;
