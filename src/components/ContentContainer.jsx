import React from 'react';
import { Box } from '@mui/material';

const ContentContainer = ({ children, isSidebarOpen = false }) => {
  const sidebarWidth = isSidebarOpen ? 200 : 80; // Sidebar width when open/closed
  const containerMarginRight = sidebarWidth + 20; // 20px minimum margin from the sidebar

  return (
    <Box
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'flex',
        minHeight: 'calc(100vh - 32px)',
        padding: '16px',
        // direction: 'rtl',
        marginRight: `${-1*containerMarginRight}px`, // Space for sidebar on the right
        transition: 'margin-right 0.3s ease', // Smooth transition for sidebar
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.2)', // Stronger shadow
          minHeight: 'calc(100vh - 100px)',
          overflow: 'auto',
          width: '75%',
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
