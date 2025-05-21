import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';

const Header = () => (
  <Box sx={{ position: 'relative' }}>
    {/* نوار سبز */}
    <Box sx={{ height: 100, backgroundColor: "#00A359", boxShadow: 3, borderRadius: "0px 0px 10px 10px"}} />

    {/* دکمه بازگشت */}
    <IconButton onClick={() => window.history.back()} sx={{ position: 'absolute', top: 30, right: 8, color: 'white' }}>
      <Typography sx={{ mr: 0.5 }}>بازگشت</Typography>
      <ArrowBackIcon />
    </IconButton>
  </Box>
);

export default Header;
