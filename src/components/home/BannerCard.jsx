import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Banner from '../../assets/imgs/home/Banner.png';
import Running_ex from '../../assets/imgs/running_1 _extra_small.png';
import Running_sm from '../../assets/imgs/running_1_small.png';

export default function BannerCard() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));

  let imageSrc = Banner;
  if (isXs) {
    imageSrc = Banner;
  } else if (isSm) {
    imageSrc = Banner;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <img
        src={imageSrc}
        style={{
          maxWidth: '100%',
          // maxHeight: '100%',
          // objectFit: 'cover',
        }}
        alt="Banner"
      />
    </Box>
  );
}
