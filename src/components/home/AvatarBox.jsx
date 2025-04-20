// // components/AvatarBox.js
// import React, { useState } from "react";
// import {
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Box,
// } from "@mui/material";
// import { deepPurple } from "@mui/material/colors";

// const AvatarBox = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleProfile = () => {
//     handleClose();
//     // اینجا می‌تونی navigate کنی به صفحه پروفایل
//   };

//   const handleLogout = () => {
//     handleClose();
//     // localStorage پاک کردن یا هر کار مربوط به logout
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     window.location.reload(); // رفرش یا redirect
//   };

//   return (
//     <Box>
//       <Tooltip title="تنظیمات حساب">
//         <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
//           <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}>
//             ک
//           </Avatar>
//         </IconButton>
//       </Tooltip>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 3,
//           sx: {
//             mt: 1.5,
//             minWidth: 160,
//             borderRadius: 2,
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
//             "& .MuiAvatar-root": {
//               width: 24,
//               height: 24,
//               ml: -0.5,
//               mr: 1,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={handleProfile}>پروفایل</MenuItem>
//         <MenuItem onClick={handleLogout}>خروج</MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default AvatarBox;


// components/AvatarBox.js
// components/AvatarBox.js
import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AvatarBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    console.log("خروج کلیک شد");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
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
