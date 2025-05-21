// src/services/TrainerProfileApi.js
import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ریدایرکت به صفحه ارور 500 در صورت دریافت خطای 500
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 500) {
      window.location.href = '/500';
    }
    return Promise.reject(error);
  }
);

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