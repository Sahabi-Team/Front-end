import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
    IconButton
} from "@mui/material";
import {
    Home, Add, BarChart, Notifications, Edit, ExitToApp, Mail
} from "@mui/icons-material";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Drawer
            variant="permanent"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            sx={{
                width: isExpanded ? 250 : 80,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: isExpanded ? 250 : 80,
                    transition: "width 0.3s ease",
                    boxSizing: "border-box",
                    backgroundColor: "#F7F7F7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "20px",
                    right: 0,
                    left: "auto",
                    direction: "rtl",
                    position: "fixed",
                    top: "76px",
                    bottom: 0,
                    zIndex: 900,
                    overflowX: "hidden",
                    overflowY: "hidden"
                }
            }}
            anchor="right"
        >
            <List sx={{ color: "black", width: "100%" }}>
                <ListItem button component={Link} to="/dashboard" sx={{ textAlign: "right", color: "#00A359" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isExpanded ? "8px" : "0" }}><Home /></ListItemIcon>
                    {isExpanded && <ListItemText primary="داشبورد" sx={{ textAlign: "right" ,color:"black" }} />}
                </ListItem>

                <ListItem button component={Link} to="/new-program" sx={{ textAlign: "right" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isExpanded ? "8px" : "0" }}><Add /></ListItemIcon>
                    {isExpanded && <ListItemText primary="نوشتن برنامه جدید" sx={{ textAlign: "right",color:"black"  }} />}
                </ListItem>

                <ListItem button component={Link} to="/test-results" sx={{ textAlign: "right" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isExpanded ? "8px" : "0" }}><Notifications /></ListItemIcon>
                    {isExpanded && <ListItemText primary="اعلانات" sx={{ textAlign: "right",color:"black"  }} />}
                </ListItem>

                <ListItem button component={Link} to="/edit-profile" sx={{ textAlign: "right" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isExpanded ? "8px" : "0" }}><Edit /></ListItemIcon>
                    {isExpanded && <ListItemText primary="تغییر پروفایل" sx={{ textAlign: "right",color:"black"  }} />}
                </ListItem>
            </List>

            <Divider sx={{ width: "80%", margin: "10px 0", backgroundColor: "#E3E3E3", height: "2px" }} />

            <List sx={{ width: "100%" }}>
                <ListItem button component={Link} to="/messages">
                    <ListItemIcon sx={{ minWidth: "40px" }}><Mail /></ListItemIcon>
                    {isExpanded && <ListItemText primary="پیام‌ها" sx={{ textAlign: "right",color:"black"  }} />}
                </ListItem>
            </List>

            <div style={{ marginTop: "auto", marginBottom: "150px", width: "100%" }}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon sx={{ minWidth: "40px" }}><ExitToApp /></ListItemIcon>
                    {isExpanded && <ListItemText primary="خروج" sx={{ textAlign: "right",color:"black"  }} />}
                </ListItem>
            </div>
        </Drawer>
    );
};

export default Sidebar;
