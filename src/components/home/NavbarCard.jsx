import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  styled,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Stack,
  Grow,
  Fade,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import Vazneh from "../../assets/imgs/home/vazneh.png";
// import { isUserLoggedIn } from "../../utils/auth.js";
import AvatarBox from "./AvatarBox.jsx";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { AuthContext } from "../../contexts/AuthContext.jsx";

const TransparentAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isScrolled" && prop !== "showInitialBorder",
})(({ theme, isScrolled, showInitialBorder }) => ({
  width: "100%",
  backgroundColor: isScrolled ? "rgba(0, 68, 27, 0.7)" : "transparent",
  backdropFilter: isScrolled ? "blur(10px)" : "none",
  boxShadow: isScrolled ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
  borderRadius: "0 0 12px 12px",
  direction: "rtl",
  borderBottom:
    !isScrolled && showInitialBorder
      ? "2px solid rgba(76, 175, 80, 0.4)"
      : "none",
  transition:
    "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease",
}));

const CustomTextButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgba(28, 31, 209, 0.1)",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  padding: "8px 24px",
  boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    padding: "6px 12px",
    fontSize: "0.75rem",
  },
  "&:hover": {
    background: "linear-gradient(45deg, #3e8e41 30%, #1B5E20 90%)",
  },
}));



const OutlineButton = styled(Button)(({ theme }) => ({
  border: "2px solid #4CAF50",
  color: "#4CAF50",
  backgroundColor: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  padding: "6px 22px",
  [theme.breakpoints.down("sm")]: {
    padding: "4px 12px",
    fontSize: "0.75rem",
  },
  "&:hover": {
    backgroundColor: "white",
    border: "2px solid #3e8e41",
    color: "#3e8e41",
  },
}));

const LogoImage = styled("img")(({ theme }) => ({
  height: "50px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "40px",
  },
}));

const BeautifulAppBar = ({ showInitialBorder = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorElPrograms, setAnchorElPrograms] = useState(null);
  const [anchorElMovements, setAnchorElMovements] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProgramsMobile, setOpenProgramsMobile] = useState(false);
  const [openMovementsMobile, setOpenMovementsMobile] = useState(false);

  const navigate = useNavigate();

  const handleFreeTestClick = () => {
    navigate("/test");
  };

  const handlesigninclick = () => {
    navigate("/signin");
  };

  const handlefaqclick = () => {
    navigate("/FAQ");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenProgramsMenu = (event) => {
    setAnchorElPrograms(event.currentTarget);
  };

  const handleExerciselistclick = (event) => {
    navigate('/exercises');
  };

  const handleCloseMenu = () => {
    setAnchorElPrograms(null);
    setAnchorElMovements(null);
  };

  const handleMenuItemClick = (sectionId) => {
    if (sectionId == "FAQ") navigate("/FAQ");
    else if (sectionId == "coaches") navigate("/trainers");
    handleCloseMenu();
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProgramsMobileClick = () => {
    setOpenProgramsMobile(!openProgramsMobile);
  };

  const handleMovementsMobileClick = () => {
    setOpenMovementsMobile(!openMovementsMobile);
  };

  const { userInfo, logout } = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    async function check() {
      setIsLoggedIn(userInfo ? true : false);
    }

    check();
  }, []);

  const fontSizeResponsive = {
    fontSize: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "0.87rem",
      lg: "1rem",
      xl: "1.12rem",
    },
  };

  // const drawer = (
  //   <Box sx={{ width: 250, padding: 2 }}>
  //     <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
  //       <LogoImage src={Vazneh} alt="لوگو وزنه" />
  //     </Box>
  //     <List>
  //       <ListItem button onClick={() => handleMenuItemClick("coaches")}>
  //         <ListItemText
  //           primary={
  //             <Typography sx={fontSizeResponsive}>لیست مربی ها</Typography>
  //           }
  //         />
  //       </ListItem>
  //       <ListItem button onClick={() => handleMenuItemClick("FAQ")}>
  //         <ListItemText
  //           primary={
  //             <Typography sx={fontSizeResponsive}>سوالات متداول</Typography>
  //           }
  //         />
  //       </ListItem>
  //       <ListItem button onClick={handleProgramsMobileClick}>
  //         <ListItemText
  //           primary={
  //             <Typography sx={fontSizeResponsive}>برنامه‌های ورزشی</Typography>
  //           }
  //         />
  //         {openProgramsMobile ? <ExpandLess /> : <ExpandMore />}
  //       </ListItem>
  //       <Fade in={openProgramsMobile}>
  //         <Collapse in={openProgramsMobile} timeout={400} unmountOnExit>
  //           <List component="div" disablePadding>
  //             {["diet", "abs", "custom"].map((item, index) => (
  //               <ListItem
  //                 button
  //                 sx={{ pl: 4, transition: "all 0.3s" }}
  //                 key={item}
  //                 onClick={() => handleMenuItemClick(item)}
  //               >
  //                 <ListItemText
  //                   primary={
  //                     <Typography sx={fontSizeResponsive}>
  //                       {item === "diet"
  //                         ? "برنامه غذایی"
  //                         : item === "abs"
  //                         ? "برنامه شکم و پهلو"
  //                         : "برنامه اختصاصی"}
  //                     </Typography>
  //                   }
  //                 />
  //               </ListItem>
  //             ))}
  //           </List>
  //         </Collapse>
  //       </Fade>
  //       <ListItem button onClick={handleMovementsMobileClick}>
  //         <ListItemText
  //           primary={
  //             <Typography sx={fontSizeResponsive}>بانک حرکات ورزشی</Typography>
  //           }
  //         />
  //         {openMovementsMobile ? <ExpandLess /> : <ExpandMore />}
  //       </ListItem>
  //       <Fade in={openMovementsMobile}>
  //         <Collapse in={openMovementsMobile} timeout={400} unmountOnExit>
  //           <List component="div" disablePadding>
  //             {[
  //               { key: "chest", label: "حرکات سینه" },
  //               { key: "abs-exercises", label: "حرکات شکم و پهلو" },
  //               { key: "legs", label: "حرکات پا" },
  //               { key: "shoulders", label: "حرکات سرشانه" },
  //             ].map(({ key, label }) => (
  //               <ListItem
  //                 button
  //                 sx={{ pl: 4, transition: "all 0.3s" }}
  //                 key={key}
  //                 onClick={() => handleMenuItemClick(key)}
  //               >
  //                 <ListItemText
  //                   primary={
  //                     <Typography sx={fontSizeResponsive}>{label}</Typography>
  //                   }
  //                 />
  //               </ListItem>
  //             ))}
  //           </List>
  //         </Collapse>
  //       </Fade>
  //     </List>
  //   </Box>
  // );


  const drawer = (
    <Box sx={{ width: 250, padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LogoImage src={Vazneh} alt="لوگو وزنه" />
      </Box>
      <List>
        <ListItem button onClick={() => handleMenuItemClick("coaches")}>
          <ListItemText primary="لیست مربی ها" />
        </ListItem>
        <ListItem button onClick={() => handleMenuItemClick("faq")}>
          <ListItemText primary="سوالات متداول" />
        </ListItem>
        <ListItem button onClick={handleProgramsMobileClick}>
          <ListItemText primary="برنامه‌های ورزشی" />
          {openProgramsMobile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProgramsMobile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("diet")}>
              <ListItemText primary="برنامه غذایی" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("abs")}>
              <ListItemText primary="برنامه شکم و پهلو" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("custom")}>
              <ListItemText primary="برنامه اختصاصی" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleMovementsMobileClick}>
          <ListItemText primary="بانک حرکات ورزشی" />
          {openMovementsMobile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMovementsMobile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("chest")}>
              <ListItemText primary="حرکات سینه" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("abs-exercises")}>
              <ListItemText primary="حرکات شکم و پهلو" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("legs")}>
              <ListItemText primary="حرکات پا" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick("shoulders")}>
              <ListItemText primary="حرکات سرشانه" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <GradientButton variant="contained" onClick={handleFreeTestClick}>تست رایگان</GradientButton>
        {!isLoggedIn ?  (
                    <OutlineButton variant="outlined" onClick={handlesigninclick} sx={fontSizeResponsive}>
                      ورود
                    </OutlineButton>
                  ):(<></>)}
      </Box>
    </Box>
  );

  return (
    <>
      <TransparentAppBar
        isScrolled={isScrolled}
        showInitialBorder={showInitialBorder}
      >
        
        <Toolbar sx={{ justifyContent: "space-between"}}>
          {/* <LogoImage src={Vazneh} alt="لوگو وزنه" /> */}
          {isMobile ? (
            <>
              
              <Box sx={{ display: "flex", alignItems: "center", ml: "5rem", gap:1}}>
              <LogoImage src={Vazneh} alt="لوگو وزنه" />
                <Stack direction="row" >
                   
                  {isLoggedIn ? (
                    <AvatarBox />
                  ) : (
                    // <OutlineButton variant="outlined" onClick={handlesigninclick} sx={fontSizeResponsive}>
                    //   ورود
                    // </OutlineButton>
                    <GradientButton variant="contained" onClick={handleFreeTestClick} sx={fontSizeResponsive}>
                    تست رایگان
                  </GradientButton> 
                  )}
                </Stack> 
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <LogoImage src={Vazneh} alt="لوگو وزنه" />

              <Box
                sx={{
                  display: "flex",
                  gap: { md: 1, lg: 7, xl: 20 },
                  marginRight: { md: "-5rem", lg: "-5rem" },
                  alignItems: "center",
                }}
              >
                <CustomTextButton
                  onClick={() => handleMenuItemClick("coaches")}
                  sx={fontSizeResponsive}
                >
                  لیست مربی ها
                </CustomTextButton>
                <CustomTextButton
                  onClick={() => handleMenuItemClick("FAQ")}
                  sx={fontSizeResponsive}
                >
                  سوالات متداول
                </CustomTextButton>

                {/* --- منوی برنامه‌ها --- */}
                <Box>
                  <Button
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleOpenProgramsMenu}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                      ...fontSizeResponsive,
                    }}
                  >
                    برنامه‌های ورزشی
                  </Button>
                  <Menu
                    anchorEl={anchorElPrograms}
                    open={Boolean(anchorElPrograms)}
                    onClose={handleCloseMenu}
                    TransitionComponent={Grow}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: "12px",
                        boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.12)",
                        direction: "rtl",
                        minWidth: 180,
                      },
                    }}
                  >
                    {[
                      { key: "diet", label: "برنامه غذایی" },
                      { key: "abs", label: "برنامه شکم و پهلو" },
                      { key: "custom", label: "برنامه اختصاصی" },
                    ].map(({ key, label }) => (
                      <MenuItem
                        key={key}
                        onClick={() => handleMenuItemClick(key)}
                        sx={{
                          transition: "all 0.2s",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <Typography sx={fontSizeResponsive} width="100%">
                          {label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {/* --- منوی حرکات --- */}
                <Box>
                  <Button
                    // endIcon={<KeyboardArrowDown />}
                    onClick={handleExerciselistclick}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                      ...fontSizeResponsive,
                    }}
                  >
                    بانک حرکات ورزشی
                  </Button>
                  {/* <Menu
                    anchorEl={anchorElMovements}
                    open={Boolean(anchorElMovements)}
                    onClose={handleCloseMenu}
                    TransitionComponent={Grow}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: "12px",
                        boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.12)",
                        direction: "rtl",
                        minWidth: 180,
                      },
                    }}
                  >
                    {[
                      { key: "chest", label: "حرکات سینه" },
                      { key: "abs-exercises", label: "حرکات شکم و پهلو" },
                      { key: "legs", label: "حرکات پا" },
                      { key: "shoulders", label: "حرکات سرشانه" },
                    ].map(({ key, label }) => (
                      <MenuItem
                        key={key}
                        onClick={() => handleMenuItemClick(key)}
                        sx={{
                          transition: "all 0.2s",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <Typography sx={fontSizeResponsive} width="100%">
                          {label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu> */}
                </Box>
              </Box>

              {/* دکمه‌ها */}
              <Stack direction="row">
                <GradientButton
                  variant="contained"
                  onClick={handleFreeTestClick}
                  sx={fontSizeResponsive}
                >
                  تست رایگان
                </GradientButton>
                {isLoggedIn ? (
                  <AvatarBox />
                ) : (
                  <OutlineButton
                    variant="outlined"
                    onClick={handlesigninclick}
                    sx={fontSizeResponsive}
                  >
                    ورود
                  </OutlineButton>
                )}
              </Stack>
            </>
          )}
        </Toolbar>
      </TransparentAppBar>

      {/* Drawer موبایل */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
          anchor="left"
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default BeautifulAppBar;
