import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
} from "@mui/material";
import {
    Home, Add, BarChart, AccessTime, Edit, ExitToApp, Mail,
} from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { userInfo, logout } = useContext(AuthContext);


    return (
        <Drawer
            variant="permanent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                width: isHovered ? 250 : 80,
               // height: "100%" ,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: isHovered ? 230 : 64,
                    transition: "width 0.3s ease",
                    boxSizing: "border-box",
                    backgroundColor: "#F7F7F7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end", // Align items to the right for RTL
                    paddingTop: "20px",
                    position: "fixed",
                  //  top: "76px",
                    bottom: 0,
                    zIndex: 900,
                    overflowX: "hidden", // Hide horizontal scroll
                    overflowY: "hidden", // Hide vertical scroll
                }
            }}
        >
            {/* Sidebar items list */}
            <List sx={{ color: "black", width: "100%",top:"70px" }}>
                <ListItem button component={Link} to="/" sx={{color: "#00A359" }}>
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><Home /></ListItemIcon>
                    {isHovered && <ListItemText primary="صفحه اصلی " sx={{ color: "black", }} />}
                </ListItem>
                <ListItem button component={Link} to="/workoutplans">
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" ,marginBottom:"10px"}}><ArticleIcon /></ListItemIcon>
                    {isHovered && <ListItemText primary="مشاهده برنامه" sx={{  color: "black" }} />}
                </ListItem>
                <ListItem button component={Link} to="/new-program">
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" ,marginBottom:"10px"}}><Add /></ListItemIcon>
                    {isHovered && <ListItemText primary="دریافت برنامه جدید" sx={{  color: "black" }} />}
                </ListItem>
                <ListItem button component={Link} to="/test_result" >
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" ,marginBottom:"10px"}}><BarChart /></ListItemIcon>
                    {isHovered && <ListItemText primary="نتایج تست‌ها" sx={{  color: "black" }} />}
                </ListItem>
                <ListItem button component={Link} to="/analysis" >
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" ,marginBottom:"10px"}}><AccessTime /></ListItemIcon>
                    {isHovered && <ListItemText primary="آنالیز دوره" sx={{ color: "black" }} />}
                </ListItem>
                <ListItem button component={Link} to="/editprofile" >
                    <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><Edit /></ListItemIcon>
                    {isHovered && <ListItemText primary="تغییر اطلاعات کاربری" sx={{color: "black" }} />}
                </ListItem>
            </List>

            <Divider sx={{ width: "100%", margin: "10px 0", backgroundColor: "#E3E3E3", height: "2px",marginTop:"80px" }} />

            <List sx={{ width: "100%",top:"6px" }}>
                <ListItem button component={Link} to="/messages">
                    <ListItemIcon sx={{ minWidth: "40px" }}><Mail /></ListItemIcon>
                    {isHovered && <ListItemText primary="پیام‌ها" sx={{color: "black" }} />}
                </ListItem>

            </List>
            
            <div style={{ marginTop: "auto", marginBottom: "50px", width: "100%" }}>
                {(userInfo &&
                <ListItem button  onClick={logout}>
                    <ListItemIcon sx={{ minWidth: "40px" }}><ExitToApp /></ListItemIcon>
                    {isHovered && <ListItemText primary="خروج" sx={{color:"black" }} />}
                </ListItem>
                )}
            </div>
        </Drawer>
    );
};

export default Sidebar;