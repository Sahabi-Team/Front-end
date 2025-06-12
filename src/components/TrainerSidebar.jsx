import React, { useState, useEffect, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";

// --- Constants ---
const drawerWidth = 240;
const closedDrawerWidth = 60;
const green = "#00AF66";

const menuItems = [
  { text: "صفحه اصلی", icon: <HomeIcon />, link: "/" },
  { text: "مشاهده شاگرد ها", icon: <ArticleIcon />, link: "/trainer_students" },
  { text: "نوشتن برنامه جدید", icon: <AddIcon />, link: "/createworkoutplan" },
  { text: "اعلانات", icon: <NotificationsNoneIcon />, link: "/notifications" },
  { text: "تغییر اطلاعات کاربری", icon: <EditIcon />, link: "/trainereditprofile" },
  { text: "تغییر رمز عبور", icon: <VpnKeyIcon />, link: "/changepasswordtrainer" },
];

// --- Sub-component for the Drawer's Content ---
// This remains largely the same, but is now controlled by props.
const SidebarContent = ({
  onClose,
  userInfo,
  logout,
  isDesktopOpen,
  onDesktopToggle,
  isMobile,
  currentPath,
}) => {
  const role = "مربی";
  const open = isDesktopOpen || isMobile; // In mobile, the content is always in the "open" state.

  return (
    <Box
      sx={{
        width: "100%", // The Drawer itself controls the width now.
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Close button for mobile drawer */}
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Toggle button for desktop drawer */}
      {!isMobile && (
        <IconButton
          onClick={onDesktopToggle}
          sx={{
            alignSelf: open ? "flex-start" : "center",
            my: 0.5,
            mx: open ? 1 : 'auto'
          }}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      )}

      {/* User profile section */}
      {open && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 1,
              px: 1,
            }}
          >
            <Avatar
              src={`http://45.144.50.12:8000${userInfo?.profile_picture || ""}`}
              sx={{ width: 56, height: 56, boxShadow: `0 0 0 3px ${green}` }}
            />
            <Typography fontWeight="bold" fontSize={15} textAlign="center" mt={0.5}>
              {userInfo?.name || "نام کاربر"}
            </Typography>
            <Typography fontSize={13} color="text.secondary" textAlign="center">
              {role}
            </Typography>
          </Box>
          <Box sx={{ width: "80%", borderBottom: "1px solid #e0e0e0", my: 1, alignSelf: "center" }} />
        </>
      )}

      {/* Menu Items */}
      <List sx={{ p: 0, flex: 1, textAlign: "right" }}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.link;
          const listItemContent = (
            <>
              <ListItemIcon sx={{ minWidth: 0, ml: open ? 1.5 : 0, justifyContent: "center", color: isActive ? "#fff" : "#666" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} sx={{ color: isActive ? "#fff" : "#333", fontWeight: isActive ? "bold" : "normal" }} />}
            </>
          );

          return (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.link}
              onClick={isMobile ? onClose : undefined}
              sx={{
                px: open ? 1.5 : 0.5, py: 1, mx: 0.5, mb: 0.5,
                borderRadius: 1,
                justifyContent: open ? "flex-start" : "center",
                backgroundColor: isActive ? green : "transparent",
                "&:hover": {
                  background: isActive ? green : "#f5f5f5",
                  color: isActive ? "#fff" : green,
                  "& .MuiListItemIcon-root": { color: isActive ? "#fff" : green },
                },
              }}
            >
              {open ? listItemContent : <Tooltip title={item.text} placement="left">{listItemContent}</Tooltip>}
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ mt: "auto", mb: 1, px: 0.5 }}>
        <ListItem button onClick={() => { logout(); if (isMobile) onClose(); }} sx={{ justifyContent: open ? "flex-start" : "center", borderRadius: 1 }}>
          <ListItemIcon sx={{ minWidth: 0, ml: open ? 1.5 : 0, justifyContent: "center" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          {open && <ListItemText primary="خروج" />}
        </ListItem>
      </Box>
    </Box>
  );
};

// --- Main Sidebar Component ---
// This is the primary component you export. It is now a "controlled" component.
const TrainerSidebar = ({
  isMobile,
  isDesktopOpen,
  onDesktopToggle,
  isMobileOpen,
  onMobileClose,
}) => {
  const { userInfo: authContextUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(authContextUserInfo || null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    // This logic to fetch user info can remain here
    axios
      .get("http://45.144.50.12:8000/api/auth/whoami/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((response) => setUserInfo(response.data))
      .catch((err) => console.error("Failed to fetch user info", err));
  }, []);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="right"
      open={isMobile ? isMobileOpen : true} // "open" controls visibility for temp, but permanent is always "open"
      onClose={onMobileClose}
      ModalProps={{
        keepMounted: true, // Improves mobile performance
      }}
      PaperProps={{
        sx: {
          width: isMobile ? drawerWidth : isDesktopOpen ? drawerWidth : closedDrawerWidth,
          transition: isMobile ? undefined : "width 0.3s ease",
          boxShadow: "0 0 8px 0 #0001",
          right: 0,
        },
      }}
    >
      <SidebarContent
        isMobile={isMobile}
        isDesktopOpen={isDesktopOpen}
        onDesktopToggle={onDesktopToggle}
        onClose={onMobileClose}
        userInfo={userInfo}
        logout={handleLogout}
        currentPath={location.pathname}
      />
    </Drawer>
  );
};

export default TrainerSidebar;