// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ighader.pythonanywhere.com/api', // آدرس ثابت بدون استفاده از process.env
});

// افزودن خودکار توکن به هدرها
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   
  }
  return config;
});

export const profileAPI = {
  // دریافت اطلاعات پروفایل کاربر
  getProfile: () => api.get('/trainee/info/'),

  // آپدیت اطلاعات پروفایل
  updateProfile: (data) => api.put('/trainee/update/', data),

  // آپلود عکس پروفایل
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file); // اسم دقیق فیلد
    return api.put('/trainee/update/', formData);
  },

  deleteAvatar: () => {
    const formData = new FormData();
    formData.append('delete_profile_picture', 'true');
  
    return api.put('/trainee/update/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // تغییر رمز عبور
  changePassword: (data) => api.post('/auth/change-password/', data)
};
