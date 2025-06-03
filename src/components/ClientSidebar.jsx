import React, { useState, useContext } from "react";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Avatar, Box, Typography, Tooltip
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTheme, useMediaQuery } from "@mui/material";
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useLocation } from "react-router-dom";

const menuItems = [
  { text: "صفحه اصلی", icon: <HomeIcon />, link: "/" },
  { text: "مشاهده برنامه", icon: <ArticleIcon />, link: "/workoutplans" },
  { text: "دریافت برنامه جدید", icon: <AddIcon />, link: "/new-program" },
  { text: "نتایج تست ها", icon: <BarChartIcon />, link: "/test_result" },
  { text: "آنالیز دوره", icon: <AccessTimeIcon />, link: "/analysis" },
  { text: "تغییر اطلاعات کاربری", icon: <EditIcon />, link: "/editprofile" },
  { text: "تغییر رمز عبور", icon: <VpnKeyIcon />, link: "/change-password" },
];

const drawerWidth = 250;
const closedDrawerWidth = 64;
const green = "#00AF66";

const SidebarContent = ({
  onClose,
  userInfo,
  logout,
  open,
  setOpen,
  isMobile,
  currentPath
}) => (
  <Box
    sx={{
      width: open ? drawerWidth : closedDrawerWidth,
      p: 0,
      m: 0,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      transition: "width 0.2s",
      ...(isMobile && { mt: 7 }) // margin-top for mobile header
    }}
  >
    {/* Collapse/Expand Button (Desktop only) */}
    {!isMobile && (
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          alignSelf: open ? "flex-end" : "center",
          mt: 1,
          mb: 1,
        }}
      >
        {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    )}

    {/* User section */}
    {open && (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, mb: 2 }}>
        <Avatar src={userInfo?.avatar || "/path/to/user.jpg"} sx={{ width: 56, height: 56, mb: 1 }} />
        <Typography fontWeight="bold" fontSize={16}>{userInfo?.name || "نام کاربر"}</Typography>
      </Box>
    )}

    {/* Menu */}
    <List sx={{ p: 0 }}>
      {menuItems.map((item) => {
        const isActive = currentPath === item.link;
        return (
          <ListItem
            button
            key={item.text}
            component="a"
            href={item.link}
            sx={{
              px: open ? 2 : 1,
              justifyContent: open ? "flex-start" : "center",
              color: isActive ? green : "inherit",
              '&:hover': { background: "#f5f5f5" },
              transition: "all 0.2s"
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: isActive ? green : "inherit",
                mr: open ? 2.5 : 0,
                justifyContent: "center"
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={item.text}
                sx={{
                  '.MuiTypography-root': {
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? green : "inherit",
                    fontSize: 16,
                    ml: 2 // Increase distance between icon and text
                  }
                }}
              />
            )}
          </ListItem>
        );
      })}
    </List>
    <Divider sx={{ my: 2 }} />
    {/* Message section: only icon and label */}
    <List sx={{ p: 0 }}>
      <ListItem
        button
        component="a"
        href="/messages"
        sx={{
          px: open ? 2 : 1,
          justifyContent: open ? "flex-start" : "center",
          transition: "all 0.2s"
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2.5 : 0, justifyContent: "center" }}>
          <MailIcon />
        </ListItemIcon>
        {open && <ListItemText primary="پیام‌ها" sx={{ '.MuiTypography-root': { fontSize: 16, ml: 2 } }} />}
      </ListItem>
    </List>
    {/* Logout at the bottom */}
    <Box sx={{ mt: "auto", mb: 2 }}>
      <Divider sx={{ mb: 1 }} />
      <ListItem
        button
        onClick={logout}
        sx={{
          px: open ? 2 : 1,
          justifyContent: open ? "flex-start" : "center",
          transition: "all 0.2s"
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2.5 : 0, justifyContent: "center" }}>
          <ExitToAppIcon />
        </ListItemIcon>
        {open && <ListItemText primary="خروج" sx={{ '.MuiTypography-root': { fontSize: 16, ml: 2 } }} />}
      </ListItem>
    </Box>
  </Box>
);

const ClientSidebar = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo, logout } = useContext(AuthContext);
  const location = useLocation();

  // Mobile: only hamburger icon, sidebar slides in
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 2000,
            background: "#fff",
            boxShadow: 2,
            p: 1,
            m: 0,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: "#fff",
              boxShadow: "0 0 16px 0 #0002",
              p: 0,
              m: 0,
            }
          }}
        >
          <SidebarContent
            onClose={() => setMobileOpen(false)}
            userInfo={userInfo}
            logout={logout}
            open={true}
            setOpen={() => {}}
            isMobile={true}
            currentPath={location.pathname}
          />
        </Drawer>
      </>
    );
  }

  // Desktop sidebar with open/close mode
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open
      PaperProps={{
        sx: {
          width: open ? drawerWidth : closedDrawerWidth,
          bgcolor: "#fff",
          boxShadow: "0 0 16px 0 #0002",
          borderLeft: "none",
          p: 0,
          m: 0,
          transition: "width 0.2s"
        }
      }}
    >
      <SidebarContent
        userInfo={userInfo}
        logout={logout}
        open={open}
        setOpen={setOpen}
        isMobile={false}
        currentPath={location.pathname}
      />
    </Drawer>
  );
};

export default ClientSidebar;