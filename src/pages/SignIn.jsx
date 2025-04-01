import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from '../components/signin/SignInCard';
import SignIn_img from '../components/signin/SignIn_img'
import { Box , Paper} from '@mui/material';
import './SignIn.css'

export default function Sign_in(props) {
  return (
   
    <>
    <Paper elevation={20} sx={{borderRadius : '30px 30px 30px 30px'}} >
      <Navbar/>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
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
            <SignIn_img  />
            </Box>
            
             
             <SignInCard />
             
           
            
          </Stack>
        </Stack>
      </Stack>
      <Footer/>
      </Paper>
    </>
  );
}