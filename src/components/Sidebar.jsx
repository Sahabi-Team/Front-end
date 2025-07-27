// Sidebar.jsx (or TrainerSidebar.jsx)
import React, { useState, useEffect, useContext } from "react";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Box, Typography, Tooltip
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme, useMediaQuery } from "@mui/material";
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config.js";
import axios from "axios";

const drawerWidth = 240;
const closedDrawerWidth = 60;
const green = "#00AF66";

const SidebarContent = ({
  onClose,
  userInfo,
  logout,
  open, // This 'open' now directly comes from MainLayout's isSidebarOpen state
  setOpen, // This 'setOpen' now directly maps to MainLayout's handleSidebarToggle
  isMobile,
  currentPath
}) => {
  const role = userInfo?.usertype === "trainer" ? "مربی" : "شاگرد";

  const menuItems = userInfo?.usertype === "trainer" ? [
    { text: "صفحه اصلی", icon: <HomeIcon />, link: "/" },
    { text: "مشاهده شاگرد ها", icon: <ArticleIcon />, link: "/trainer_students" },
    { text: "نوشتن برنامه جدید", icon: <AddIcon />, link: "/createworkoutplan" },
    { text: "اعلانات", icon: <NotificationsNoneIcon />, link: "/notifications" },
    { text: "تغییر اطلاعات کاربری", icon: <EditIcon />, link: "/trainereditprofile" },
    { text: "تغییر رمز عبور", icon: <VpnKeyIcon />, link: "/changepasswordtrainer" },
    { text: "پیام‌ها", icon: <MailIcon />, link: "/chat" },
  ] : [
    { text: "صفحه اصلی", icon: <HomeIcon />, link: "/" },
    { text: "مشاهده برنامه", icon: <ArticleIcon />, link: "/workoutplans" },
    { text: "دریافت برنامه جدید", icon: <AddIcon />, link: "/trainers" },
    { text: "نتایج تست ها", icon: <BarChartIcon />, link: "/test_result" },
    { text: "تغییر اطلاعات کاربری", icon: <EditIcon />, link: "/editprofile" },
    { text: "تغییر رمز عبور", icon: <VpnKeyIcon />, link: "/change-password" },
    { text: "پیام‌ها", icon: <MailIcon />, link: "/chat" },
  ];

  return (
    <Box
      sx={{
        width: isMobile ? drawerWidth : (open ? drawerWidth : closedDrawerWidth),
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "width 0.2s",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Mobile close button - only shown in mobile mode */}
      {isMobile && (
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Desktop toggle button */}
      {!isMobile && (
        <IconButton
          onClick={() => {
            setOpen(!open); // Use setOpen from props
            localStorage.setItem("sidebarOpen", String(!open));
          }}
          sx={{
            alignSelf: open ? "flex-end" : "center",
            my: 0.5,
          }}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      )}

      {/* User profile section */}
      {(open || isMobile) && (
        <>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 1,
            px: 1
          }}>
            <Avatar
              src={`${config.API_BASE_URL}:8000${userInfo?.profile_picture || ""}`}
              sx={{
                width: 56,
                height: 56,
                boxShadow: `0 0 0 3px ${green}`,
              }}
            />
            <Typography fontWeight="bold" fontSize={15} textAlign="center" mt={0.5}>
              {userInfo?.name || "نام کاربر"}
            </Typography>
            <Typography fontSize={13} color="text.secondary" textAlign="center">
              {role}
            </Typography>
          </Box>
          <Box sx={{
            width: "80%",
            borderBottom: "1px solid #e0e0e0",
            my: 1,
            alignSelf: "center"
          }} />
        </>
      )}

      {/* Main menu items including messages */}
      <List sx={{ p: 0, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.link;
          const listItem = (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.link}
              onClick={isMobile ? onClose : undefined}
              sx={{
                px: (open || isMobile) ? 1.5 : 0.5,
                py: 1,
                mx: isMobile ? 0.5 : 0,
                mb: isMobile ? 0.5 : (open ? 0.25 : 1),
                borderRadius: isMobile ? 1 : 0,
                justifyContent: (open || isMobile) ? "flex-start" : "center",
                backgroundColor: isActive ? green : "transparent",
                color: isActive ? "#fff" : "inherit",
                '& .MuiListItemIcon-root': { color: isActive ? "#fff" : "#666" },
                '& .MuiTypography-root': {
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: 14,
                  color: isActive ? "#fff" : "#333",
                },
                '&:hover': {
                  background: isActive ? green : (isMobile ? "#f8f9fa" : "#f5f5f5"),
                  color: isActive ? "#fff" : green,
                  '& .MuiListItemIcon-root': { color: isActive ? "#fff" : green },
                  '& .MuiTypography-root': { color: isActive ? "#fff" : green }
                },
                transition: "all 0.2s ease"
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: (open || isMobile) ? 1.5 : 0,
                  justifyContent: "center"
                }}
              >
                {item.icon}
              </ListItemIcon>
              {(open || isMobile) && <ListItemText primary={item.text} />}
            </ListItem>
          );

          return (open || isMobile) ? listItem : (
            <Tooltip key={item.text} title={item.text} placement="left">
              {listItem}
            </Tooltip>
          );
        })}
      </List>

      {/* Logout */}
      <Box sx={{ mt: "auto", mb: 1, px: isMobile ? 0.5 : 0 }}>
        {(open || isMobile) ? (
          <ListItem
            button
            onClick={() => {
              logout();
              if (isMobile) onClose();
            }}
            sx={{
              px: (open || isMobile) ? 1.5 : 0.5,
              py: 1,
              borderRadius: isMobile ? 1 : 0,
              justifyContent: (open || isMobile) ? "flex-start" : "center",
              '&:hover': {
                background: isMobile ? "#f8f9fa" : "#f5f5f5",
                color: green,
                '& .MuiListItemIcon-root': { color: green },
                '& .MuiTypography-root': { color: green }
              },
              transition: "all 0.2s ease"
            }}
          >
            <ListItemIcon sx={{
              minWidth: 0,
              mr: (open || isMobile) ? 1.5 : 0,
              justifyContent: "center",
              color: "#666"
            }}>
              <ExitToAppIcon />
            </ListItemIcon>
            {(open || isMobile) && (
              <ListItemText
                primary="خروج"
                sx={{
                  '.MuiTypography-root': {
                    fontSize: 14,
                    color: "#333",
                    fontWeight: "normal"
                  }
                }}
              />
            )}
          </ListItem>
        ) : (
          <Tooltip title="خروج" placement="left">
            <ListItem
              button
              onClick={() => {
                logout();
                if (isMobile) onClose();
              }}
              sx={{
                px: (open || isMobile) ? 1.5 : 0.5,
                py: 1,
                borderRadius: isMobile ? 1 : 0,
                justifyContent: (open || isMobile) ? "flex-start" : "center",
                '&:hover': {
                  background: isMobile ? "#f8f9fa" : "#f5f5f5",
                  color: green,
                  '& .MuiListItemIcon-root': { color: green },
                  '& .MuiTypography-root': { color: green }
                },
                transition: "all 0.2s ease"
              }}
            >
              <ListItemIcon sx={{
                minWidth: 0,
                mr: (open || isMobile) ? 1.5 : 0,
                justifyContent: "center",
                color: "#666"
              }}>
                <ExitToAppIcon />
              </ListItemIcon>
              {(open || isMobile) && (
                <ListItemText
                  primary="خروج"
                  sx={{
                    '.MuiTypography-root': {
                      fontSize: 14,
                      color: "#333",
                      fontWeight: "normal"
                    }
                  }}
                />
              )}
            </ListItem>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};


const Sidebar = ({ onSidebarToggle }) => { // Renamed from TrainerSidebar for general use
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { userInfo: authContextUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(authContextUserInfo || null);
  const [open, setOpen] = useState(!isMobile && localStorage.getItem("sidebarOpen") !== "false");
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer's open/close
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Pass the open state up to the MainLayout
  useEffect(() => {
    if (onSidebarToggle && !isMobile) {
      onSidebarToggle(open);
    }
  }, [open, isMobile, onSidebarToggle]);

  // Fetch user info on component mount
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/api/auth/whoami/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
    .then(response => setUserInfo(response.data))
    .catch(err => console.error("Failed to fetch user info", err));
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile) {
      if (mobileOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent shift from scrollbar
      } else {
        document.body.style.overflow = '';
      }
    }
  }, [mobileOpen, isMobile]);


  if (isMobile) {
    return (
      <>
        {/* Mobile menu button - only shown when drawer is closed */}
        {!mobileOpen && (
          <IconButton
            onClick={() => setMobileOpen(true)} // Open mobile drawer
            sx={{
              position: "fixed",
              top: 12,
              left: 12,
              zIndex: 1200, // Lower than drawer z-index
              width: 40,
              height: 40,
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
              '&:hover': {
                backgroundColor: "#f8f9fa",
              },
              transition: "all 0.2s ease"
            }}
          >
            <MenuIcon sx={{ color: "#333", fontSize: 24 }} />
          </IconButton>
        )}

        {/* Mobile drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          SlideProps={{
            direction: "left"
          }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: "#fff",
              boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
              overflowX: "hidden",
              overflowY: "auto"
            }
          }}
          sx={{
            '& .MuiDrawer-paper': {
              border: 'none',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          <SidebarContent
            onClose={() => setMobileOpen(false)}
            userInfo={userInfo}
            logout={handleLogout}
            open={true} // Mobile drawer is always "open" visually when active
            setOpen={() => {}} // No external setOpen for mobile
            isMobile={true}
            currentPath={location.pathname}
          />
        </Drawer>
      </>
    );
  }

  // Desktop sidebar
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open} // Use the 'open' state from this component, which is synced with MainLayout
      PaperProps={{
        sx: {
          width: open ? drawerWidth : closedDrawerWidth,
          bgcolor: "#fff",
          boxShadow: "0 0 8px 0 #0001",
          overflowX: "hidden",
          transition: "width 0.3s ease",
          position: "fixed",
          height: "100vh",
          zIndex: 1200
        }
      }}
    >
      <SidebarContent
        userInfo={userInfo}
        logout={handleLogout}
        open={open}
        setOpen={setOpen} // Pass the local setOpen function to SidebarContent
        isMobile={false}
        currentPath={location.pathname}
      />
    </Drawer>
  );
};

export default Sidebar;
