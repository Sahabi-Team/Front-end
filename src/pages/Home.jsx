import { 
  CssBaseline, 
  Box, 
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import BannerCard from "../components/home/BannerCard";
import NavBar from "../components/home/NavbarCard";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

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
      
      <Box sx={{
        position: 'relative',
        mt: {xs: '15rem', md: '15rem'},
        ml: {xs: '55%', md: '55%',lg:'65%',xl : '75%'},
        maxWidth: {xs: '90%', md: '30%'},
        textAlign: {xs: 'center', md: 'left'}
      }}>
        <Typography 
          variant="h3" 
          sx={{
            fontWeight: 'bold',
           
            fontSize:{xs:'140%',sm:'200%',md:'200%',lg:'250%'},
            lineHeight: 1.2,
            mb: 2
          }}
        >
          وقتشه شروع کنیم!
        </Typography>
        
        <Typography 
          sx={{
            fontSize: {xs: '73%', md: '110%', lg : '140%'},
            color: 'text.secondary',
            mb: 1,
            fontWeight: 500,
            marginLeft:'-5%'
          }}
        >
          عضو جیمباتو شو تا استارت کاررو بزنیم 
        </Typography>
        
        <Typography 
          sx={{
            fontSize: {xs: '73%', md: '110%', lg : '140%'},
            color: 'text.disabled',
            fontStyle: 'italic',
            marginLeft:{xs:'-2%',md:'20%',lg:'20%'}
          }}
        >
          تازه شروع کاره...
        </Typography>
      </Box>
     
      <Box
  sx={{
    height: '4px',
    width: '40%',
    ml: '30%', // تنظیم موقعیت افقی
    mt: 45,
    backgroundImage: 'linear-gradient(to right, transparent, #8BC34A, #4CAF50, #8BC34A, transparent)',
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(76, 175, 80, 0.4)'
  }}
/>








    </Box>
  );
}