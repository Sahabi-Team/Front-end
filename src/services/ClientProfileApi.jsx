// src/services/api.js
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

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 500) {
      window.location.href = '/500';
    }
    return Promise.reject(error);
  }
);

export const profileAPI = {
 
  getProfile: () => api.get('/trainee/info/'),

  updateProfile: (data) => api.put('/trainee/update/', data),

  
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
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

 
  changePassword: (data) => api.post('/auth/change-password/', data)
};
