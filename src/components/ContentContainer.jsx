import React from 'react';
import { Box } from '@mui/material';

const ContentContainer = ({ children, isSidebarOpen = false }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'flex',
        minHeight: 'calc(100vh - 32px)',
        padding: '16px',
        // direction: 'rtl',
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
          width: '90%',
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
