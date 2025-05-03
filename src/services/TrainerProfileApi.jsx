// src/services/TrainerProfileApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://84.234.29.28:8000/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const trainerProfileAPI = {
  // دریافت اطلاعات پروفایل مربی
  getProfile: () => api.get('/trainer/info/'),

  // آپدیت اطلاعات پروفایل مربی
  updateProfile: (data) => api.put('/trainer/update/', data),

  
  // آپلود عکس پروفایل
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file); // اسم دقیق فیلد
    return api.put('/trainer/update/', formData);
  },

  // حذف عکس پروفایل
  deleteAvatar: () => {
    const formData = new FormData();
    formData.append('delete_profile_picture', 'true');
    return api.put('/trainer/update/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};