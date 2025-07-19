// Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import logo from "../assets/Logo/Logo.svg"; // Make sure this path is correct
import { AuthContext } from '../contexts/AuthContext.jsx'; // Adjust path as needed

const drawerWidth = 240;
const closedDrawerWidth = 60;

const Header = ({ isSidebarOpen }) => {
  // Directly consume userInfo and loadingAuth from AuthContext
  const { userInfo, loadingAuth } = useContext(AuthContext);
  const [pageTitle, setPageTitle] = useState("در حال بارگذاری..."); // Default title

  useEffect(() => {
    if (loadingAuth) {
      setPageTitle("در حال بارگذاری..."); // Still checking authentication
      return;
    }

    if (userInfo) {
      // User information is available, set title based on usertype
      if (userInfo.usertype === "trainer") {
        setPageTitle("داشبورد مربی");
      } else if (userInfo.usertype === "trainee") {
        setPageTitle("داشبورد شاگرد");
      } else {
        setPageTitle("جیمباتو"); // Fallback for unknown usertype
      }
    } else {
      // No user info available (not authenticated or error occurred in AuthContext)
      setPageTitle("جیمباتو"); // Default public title
    }
  }, [userInfo, loadingAuth]); // Rerun this effect whenever userInfo or loadingAuth changes

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