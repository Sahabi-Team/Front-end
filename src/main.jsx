import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material';
import { RtlProvider } from './utils/RTLProvider.jsx';
import './index.css'
import SignInSide from './pages/SignIn.jsx'
import AskforEmail from './pages/AskforEmail.jsx'
import SignUp from './pages/Signup.jsx'
import ResetPassword from './pages/ResetPassword.jsx';
import BodyBuildingTest from './pages/BodyBuildingTest.jsx';
import EditProfile from './pages/ClientProfile.jsx';
import FAQPage from './pages/FAQ.jsx';
import Home from './pages/Home.jsx'
import Exercise_Detail from './pages/Exercise_Detail.jsx';

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn",
  },
  palette: {
    primary: {
      main: '#00A359', // رنگ اصلی
      light: '#33B579', // نسخه روشن‌تر
      dark: '#00723D',  // نسخه تیره‌تر
      contrastText: '#FFFFFF', // رنگ متن روی دکمه‌ها
    },
    secondary: {
      main: '#FF5722', // رنگ ثانویه (نارنجی)
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F7F7', // رنگ پس‌زمینه پیش‌فرض
      paper: '#FFFFFF',   // رنگ پس‌زمینه کامپوننت‌ها
    },
    text: {
      primary: '#212121', // رنگ متن اصلی
      secondary: '#757575', // رنگ متن ثانویه
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RtlProvider> 
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/askforemail" element={<AskforEmail />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/resetpassword" element={<ResetPassword/>} />
            <Route path="/test" element={<BodyBuildingTest />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/exercisedetail" element={<Exercise_Detail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      </RtlProvider>  
  </StrictMode>
)
