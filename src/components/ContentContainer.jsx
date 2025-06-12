import React from 'react';
import { Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

const ContentContainer = ({ children, sidebarOpen = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const drawerWidth = 250;
  const closedDrawerWidth = 64;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '100vh',
        padding: { xs: '72px 8px 8px 8px', md: '16px' }, // Extra top padding on mobile for menu button
        transition: 'margin-left 0.3s ease',
        marginLeft: { 
          xs: 0, // No margin on mobile
          md: `${sidebarOpen ? drawerWidth : closedDrawerWidth}px` // Dynamic margin on desktop
        },
        width: {
          xs: '100%', // Full width on mobile
          md: `calc(100% - ${sidebarOpen ? drawerWidth : closedDrawerWidth}px)` // Adjusted width on desktop
        },
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 6,
          boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.2)',
          minHeight: { xs: 'calc(100vh - 88px)', md: 'calc(100vh - 32px)' },
          overflow: 'auto',
          width: '100%',
          maxWidth: '1300px',
          padding: { xs: '16px', md: '24px' },
          margin: '0 auto',
          flexGrow: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContentContainer;