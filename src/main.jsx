import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material';
import { RtlProvider } from './utils/RTLProvider.jsx';
import './index.css'
import App from './App.jsx'
import SignInSide from './pages/SignIn.jsx'

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
      default: '#F5F5F5', // رنگ پس‌زمینه پیش‌فرض
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
    {/* <RtlProvider> */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<SignInSide />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    {/* </RtlProvider> */}
  </StrictMode>
)
