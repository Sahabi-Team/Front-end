// utils/auth.js
export const isUserLoggedIn = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
  
    return !!accessToken && !!refreshToken;
  };
  