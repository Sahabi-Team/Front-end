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
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTheme, useMediaQuery } from "@mui/material";
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config  from "../config.js";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
}) => {
  const role = userInfo?.usertype === "coach" ? "مربی" : "شاگرد";

  return (
    <Box
      sx={{
        width: open ? drawerWidth : closedDrawerWidth,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "width 0.2s",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {!isMobile && (
        <IconButton
          onClick={() => {
            setOpen(!open);
            localStorage.setItem("sidebarOpen", String(!open)); // persist state
          }}
          sx={{
            alignSelf: open ? "flex-end" : "center",
            mt: 1,
            mb: 1,
          }}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      )}

      {open && (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <Avatar
              src={`http://45.144.50.12:8000${userInfo?.profile_picture || ""}`}
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography fontWeight="bold" fontSize={16}>{userInfo?.name || "نام کاربر"}</Typography>
            <Typography fontSize={14} color="text.secondary">{role}</Typography>
          </Box>
          <Box sx={{ width: "80%", borderBottom: "1px solid #ddd", my: 2, alignSelf: "center" }} />
        </>
      )}

      <List sx={{ p: 0 }}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.link;
          const listItem = (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.link}
              sx={{
                px: open ? 2 : 1,
                justifyContent: open ? "flex-start" : "center",
                backgroundColor: isActive ? green : "transparent",
                color: isActive ? "#fff" : "inherit",
                mb: open ? 0 : 2,
                '& .MuiListItemIcon-root': { color: isActive ? "#fff" : "inherit" },
                '& .MuiTypography-root': {
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: 16,
                  color: isActive ? "#fff" : "inherit",
                  ml: 2,
                },
                '&:hover': {
                  background: "#f5f5f5",
                  color: green,
                  '& .MuiListItemIcon-root': { color: green },
                  '& .MuiTypography-root': { color: green }
                },
                transition: "all 0.2s"
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : 0,
                  justifyContent: "center"
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          );

          return open ? listItem : (
            <Tooltip key={item.text} title={item.text} placement="left">
              {listItem}
            </Tooltip>
          );
        })}
      </List>

      {/* Messages */}
      <List sx={{ p: 0 }}>
        <Tooltip title="پیام‌ها" placement="left" disableHoverListener={open}>
          <ListItem
            button
            component="a"
            href="/messages"
            sx={{
              px: open ? 2 : 1,
              justifyContent: open ? "flex-start" : "center",
              backgroundColor: currentPath === "/messages" ? green : "transparent",
              color: currentPath === "/messages" ? "#fff" : "inherit",
              mb: open ? 0 : 2,
              '& .MuiListItemIcon-root': { color: currentPath === "/messages" ? "#fff" : "inherit" },
              '& .MuiTypography-root': {
                fontWeight: currentPath === "/messages" ? "bold" : "normal",
                fontSize: 16,
                color: currentPath === "/messages" ? "#fff" : "inherit",
                ml: 2,
              },
              '&:hover': {
                background: "#f5f5f5",
                color: green,
                '& .MuiListItemIcon-root': { color: green },
                '& .MuiTypography-root': { color: green }
              },
              transition: "all 0.2s"
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2.5 : 0, justifyContent: "center" }}>
              <MailIcon />
            </ListItemIcon>
            {open && <ListItemText primary="پیام‌ها" />}
          </ListItem>
        </Tooltip>
      </List>

      {/* Logout */}
      <Box sx={{ mt: "auto", mb: 2 }}>
        <ListItem
          button
          onClick={logout}
          sx={{
            px: open ? 2 : 1,
            justifyContent: open ? "flex-start" : "center",
            '&:hover': {
              background: "#f5f5f5",
              color: green,
              '& .MuiListItemIcon-root': { color: green },
              '& .MuiTypography-root': { color: green }
            },
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
};

const ClientSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo: authContextUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(authContextUserInfo || null);
  const [open, setOpen] = useState(localStorage.getItem("sidebarOpen") === "false" ? false : true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();

  };

  useEffect(() => {
    axios.get("http://45.144.50.12:8000/api/auth/whoami/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
    .then(response => setUserInfo(response.data))
    .catch(err => console.error("Failed to fetch user info", err));
  }, []);

  if (isMobile) {
    return (
      <>
        {!mobileOpen && (
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 2000,
              background: "#fff",
              boxShadow: 2,
              p: 1
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: "#fff",
              boxShadow: "0 0 16px 0 #0002",
              overflowX: "hidden"
            }
          }}
        >
          <SidebarContent
            onClose={() => setMobileOpen(false)}
            userInfo={userInfo}
            logout={handleLogout}
            open={true}
            setOpen={() => {}}
            isMobile={true}
            currentPath={location.pathname}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open
      PaperProps={{
        sx: {
          width: open ? drawerWidth : closedDrawerWidth,
          bgcolor: "#fff",
          boxShadow: "0 0 16px 0 #0002",
          overflowX: "hidden",
          transition: "width 0.2s"
        }
      }}
    >
      <SidebarContent
        userInfo={userInfo}
        logout={handleLogout}
        open={open}
        setOpen={setOpen}
        isMobile={false}
        currentPath={location.pathname}
      />
    </Drawer>
  );
};

export default ClientSidebar;
