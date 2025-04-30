import React from 'react';
import { Box } from '@mui/material';

const ContentContainer = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        height: 'calc(100vh - 100px)', // Adjust based on your header height
        overflow: 'auto',
        margin: '16px',
        padding: '24px',
      }}
    >
      {children}
    </Box>
  );
};

export default ContentContainer; 