import React, { useState, useContext } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../contexts/AuthContext";

const AvatarBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userInfo, logout } = useContext(AuthContext);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));

  const getResponsiveMinWidth = () => {
    if (isXs) return 140;
    if (isSm) return 160;
    if (isMd) return 180;
    if (isLg) return 200;
    return 220; // xl and above
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("پروفایل کلیک شد");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="تنظیمات حساب">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#444",
              width: 40,
              height: 40,
              boxShadow: "0 0 4px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <AccountCircleIcon fontSize="medium" />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: getResponsiveMinWidth(),
            borderRadius: 2,
            filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.1))",
            px: 0.5,
            py: 0.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleProfile}
          sx={{
            fontSize: {
              xs: "0.70rem",
              sm: "0.75rem",
              md: "0.87rem",
              lg: "1rem",
              xl: "1.12rem",
            },
            borderRadius: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "primary.light",
              color: "white",
              transform: "translateX(-2px)",
            },
          }}
        >
          پروفایل کاربر
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            fontSize: {
              xs: "0.70rem",
              sm: "0.75rem",
              md: "0.87rem",
              lg: "1rem",
              xl: "1.12rem",
            },
            borderRadius: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "error.light",
              color: "white",
              transform: "translateX(-2px)",
            },
          }}
        >
          خروج
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarBox;
