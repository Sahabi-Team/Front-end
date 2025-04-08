import { Box } from '@mui/material';
import React from 'react';
import Banner from "../../assets/imgs/home/Banner.png";
import Running from '../../assets/imgs/home/running_1.png'

export default function BannerCard() {
  return (
    <Box sx={{ 
      width: "100%",
      height: "100%", // Takes full height from parent
      display: "flex",
    }}>
      <img
        src={Banner}
        style={{ 
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "conver", // Ensures the full image is visible (no cropping)
          
        }} 
        alt="Banner"
      />
    </Box>
  );
}