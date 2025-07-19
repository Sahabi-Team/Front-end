// MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header'; // Adjust path as needed
import Sidebar from './TrainerSidebar'; // Adjust path as needed
import ContentContainer from './ContentContainer'; // Adjust path as needed

const MainLayout = ({ children, pageTitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Initialize sidebarOpen state based on localStorage for desktop, always open for mobile drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (isMobile) {
      return false; // Mobile sidebar is controlled by its own open/close state
    }
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== "false";
  });

  // Effect to update sidebar state when isMobile changes (e.g., on window resize)
  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem("sidebarOpen");
      setIsSidebarOpen(savedState !== "false");
    } else {
      setIsSidebarOpen(false); // Ensure desktop sidebar state is false when on mobile
    }
  }, [isMobile]);

  // This function will be passed to the Sidebar to update the state in MainLayout
  const handleSidebarToggle = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      {/* Sidebar Component */}
      <Sidebar onSidebarToggle={handleSidebarToggle} />

      {/* Main content area (Header + ContentContainer) */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          // Adjust left margin for the content based on sidebar state
          // On mobile, the header and content do not shift, as the sidebar is an overlay Drawer
          marginLeft: {
            xs: 0,
            sm: isMobile ? 0 : (isSidebarOpen ? '240px' : '60px'),
          },
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {/* Header Component */}
        <Header pageTitle={pageTitle} isSidebarOpen={isSidebarOpen} />

        {/* Content Container Component */}
        <ContentContainer isSidebarOpen={isSidebarOpen}>
          {children}
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default MainLayout;
