
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo/Logo.svg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});


  // تابع برای باز و بسته کردن نوبار موبایل
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseEnter = (item) => {
    if (item === "برنامه های ورزشی" || item === "بانک حرکات ورزشی") {
      setActiveMenu(item);
      setIsSubmenuOpen((prev) => ({ ...prev, [item]: true }));
    }
  };

  const handleMouseLeave = (item) => {
    if (item === "برنامه های ورزشی" || item === "بانک حرکات ورزشی") {
      setIsSubmenuOpen((prev) => ({ ...prev, [item]: false }));
    }
  };


  // آیتم‌های نوبار موبایل
 
const drawer = (
  <List style={{ width: "250px", padding: "20px" }}>
    {/* آیکون و عنوان اصلی */}
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
      <img src={logo} alt="Logo" style={{ width: "70px" }} />
    </div>

    {/* حالت زیرمنوها */}
    {["برنامه های ورزشی", "بانک حرکات ورزشی", "لیست مربی‌ها", "سوالات متداول"].map((item, index) => {
      const [open, setOpen] = useState(false);

      const toggleSubMenu = () => setOpen(!open);

      return (
        <div key={index}>
          <ListItem
            button
            style={{
              margin: "10px 0",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              textAlign: "center",
              display: "flex",
             justifyContent: "space-between",
              alignItems: "center",
             // anchor:"right"
            }}
            onClick={() => {
              if (item === "سوالات متداول") navigate("/FAQ");
              else if (item === "لیست مربی‌ها") navigate("/coaches");
              else toggleSubMenu();
            }}
          >
            <ListItemText primary={item} style={{ fontWeight: "bold" }} />
            {["برنامه های ورزشی", "بانک حرکات ورزشی"].includes(item) && (
              <IconButton edge="end" size="small">
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItem>

          {/* زیرمنوی بانک حرکات ورزشی */}
          {item === "بانک حرکات ورزشی" && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["حرکات سینه", "حرکات شکم و پهلو", "حرکات پا", "حرکات سرشانه", "حرکات زیر بغل"].map((subItem, subIndex) => (
                  <ListItem
                    button
                    key={subIndex}
                    style={{  borderRadius: "10px",paddingLeft: "30px", backgroundColor: "#e8e8e8", marginBottom: "5px", textAlign: "center" }}
                    onClick={() => navigate(`/exercise-bank/${subIndex}`)}
                  >
                    <ListItemText primary={subItem} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}

          {/* زیرمنوی برنامه های ورزشی */}
          {item === "برنامه های ورزشی" && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["برنامه غذایی", "برنامه شکم و پهلو", "برنامه اختصاصی"].map((subItem, subIndex) => (
                  <ListItem
                    button
                    key={subIndex}
                    style={{  borderRadius: "10px",paddingLeft: "30px", backgroundColor: "#e8e8e8", marginBottom: "5px", textAlign: "center", }}
                    onClick={() => navigate(`/workout-plan/${subIndex}`)}
                  >
                    <ListItemText primary={subItem} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      );
    })}

    {/* گزینه‌های انتهایی */}
    <ListItem
      button
      style={{ marginTop: "20px", border: "2px solid green", borderRadius: "10px", color: "green", textAlign: "center" }}
      onClick={() => navigate("/signin")}
    >
      <ListItemText primary="ورود" />
    </ListItem>
    <ListItem
      button
      style={{ marginTop: "10px", backgroundColor: "green", color: "white", borderRadius: "10px", textAlign: "center" }}
      onClick={() => navigate("/test")}
    >
      <ListItemText primary="تست رایگان" />
    </ListItem>
  </List>
);
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#F7F7F7",
          boxShadow: "none",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "row" : "row-reverse",
          zIndex: 1000,
          
          
        }}
      >
        <Toolbar style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {isMobile ? (
            <>
           {/* لوگو و نام سایت */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#000000", marginLeft: "10px" }}>
            جیمباتو
          </span>
          </div>
           <img src={logo} alt="Logo" style={{ width: "50px", marginBottom: "5px" ,left:"10px" }} />
              {/* دکمه نوبار موبایل */}
               <IconButton
                edge="start"
                style={{ color: "#00A359", position: "absolute", right: "10px" }} // برای نمایش در سمت راست
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
             
             
            </>
          ) : (
            <>
            
              {/* دکمه‌های نسخه دسکتاپ */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexGrow: 1 }}>
                {/* بخش راست: ورود و تست رایگان */}
                <div style={{ display: "flex", gap: "20px", marginRight: "30px" }}>
                <Button
                    style={{
                      backgroundColor: "#00A359",
                      color: "white",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px 35px",
                      boxShadow: "0 4px 8px rgba(1,1,1,1.2)",
                    }}
                    onClick={() => navigate("/test")}
                  >
                    تست رایگان
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#00A359",
                      color: "white",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px 30px",
                      boxShadow: "0 4px 8px rgba(1,1,1,1.2)",
                    }}
                    onClick={() => navigate("/signin")}
                  >
                    ورود
                  </Button>
                </div>

                 {/* بخش چپ: لینک‌های دیگر */}
                          
                <div style={{ display: "flex", gap: "1px" }}>
                {["برنامه های ورزشی", "بانک حرکات ورزشی", "لیست مربی‌ها", "سوالات متداول"].map((item, index) => (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={() => handleMouseLeave(item)}
                  >
                    <button
                      style={{
                        color: "black",
                        background:"#F7F7F7",
                        fontSize: "1.1rem",
                        padding: "5px 50px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        border: "none",
                        fontFamily: "Vazirmatn", 
                      }}
                      onClick={() => {
                        if (item === "سوالات متداول") navigate("/FAQ");
                         if(item === "لیست مربی‌ها") navigate("/coaches");
                      }}
                    >
                      {item}
                      {/* فلش برای آیتم‌های خاص */}
                      {["برنامه های ورزشی", "بانک حرکات ورزشی"].includes(item) && (
                        <span style={{ fontSize:"0.7rem", transform: isSubmenuOpen[item] ? "rotate(90deg)" : "rotate(0deg)", transition: "0.3s" }}>
                          ▶
                        </span>
                      )}
                    </button>

                    {/* زیرمنو برای "برنامه های ورزشی" */}
                    {item === "برنامه های ورزشی" && isSubmenuOpen[item] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          backgroundColor: "#f4f4f4",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          padding: "10px",
                          zIndex: 10,
                        }}
                      >
                        {["برنامه غذایی", "برنامه شکم و پهلو", "برنامه اختصاصی"].map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            style={{ padding: "5px", cursor: "pointer",color:"#2D2E2E" }}
                            onClick={() => navigate(`/workout/${subIndex + 1}`)}
                          >
                            {subItem}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* زیرمنو برای "بانک حرکات ورزشی" */}
                    {item === "بانک حرکات ورزشی" && isSubmenuOpen[item] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          backgroundColor: "#f4f4f4",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          padding: "10px",
                          zIndex: 10,
                        }}
                      >
                        {["حرکات سینه", "حرکات شکم و پهلو", "حرکات پا", "حرکات سرشانه", "حرکات زیر بغل"].map(
                          (subItem, subIndex) => (
                            <div
                              key={subIndex}
                              style={{ padding: "5px", cursor: "pointer" ,color:"#2D2E2E"}}
                              onClick={() => navigate(`/exercise-bank/${subIndex + 1}`)}
                            >
                              {subItem}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

                                
              </div>
               {/* لوگو و نام سایت */}
               <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginLeft: "15px" }}>
                <img src={logo} alt="Logo" style={{ width: "40px", marginBottom: "5px" }} />
                <span style={{ fontSize: "1rem", fontWeight: "bold", color: "#000000" }}>جیمباتو</span>
              </div>

            </>
          )}
        </Toolbar>
      </AppBar>

      {/* نوبار موبایل */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
