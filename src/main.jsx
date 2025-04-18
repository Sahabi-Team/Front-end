import React , {  useEffect ,useState,useContext}from 'react'
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
import ExercisesPage from './pages/ListofExercises.jsx';
import ClientSidebar from './components/ClientSidebar.jsx';
import TreinerSidebar from './components/TrainerSidebar.jsx';
import GuestSidebar from './components/GuestSidebar.jsx';
import { AuthContext ,AuthProvider} from './contexts/AuthContext';
import ChangePasswordClient from './pages/ChangePasswordClient.jsx';

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


const MainApp = () => {
  const { userInfo } = useContext(AuthContext); // استفاده از اطلاعات کاربری از Context

  const renderSidebar = () => {
    if (userInfo?.usertype === 'trainer') {
      return <TreinerSidebar />;
    } else if (userInfo?.usertype === 'trainee') {
      return <ClientSidebar />;
    } else {
      return <GuestSidebar />;
    }
  };

  return (
    <div className="main-layout">
      {renderSidebar()}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/askforemail" element={<AskforEmail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/test" element={<BodyBuildingTest />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path='/exercises' element={<ExercisesPage />} />
          <Route path='/changepassword' element={<ChangePasswordClient />} />
        </Routes>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AuthProvider> 
          <MainApp />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </RtlProvider>
  </StrictMode>
);