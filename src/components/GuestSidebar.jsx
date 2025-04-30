import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
} from "@mui/material";
import {
    Home, FitnessCenter, Help, Email, PersonAdd
} from "@mui/icons-material";

const GuestSidebar = () => {
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
                    width: isHovered ? 230 : 64,
                    transition: "width 0.3s ease",
                    boxSizing: "border-box",
                    backgroundColor: "#F7F7F7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingTop: "20px",
                    position: "fixed",
                    top: "76px",
                    bottom: 0,
                    zIndex: 900,
                    overflowX: "hidden",
                    overflowY: "hidden",
                }
            }}
        >
            {/* بخش اصلی منو */}
            <List sx={{ color: "black", width: "100%" }}>
                <ListItem button component={Link} to="/" sx={{ color: "#00A359" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}>
                        <Home />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="صفحه اصلی" sx={{ color: "black" }} />}
                </ListItem>

                <ListItem button component={Link} to="/exercises">
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}>
                        <FitnessCenter />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="بانک حرکات ورزشی" sx={{ color: "black" }} />}
                </ListItem>

                <ListItem button component={Link} to="/FAQ">
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" }}>
                        <Help />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="سوالات متداول" sx={{ color: "black" }} />}
                </ListItem>
            </List>

            <Divider sx={{ width: "100%", margin: "10px 0", backgroundColor: "#E3E3E3", height: "2px" }} />

            {/* بخش پایینی */}
            <List sx={{ width: "100%" }}>
                <ListItem button component={Link} to="/contact-admin">
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                        <Email />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="ارتباط با ادمین" sx={{ color: "black" }} />}
                </ListItem>
            </List>

            {/* دکمه ثبت نام در پایین */}
            <div style={{ marginTop: "auto", marginBottom: "150px", width: "100%" }}>
                <ListItem button component={Link} to="/signup" >
                    <ListItemIcon sx={{ minWidth: "40px"}}>
                        <PersonAdd />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="ثبت نام" sx={{ color: "black" }} />}
                </ListItem>
            </div>
        </Drawer>
    );
};

export default GuestSidebar;