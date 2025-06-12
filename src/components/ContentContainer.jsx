import React from 'react';
import { Box } from '@mui/material';

// Define your sidebar widths in a central place if possible
const drawerWidth = 240;
const closedDrawerWidth = 60;

const ContentContainer = ({ children, isSidebarOpen }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start', // Changed to flex-start for better alignment
        minHeight: 'calc(100vh - 32px)',
        padding: '16px',
        // The key change is here:
        marginLeft: isSidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
        transition: 'margin-left 0.3s ease', // Smooth transition for margin
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 6,
          boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.2)',
          minHeight: 'calc(100vh - 100px)',
          overflow: 'auto',
          width: '100%', // Changed to 100% to fill the available space
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