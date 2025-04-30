import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// آدرس API
const API_URL = 'https://ighader.pythonanywhere.com/api/auth/';

// ایجاد Context برای دسترسی به وضعیت احراز هویت

export const AuthContext = createContext({
  userInfo: null, // Default value for userInfo
  logout: () => {},
});


// این کامپوننت وضعیت احراز هویت را مدیریت می‌کند
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const navigate = useNavigate();

  // دریافت اطلاعات کاربر از API
  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${API_URL}whoami/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.status === 401) {
        // اگر توکن منقضی شده باشد، توکن تازه‌سازی را فراخوانی می‌کنیم
        const refreshTokenFromStorage = localStorage.getItem('refresh_token');
        if (refreshTokenFromStorage) {
          refreshToken(refreshTokenFromStorage);
        }
      }
      setUserInfo(null);
    }
    setLoading(false);
  };

  // توکن تازه‌سازی
  const refreshToken = async (refreshToken) => {
    try {
      const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh: refreshToken,
      });
      localStorage.setItem('access_token', response.data.access);
      getUserInfo(response.data.access); // دریافت اطلاعات کاربر با توکن جدید
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  // مدیریت خروج کاربر
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserInfo(null);
    navigate('/signin');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refreshTokenFromStorage = localStorage.getItem('refresh_token');
    
    if (token) {
      getUserInfo(token); // دریافت اطلاعات کاربر با توکن موجود
    } else if (refreshTokenFromStorage) {
      refreshToken(refreshTokenFromStorage); // استفاده از توکن تازه‌سازی برای دریافت توکن جدید
    } else {
      setLoading(false); // اگر هیچ توکنی نباشد، بارگذاری تمام می‌شود
    }
  }, []);

  if (loading) return <div>Loading...</div>; // صفحه در حال بارگذاری

  return (
    <AuthContext.Provider value={{ userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
