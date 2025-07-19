// MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header'; 
import Sidebar from './Sidebar'; 
import ContentContainer from './ContentContainer'; 

const drawerWidth = 0; 
const closedDrawerWidth = 0;

const MainLayout = ({ children }) => { 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (isMobile) {
      return false;
    }
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== "false"; 
  });


  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem("sidebarOpen");
      setIsSidebarOpen(savedState !== "false");
    } else {
      setIsSidebarOpen(false); 
    }
  }, [isMobile]);

  const handleSidebarToggle = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Sidebar onSidebarToggle={handleSidebarToggle} />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: {
            xs: 0, 
            sm: isMobile ? 0 : (isSidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`),
          },
          transition: 'margin-left 0.3s ease-in-out',
          width: {
            xs: '100%',
            sm: isMobile ? '100%' : `calc(100% - ${isSidebarOpen ? drawerWidth : closedDrawerWidth}px)`,
          },
        }}
      >
        <Header isSidebarOpen={isSidebarOpen} />

        <ContentContainer isSidebarOpen={isSidebarOpen}>
          {children}
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default MainLayout;