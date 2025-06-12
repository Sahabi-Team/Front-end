import React from 'react';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon

const drawerWidth = 240;
const closedDrawerWidth = 60;

// The Header now needs to know if it's mobile view and have a click handler for the menu
const Header = ({ pageTitle, isSidebarOpen, isMobile, onMenuClick }) => {
  return (
    <Box 
      sx={{
        // Use margin to respect the DESKTOP sidebar
        // On mobile, this will be 0, making the header full-width
        marginLeft: !isMobile ? (isSidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`) : 0,
        transition: 'margin-left 0.3s ease-in-out',
        height: '70px', // A slightly smaller header might look better on mobile
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px', // Standard padding
        boxSizing: 'border-box',
      }}
    >
      {/* Right side of Header (for RTL) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         {/* The page title */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
          {pageTitle}
        </Typography>
      </Box>

      {/* Left side of Header (for RTL) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* These icons are always visible */}
        <IconButton>
            <Brightness4Icon />
        </IconButton>
        <IconButton>
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        {/* NEW: The hamburger menu icon, ONLY visible on mobile */}
        {isMobile && (
          <IconButton
            edge="end"
            onClick={onMenuClick} // Trigger the function passed from MainLayout
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Header;