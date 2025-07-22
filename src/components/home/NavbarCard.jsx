import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  styled,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import Vazneh from "../../assets/imgs/home/vazneh.png";
import AvatarBox from "./AvatarBox.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const TransparentAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isScrolled" && prop !== "showInitialBorder",
})(({ theme, isScrolled, showInitialBorder }) => ({
  width: "100%",
  background: isScrolled
    ? "rgba(0, 68, 27, 0.75)"
    : "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
  backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
  boxShadow: isScrolled ? "0 8px 20px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "0 0 20px 20px",
  direction: "rtl",
  borderBottom: !isScrolled && showInitialBorder
    ? "1px solid rgba(76, 175, 80, 0.4)"
    : "none",
  transition: "all 0.4s ease-in-out",
}));

const CustomTextButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  padding: "6px 16px",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(120deg, #4CAF50, #2E7D32)",
  color: "white",
  fontWeight: "bold",
  borderRadius: "30px",
  padding: "10px 26px",
  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
  marginLeft: theme.spacing(1),
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    padding: "6px 12px",
    fontSize: "0.75rem",
  },
  "&:hover": {
    background: "linear-gradient(120deg, #3e8e41, #1B5E20)",
    transform: "scale(1.05)",
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  border: "2px solid #4CAF50",
  color: "#4CAF50",
  backgroundColor: "#ffffffee",
  fontWeight: "bold",
  borderRadius: "30px",
  padding: "6px 22px",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    padding: "4px 12px",
    fontSize: "0.75rem",
  },
  "&:hover": {
    backgroundColor: "#f0fff0",
    border: "2px solid #388e3c",
    color: "#388e3c",
    transform: "translateY(-1px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  },
}));

const LogoImage = styled("img")(({ theme }) => ({
  height: "52px",
  width: "auto",
  marginRight: theme.spacing(2),
  cursor: "pointer",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "scale(1.08) rotate(-1deg)",
    opacity: 0.9,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "42px",
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

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenProgramsMenu = (event) => {
   navigate("/about_us")
  };

  const handleExerciselistclick = (event) => {
    navigate("/exercises");
  };

  const handleCloseMenu = () => {
    setAnchorElPrograms(null);
    setAnchorElMovements(null);
  };

  const handleMenuItemClick = (sectionId) => {
    if (sectionId == "faq") navigate("/faq");
    else if (sectionId == "coaches") navigate("/trainers");
    handleCloseMenu();
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProgramsMobileClick = () => {
    navigate("/about_us")
  };

  const handleMovementsMobileClick = () => {
    navigate("/exercises");
  };

  const { userInfo, logout } = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // console.log(localStorage.getItem("access_token"));
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

  const drawer = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        bgcolor: "#fefefe",
        borderRadius: "0 8px 8px 0",
        boxShadow: 3,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LogoImage
          src={Vazneh}
          alt="لوگو وزنه"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      </Box>

      <List>
        {[
          { label: "لیست مربی ها", key: "coaches" },
          
          {
            label: "بانک حرکات ورزشی",
            key: "movements",
            onClick: handleMovementsMobileClick,
          },
          { label: "سوالات متداول", key: "faq" },
        ].map((item) => (
          <ListItem
            key={item.key}
            button
            onClick={() =>
              item.onClick ? item.onClick() : handleMenuItemClick(item.key)
            }
            sx={{
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "primary.light",
                color: "#fff",
                cursor: "pointer",
                transform: "scale(1.03)",
              },
              my: 0.5,
              px: 2,
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        <ListItem
          button
          onClick={handleProgramsMobileClick}
          sx={{
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "primary.light",
              color: "#fff",
              cursor: "pointer",
              transform: "scale(1.03)",
            },
            my: 0.5,
            px: 2,
          }}
        >
          <ListItemText primary="درباره ما" />
          
        </ListItem>
      </List>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 2,
          alignItems: "center",
        }}
      >
        <GradientButton
          variant="contained"
          onClick={handleFreeTestClick}
          sx={{
            width: 220, // عرض ثابت
            fontWeight: "bold",
            fontSize: "0.95rem",
          }}
        >
          تست رایگان
        </GradientButton>

        {!isLoggedIn && (
          <OutlineButton
            variant="outlined"
            onClick={handlesigninclick}
            sx={{
              width: 220, // عرض برابر با دکمه بالا
              fontSize: "0.95rem",
              fontWeight: "bold",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "primary.light",
                color: "#fff",
              },
            }}
          >
            ورود
          </OutlineButton>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <TransparentAppBar
        isScrolled={isScrolled}
        showInitialBorder={showInitialBorder}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <LogoImage src={Vazneh} alt="لوگو وزنه" /> */}
          {isMobile ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: "5rem",
                  gap: 1,
                }}
              >
                <LogoImage
                  src={Vazneh}
                  alt="لوگو وزنه"
                  onClick={handleLogoClick}
                />
                <Stack direction="row">
                  {isLoggedIn ? (
                    <AvatarBox />
                  ) : (
                    // <OutlineButton variant="outlined" onClick={handlesigninclick} sx={fontSizeResponsive}>
                    //   ورود
                    // </OutlineButton>
                    <GradientButton
                      variant="contained"
                      onClick={handleFreeTestClick}
                      sx={fontSizeResponsive}
                    >
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
              <LogoImage
                src={Vazneh}
                alt="لوگو وزنه"
                onClick={handleLogoClick}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: { md: 1, lg: 7, xl: 20 },
                  marginRight: { md: "-5rem", lg: "-5rem" },
                  alignItems: "center",
                }}
              >

                
                  <CustomTextButton
                    onClick={handleOpenProgramsMenu}
                    sx={fontSizeResponsive}
                  >
                    درباره ما
                  </CustomTextButton>
                  
               
                
                <CustomTextButton
                  onClick={() => handleMenuItemClick("faq")}
                  sx={fontSizeResponsive}
                >
                  سوالات متداول
                </CustomTextButton>
                  <CustomTextButton
                    // endIcon={<KeyboardArrowDown />}
                    onClick={handleExerciselistclick}
                    sx={fontSizeResponsive}
                  >
                    بانک حرکات ورزشی
                  </CustomTextButton>
                
                <CustomTextButton
                  onClick={() => handleMenuItemClick("coaches")}
                  sx={fontSizeResponsive}
                >
                  لیست مربی ها
                </CustomTextButton>
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
