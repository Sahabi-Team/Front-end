import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignUpCard from '../components/signup/SignUpCard';
import { Box , Paper,Container} from '@mui/material';
import SignUp_img from '../components/signup/SignUp_img'
import Footer from "../components/Footer";

export default function Sign_up(props) {
  return (
   
    
   
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          alignContent: "center",
          marginLeft: -4,
          marginBottom: -5,
        }}
      >
         <CssBaseline enableColorScheme />
        {/* محتوا */}
        <Box sx={{ flex: 1 }}>

        <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          mb:10
        }}
      >
    <Paper elevation={20} sx={{borderRadius : '30px 30px 30px 30px'}} >
      
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            // marginTop: 'max(20px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              m: 'auto',
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SignUp_img/>
            </Box>
            
             
             <SignUpCard/>
             
           
            
          </Stack>
        </Stack>
      </Stack>
      </Paper>
      </Container>
      </Box>
      <Footer/>
   </Box>
  );
}