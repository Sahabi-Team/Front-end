import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from "../assets/Logo/Logo.svg";

const Header = ({ pageTitle }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f7f7f7'
      }}
    >
      {/* Logo and Site Name */}
      

      {/* Page Title */}
      <Typography 
        variant="h6" 
        sx={{
          color: '#000',
          marginleft: '10px',
          fontWeight: 'bold',
          fontSize: '25px'
        }}
      >
        {pageTitle}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
        <img 
          src={logo}
          alt="Jimbato Logo" 
          style={{ width: '50px', height: '50px' }}
        />
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mt: 1,
            color: '#000'
          }}
        >
          جیمباتو
        </Typography>
      </Box>
    </Box>
    
  );
};

export default Header; 