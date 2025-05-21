import axios from 'axios';
import config from './config';


const API_URL = `${config.API_BASE_URL}/api/client_auth/login/`;

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            email,
            password
        });

        if (response.status === 200) {
            // ذخیره توکن‌ها در لوکال استوریج
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            return response.data;
        }
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};
