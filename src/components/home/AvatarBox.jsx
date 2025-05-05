import React, { useState,useContext } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../contexts/AuthContext";

const AvatarBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userInfo, logout } = useContext(AuthContext);

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
  };

  return (
    <Box>
      <Tooltip title="تنظیمات حساب">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#444", // رنگ آیکن داخل آواتار
              width: 40,
              height: 40,
              boxShadow: "0 0 4px rgba(0,0,0,0.1)",
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
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 160,
            borderRadius: 2,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>پروفایل کاربر</MenuItem>
        <MenuItem onClick={handleLogout}>خروج</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarBox;
