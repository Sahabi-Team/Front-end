import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from "../assets/Logo/Logo.svg";

const drawerWidth = 240;
const closedDrawerWidth = 60;

const Header = ({ pageTitle, isSidebarOpen }) => {
  return (
    <Box 
      sx={{ 
        marginLeft: {
          xs: 0,
          sm: isSidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
        },
        transition: 'margin-left 0.3s ease-in-out',
        height: '85px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 32px',
        boxSizing: 'border-box',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: '25px'
        }}
      >
        {pageTitle}
      </Typography>

      <a 
        href="http://gym-bato.ir" 
        style={{ textDecoration: 'none' }}
        rel="noopener noreferrer"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <img 
            src={logo}
            alt="Jimbato Logo" 
            style={{ width: '40px', height: '40px' }}
          />
          <Typography 
            variant="subtitle1" 
            sx={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}
          >
            جیمباتو
          </Typography>
        </Box>
      </a>
    </Box>
  );
};

export default Header;