import React from 'react';
import { Box } from '@mui/material';

const drawerWidth = 240;
const closedDrawerWidth = 60;

const ContentContainer = ({ children, isSidebarOpen }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 32px)',
        padding: '16px',
        marginLeft: {
          xs: 0, // No margin on extra-small screens (mobile)
          sm: isSidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`, // Keep original logic for tablet and desktop
        },
        transition: 'margin-left 0.3s ease',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 6,
          boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.2)',
          minHeight: 'calc(100vh - 100px)',
          overflow: 'auto',
          width: '100%',
          maxWidth: '1300px',
          padding: '24px',
          margin: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContentContainer;