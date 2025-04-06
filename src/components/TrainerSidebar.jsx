import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
   
} from "@mui/material";
import {
    Home, Add, Notifications, Edit, ExitToApp, Mail
} from "@mui/icons-material";

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
       
         <Drawer
                    variant="permanent"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                        width: isHovered ? 250 : 80,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: isHovered ? 250 : 80,
                            transition: "width 0.3s ease",
                            boxSizing: "border-box",
                            backgroundColor: "#F7F7F7",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end", // Align items to the right for RTL
                            paddingTop: "20px",
                            position: "fixed",
                            top: "76px",
                            bottom: 0,
                            zIndex: 900,
                            overflowX: "hidden", // Hide horizontal scroll
                            overflowY: "hidden", // Hide vertical scroll
                        }
                    }}
                >
                    {/* Sidebar items list */}
                    <List sx={{ color: "black", width: "100%" }}>
                        <ListItem button component={Link} to="/dashboard" sx={{color: "#00A359" }}>
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}><Home /></ListItemIcon>
                            {isHovered && <ListItemText primary="داشبورد" sx={{ color: "black", }} />}
                        </ListItem>
                        <ListItem button component={Link} to="/new-program">
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}><Add /></ListItemIcon>
                            {isHovered && <ListItemText primary="نوشتن برنامه جدید"  sx={{  color: "black" }} />}
                        </ListItem>
                        <ListItem button component={Link} to="/" >
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}><Notifications /></ListItemIcon>
                            {isHovered && <ListItemText primary="اعلانات" sx={{  color: "black" }} />}
                        </ListItem>
                     
                        <ListItem button component={Link} to="/edit-profile" >
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}><Edit /></ListItemIcon>
                            {isHovered && <ListItemText primary="تغییر پروفایل" sx={{color: "black" }} />}
                        </ListItem>
                    </List>
        
                    <Divider sx={{ width: "100%", margin: "10px 0", backgroundColor: "#E3E3E3", height: "2px" }} />
        
                    <List sx={{ width: "100%" }}>
                        <ListItem button component={Link} to="/messages">
                            <ListItemIcon sx={{ minWidth: "40px" }}><Mail /></ListItemIcon>
                            {isHovered && <ListItemText primary="پیام‌ها" sx={{color: "black" }} />}
                        </ListItem>
        
                    </List>
                    <div style={{ marginTop: "auto", marginBottom: "150px", width: "100%" }}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon sx={{ minWidth: "40px" }}><ExitToApp /></ListItemIcon>
                    {isHovered && <ListItemText primary="خروج" sx={{color:"black" }} />}
                </ListItem>
            </div>
                </Drawer>
    );
};

export default Sidebar;
