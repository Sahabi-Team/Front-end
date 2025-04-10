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

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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






{/* Stats Section */}
<Box sx={{ 
  mt: '7rem', 
  px: 2,
  display: 'flex',
  justifyContent: 'center'
}}>
  <Stack 
    direction={{ xs: 'column', sm: 'row' }}
    spacing={{ xs: 3, sm: 3, md: 10, lg: 20, xl: 40 }}
    justifyContent="center"
    alignItems="center"
    sx={{
      width: '100%',
      maxWidth: 1200,
      textAlign: 'center',
    }}
  >
    {/* Item 1 - Programs */}
    <Box sx={{ 
      minWidth: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h4" sx={{ 
        color: 'success.main',
        fontWeight: 'bold',
        mb: 1,
        fontSize: { xs: '1.5rem', sm: '2.2rem' }
      }}>
        +۳۰۰
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          fontSize: { xs: '0.9rem', sm: '1rem' }
        }}>
          برنامه نوشته شده
        </Typography>
        <FitnessCenterIcon sx={{ 
          color: 'success.light',
          fontSize: '1.2rem',
          mr: 1,
        }}/>
      </Box>
    </Box>

    {/* Item 2 - Users */}
    <Box sx={{ 
      minWidth: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h4" sx={{ 
        color: 'success.main',
        fontWeight: 'bold',
        mb: 1,
        fontSize: { xs: '1.5rem', sm: '2.2rem' }
      }}>
        +۱۳۵۰
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          fontSize: { xs: '0.9rem', sm: '1rem' }
        }}>
          کاربر
        </Typography>
        <PersonIcon sx={{ 
          color: 'info.main',
          fontSize: '1.2rem',
          mr: 1,
        }}/>
      </Box>
    </Box>

    {/* Item 3 - Coaches */}
    <Box sx={{ 
      minWidth: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h4" sx={{ 
        color: 'success.main',
        fontWeight: 'bold',
        mb: 1,
        fontSize: { xs: '1.5rem', sm: '2.2rem' }
      }}>
        +۲۷
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          fontSize: { xs: '0.9rem', sm: '1rem' }
        }}>
          مربی آماده
        </Typography>
        <StarBorderIcon sx={{ 
          color: 'warning.main',
          fontSize: '1.2rem',
          mr: 1,
        }}/>
      </Box>
    </Box>
  </Stack>
</Box>

    </Box>
  );
}