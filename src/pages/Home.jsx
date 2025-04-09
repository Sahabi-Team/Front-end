import { 
    CssBaseline, 
    Box, 
    AppBar, 
    Toolbar, 
    Button,
    Typography
  } from "@mui/material";
  import React from "react";
  import BannerCard from "../components/home/BannerCard";
  import NavBar from "../components/home/NavbarCard";
  
  export default function Home() {
    return (
      <Box>
        <CssBaseline />
        <Box
          sx={{
            width: "100vw",
            padding: "0",
            height: "40rem",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <BannerCard />
        </Box>
        
    <NavBar/>
      </Box>
    );
  }