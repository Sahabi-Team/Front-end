import React, { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
   
} from "@mui/material";
import {
    Home, Add, Notifications, Edit, ExitToApp, Mail
} from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: isHovered ?230 : 64,
                            transition: "width 0.3s ease",
                            boxSizing: "border-box",
                            backgroundColor: "#F7F7F7",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end", // Align items to the right for RTL
                            paddingTop: "20px",
                            position: "fixed",
                           // top: "76px",
                            bottom: 0,
                            zIndex: 900,
                            overflowX: "hidden", // Hide horizontal scroll
                            overflowY: "hidden", // Hide vertical scroll
                        }
                    }}
                >
                    {/* Sidebar items list */}
                    <List sx={{ color: "black", width: "100%",top:"70px"  }}>
                        <ListItem button component={Link} to="/trainer_students" sx={{color: "#00A359" }}>
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><Home /></ListItemIcon>
                            {isHovered && <ListItemText primary="صفحه اصلی" sx={{ color: "black", }} />}
                        </ListItem>
                        <ListItem button component={Link} to="/createworkoutplan">
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><Add /></ListItemIcon>
                            {isHovered && <ListItemText primary="نوشتن برنامه جدید"  sx={{  color: "black" }} />}
                        </ListItem>
                        <ListItem button component={Link} to="/notifications" >
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0" ,marginBottom:"10px"}}><Notifications /></ListItemIcon>
                            {isHovered && <ListItemText primary="اعلانات" sx={{  color: "black" }} />}
                        </ListItem>
                     
                        <ListItem button component={Link} to="/trainereditprofile" >
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><Edit /></ListItemIcon>
                            {isHovered && <ListItemText primary="تغییر پروفایل" sx={{color: "black" }} />}
                        </ListItem>
                        <ListItem button component={Link} to="/trainereditprofile" >
                            <ListItemIcon sx={{ minWidth: "40px", marginLeft: isHovered ? "8px" : "0",marginBottom:"10px" }}><VpnKeyIcon /></ListItemIcon>
                            {isHovered && <ListItemText primary="تغییر رمز عبور" sx={{color: "black" }} />}
                        </ListItem>
                    </List>
        
                    <Divider sx={{ width: "100%", margin: "10px 0", backgroundColor: "#E3E3E3", height: "2px" ,marginTop:"80px"}} />
        
                    <List sx={{ width: "100%" ,top:"6px"}}>
                        <ListItem button component={Link} to="/messages">
                            <ListItemIcon sx={{ minWidth: "40px" }}><Mail /></ListItemIcon>
                            {isHovered && <ListItemText primary="پیام‌ها" sx={{color: "black" }} />}
                        </ListItem>
        
                    </List>
                    <div style={{ marginTop: "auto", marginBottom: "50px", width: "100%" }}>
                 {userInfo && (
                                <ListItem button onClick={logout}>
                                    <ListItemIcon sx={{ minWidth: "40px" }}><ExitToApp /></ListItemIcon>
                                    {isHovered && <ListItemText primary="خروج" sx={{color:"black" }} />}
                                </ListItem>
                                )}
            </div>
                </Drawer>
    );
};

export default Sidebar;
