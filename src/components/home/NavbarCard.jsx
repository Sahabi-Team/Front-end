import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import {
  KeyboardArrowDown,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import Vazneh from "../../assets/imgs/home/vazneh.png";

const TransparentAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isScrolled",
})(({ theme, isScrolled }) => ({
  width: "100%",
  backgroundColor: isScrolled ? "rgba(0, 68, 27, 0.7)" : "transparent",
  backdropFilter: isScrolled ? "blur(10px)" : "none",
  boxShadow: isScrolled ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
  borderRadius: "0 0 12px 12px",
  direction: "rtl",
  transition:
    "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
}));

const CustomTextButton = styled(Button)(({ theme }) => ({
  color: "black", // رنگ متن
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgba(28, 31, 209, 0.1)", // رنگ پس‌زمینه در حالت هاور
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
  height: "40px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

const BeautifulAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [anchorElPrograms, setAnchorElPrograms] = useState(null);
  const [anchorElMovements, setAnchorElMovements] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProgramsMobile, setOpenProgramsMobile] = useState(false);
  const [openMovementsMobile, setOpenMovementsMobile] = useState(false);

  const handleOpenProgramsMenu = (event) => {
    setAnchorElPrograms(event.currentTarget);
  };

  const handleOpenMovementsMenu = (event) => {
    setAnchorElMovements(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElPrograms(null);
    setAnchorElMovements(null);
  };

  const handleMenuItemClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        {/* <CustomTextButton onClick={() => handleMenuItemClick("coaches")}>
          لیست مربی ها
        </CustomTextButton>
        <CustomTextButton onClick={() => handleMenuItemClick("faq")}>
          سوالات متداول
        </CustomTextButton> */}
        <ListItem button onClick={handleProgramsMobileClick}>
          <ListItemText primary="برنامه‌های ورزشی" />
          {openProgramsMobile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProgramsMobile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("diet")}
            >
              <ListItemText primary="برنامه غذایی" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("abs")}
            >
              <ListItemText primary="برنامه شکم و پهلو" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("custom")}
            >
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
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("chest")}
            >
              <ListItemText primary="حرکات سینه" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("abs-exercises")}
            >
              <ListItemText primary="حرکات شکم و پهلو" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("legs")}
            >
              <ListItemText primary="حرکات پا" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("shoulders")}
            >
              <ListItemText primary="حرکات سرشانه" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <GradientButton variant="contained">تست رایگان</GradientButton>
        <OutlineButton variant="outlined">ورود</OutlineButton>
      </Box>
    </Box>
  );

  return (
    <>
      <TransparentAppBar isScrolled={isScrolled}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LogoImage src={Vazneh} alt="لوگو وزنه" />
          {isMobile ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", ml: "5rem" }}>
                <Box>
                  <GradientButton variant="contained">
                    تست رایگان
                  </GradientButton>
                  <OutlineButton variant="outlined">ورود</OutlineButton>
                </Box>
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
                >
                  لیست مربی ها
                </CustomTextButton>
                <CustomTextButton onClick={() => handleMenuItemClick("faq")}>
                  سوالات متداول
                </CustomTextButton>

                <Box>
                  <Button
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleOpenProgramsMenu}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    برنامه‌های ورزشی
                  </Button>
                  <Menu
                    anchorEl={anchorElPrograms}
                    open={Boolean(anchorElPrograms)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        direction: "rtl",
                      },
                    }}
                  >
                    <MenuItem onClick={() => handleMenuItemClick("diet")}>
                      <Typography width="100%">برنامه غذایی</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("abs")}>
                      <Typography width="100%">برنامه شکم و پهلو</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleMenuItemClick("custom")}>
                      <Typography width="100%">برنامه اختصاصی</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <Box>
                  <Button
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleOpenMovementsMenu}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    بانک حرکات ورزشی
                  </Button>
                  <Menu
                    anchorEl={anchorElMovements}
                    open={Boolean(anchorElMovements)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        direction: "rtl",
                      },
                    }}
                  >
                    <MenuItem onClick={() => handleMenuItemClick("chest")}>
                      <Typography width="100%">حرکات سینه</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick("abs-exercises")}
                    >
                      <Typography width="100%">حرکات شکم و پهلو</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("legs")}>
                      <Typography width="100%">حرکات پا</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("shoulders")}>
                      <Typography width="100%">حرکات سرشانه</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box>
                <GradientButton variant="contained">تست رایگان</GradientButton>
                <OutlineButton variant="outlined">ورود</OutlineButton>
              </Box>
            </>
          )}
        </Toolbar>
      </TransparentAppBar>

      {/* دراور موبایل */}
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
