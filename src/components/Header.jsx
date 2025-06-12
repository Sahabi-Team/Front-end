import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from "../assets/Logo/Logo.svg";

// It's good practice to define these widths as constants
const drawerWidth = 240;
const closedDrawerWidth = 60;
export const headerHeight = '85px'; // Export the height so other components can use it

const Header = ({ pageTitle, isSidebarOpen }) => {
  return (
    <Box 
      sx={{ 
        // Positioning and Sizing Logic
        position: 'fixed',
        top: 0,
        right: 0,
        height: headerHeight,
        width: `calc(100% - ${isSidebarOpen ? drawerWidth : closedDrawerWidth}px)`,
        transition: 'width 0.3s ease',
        zIndex: 1100, // Keep it above content but below the sidebar (sidebar is 1200)

        // Styling
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 32px', // Adjusted padding for a cleaner look
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0', // Adds a subtle separator
        boxSizing: 'border-box',
      }}
    >
      {/* Page Title */}
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

      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ color: '#000', fontWeight: 'bold' }}
        >
          جیمباتو
        </Typography>
        <img 
          src={logo}
          alt="Jimbato Logo" 
          style={{ width: '50px', height: '50px' }}
        />
      </Box>
    </Box>
  );
};

export default Header;