
import React, { useState,useEffect ,useContext } from "react";  
import { TextField, Button, Avatar, Paper, Typography ,Box} from "@mui/material";  
import { Routes, Route,useNavigate } from "react-router-dom";
import { profileAPI } from '../services/ClientProfileApi.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import config from '../config';
import MainLayout from "../components/MainLayout";

const toPersianDigits = (str) => {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};
const toEnglishDigits = (str) => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};

const EditProfile = () => { 
   const { userInfo } = useContext(AuthContext);
        const navigate = useNavigate();
        const [userData, setUserData] = useState({  
            fullName: "",  
            username: "",  
            email: "",  
            phone: "",  
            password: "********",  
        });  
        const [profileImage, setProfileImage] = useState(null);
        const [errors, setErrors] = useState({});
        const [isLoading, setIsLoading] = useState(false);
        const [apiError, setApiError] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);
        const [profileImageUrl, setProfileImageUrl] = useState(null); 

      
      
      useEffect(() => {
          const fetchUserProfile = async () => {
            try {
            

            const response = await profileAPI.getProfile();
            //   console.log(response.data);
              setUserData({
                fullName: response.data.user.name || "",
                username: response.data.user.username || "",
                email: response.data.user.email || "",
                phone: response.data.user.phone_number|| "",
                password: "********"
              });
             if (response.data.user.profile_picture) {
                setProfileImageUrl(`${response.data.user.profile_picture}`);
}
            } catch (error) {
                console.error("Fetch profile error:", error);
                setApiError("خطا در دریافت اطلاعات پروفایل");
            } finally {
              setIsLoading(false);
            }
          };
      
          fetchUserProfile();
        }, []);

        useEffect(() => {
            if (!userInfo) {
              navigate('/signin');
            }
            if (userInfo.usertype !=="trainee")
            {
            navigate ('/404');
            }
          }, [userInfo, navigate]);
            
    
        const handleChange = (e) => {  
            const { name, value } = e.target;

            let processedValue = value;

            if (name === "phone") {
                processedValue = toEnglishDigits(value);
            }

            setUserData({ ...userData, [name]: processedValue }); 
        };  
        
        useEffect(() => {
            document.body.style.background = "#F5F5F5";
            return () => {
                document.body.style.background = "#F5F5F5"; 
            };
        }, []);
        
       
        const validate = () => {
            let tempErrors = {};
            
            if (userData.fullName) {
                tempErrors.fullName = /^[آ-یa-zA-Z\s]+$/.test(userData.fullName) ? "" : "نام و نام خانوادگی فقط باید شامل حروف باشد!";
            }
                    
            tempErrors.username = userData.username.length >= 3
            ? "" : "نام کاربری باید حداقل ۳ کاراکتر باشد!";

           
            
            tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email) ? "" : "ایمیل معتبر نیست!";
            
    
            if (userData.phone) {
                tempErrors.phone = /^\d{10,11}$/.test(userData.phone) ? "" : "شماره تلفن معتبر نیست!";
            }
    
            setErrors(tempErrors);
            return Object.values(tempErrors).every((x) => x === ""); 
        };
    
        const handleSubmit = async(e) => {  
            e.preventDefault();
    
            if (!validate()) return;
        
            try {
              setIsLoading(true);
              
              const formData = new FormData();
              formData.append('email', userData.email);
              formData.append('username', userData.username);
              formData.append('phone_number', userData.phone);
              formData.append('name', userData.fullName);
              
              if (profileImage) {
                formData.append('profile_picture', profileImage); 
              } else if (profileImageUrl === null) {
                formData.append('delete_profile_picture', true);
              }
              
              await profileAPI.updateProfile(formData);
            
        
              setSuccessMessage("اطلاعات با موفقیت به‌روزرسانی شد");
              setTimeout(() => setSuccessMessage(null), 3000);
            } catch (error) {
                let tempErrors = { ...errors }; 
            
                if (error.response) {
                    // console.log("Status:", error.response.status);
                    // console.log("Data:", error.response.data);
                    // console.log("Headers:", error.response.headers);
            
                  
                    if (error.response.status === 400) {
                        if (error.response.data.username) {
                            tempErrors.username = "نام کاربری تکراری است !";
                        }
            
                        if (error.response.data.email) {
                            tempErrors.email = error.response.data.email[0];
                        }
            
                        if (error.response.data.phone_number) {
                            tempErrors.phone = error.response.data.phone_number[0];
                        }
            
                        if (!tempErrors.username && !tempErrors.email && !tempErrors.phone) {
                            tempErrors.apiError = "خطا در به‌روزرسانی پروفایل";
                        }
                    } else {
                        tempErrors.apiError = "خطای ناشناخته‌ای رخ داده است";
                    }
                } else if (error.request) {
                    // console.log("No response received:", error.request);
                    tempErrors.apiError = "پاسخی از سرور دریافت نشد";
                } else {
                    // console.log("Error setting up request:", error.message);
                    tempErrors.apiError = "خطا در تنظیم درخواست";
                }
            
                setErrors(tempErrors);
            } finally {
                setIsLoading(false);
            }
            
              
          };
         
          const handleFileChange =async (e) => {  
            const file = e.target.files[0];
            if (file) {
              setProfileImage(file);
              setProfileImageUrl(URL.createObjectURL(file)); 
              await profileAPI.uploadAvatar(file);
            }
          };
          
        const handleRemoveImage = async () => {
            try {
            
              await profileAPI.deleteAvatar();
              
              
              setProfileImage(null);
              setProfileImageUrl(null); 
             
              setSuccessMessage("عکس پروفایل با موفقیت حذف شد");
              setTimeout(() => setSuccessMessage(null), 3000);
              
            } catch (error) {
              console.error("حذف عکس ناموفق بود:", error);
              setApiError("خطا در حذف عکس پروفایل");
            }
          };
    
  if (isLoading) {
    return <div>
        
        در حال بارگذاری...
        </div>;
  }


    return ( 
       
       
   
     <MainLayout>
   
            <div style={{ 
                      
                        padding: '10px', 
                        textAlign: 'center', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                         
                    }} >
                
                 
                 <Typography variant="h4" color="black" fontWeight="bold">
                            ویرایش اطلاعات
                 </Typography>
                
                 
                
            </div>
        
        
               <div style={{ 
                        background: 'linear-gradient(to bottom, #009451 0%, #D07C28 100%)',
                        padding: '30px', 
                        borderRadius: '8px 8px 8px 8px', 
                        textAlign: 'center' 
                    }}>
                        
                </div>
                    
                  
                
                 <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row-reverse', 
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '100px',
                    padding: '20px',
                    
                    
                }}>
                    

                   
                    <div style={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       width: '250px',
                       marginLeft:"100px",
                       marginTop:"20px"
                       
                      
                    }}>
                        <Avatar 
                            src={profileImageUrl} 
                            sx={{ width: 200, height: 200, bgcolor: "#ccc",  marginBottom: "30px" ,marginTop:"20px"}} 
                        />
                        <input 
                            accept="image/*" 
                            type="file" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                            id="upload-button"
                        />
                        <label htmlFor="upload-button">
                            <Button 
                                component="span" 
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: "#D9F1DE", 
                                    color: "#00A359", 
                                    width: "100%", 
                                    height: "45px", 
                                    marginBottom: "15px",
                                   // marginLeft:"200px"
                                }}
                            >
                                بارگذاری تصویر
                            </Button>
                        </label>
                        <Button 
                            variant="contained" 
                            sx={{ 
                                backgroundColor: "#D9F1DE", 
                                color: "#00A359", 
                                width: "45%", 
                                height: "45px" ,
                              //  marginLeft:"95px"
                            }}
                            onClick={handleRemoveImage}
                        >
                            حذف تصویر
                        </Button>
                    </div>

                 
                    <div style={{ flex: 1, flexDirection: "column", display: "flex"  }}>
                        <form onSubmit={handleSubmit}style={{ width: "80%" }} >  
                          <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
                            , display: "block"
                        }}>
                            نام و نام خانوادگی
                        </label>
                        <TextField
                            fullWidth
                            placeholder="نام و نام خانوادگی خود را وارد کنید"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                            error={Boolean(errors.fullName)} 
                            helperText={errors.fullName}
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0", 
                            borderRadius: "8px", 
                            marginTop:'10px',
                            marginBottom: "20px", 
                            textAlign: 'right',
                            
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                            },
                            "& .MuiInputBase-input": {
                               
                                padding: "12px",
                            },
                            }}
                        />
                           
                           <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right",
                             display: "block"
                        }}>
                           نام کاربری 
                        </label>
                        <TextField
                            fullWidth
                            placeholder="نام کاربری خود را وارد کنید"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                
                            },
                            "& .MuiInputBase-input": {
                                
                                padding: "12px",
                            },
                            }}
                        />
                        <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
                              , display: "block"
                        }}>
                          ایمیل
                        </label>
                        <TextField
                            fullWidth
                            placeholder="ایمیل  خود را وارد کنید"
                            name="email" 
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                             helperText={errors.email}
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0", 
                            borderRadius: "8px", 
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                              
                            },
                            "& .MuiInputBase-input": {
                              
                                padding: "12px",
                            },
                            }}
                        />
                         
                
                        <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
                              , display: "block"

                        }}>
                             تلفن
                        </label>
                        <TextField
                            fullWidth
                            placeholder="تلفن خود را وارد کنید"
                            name="phone"
                            type="tel"
                            value={toPersianDigits(userData.phone)} 
                            onChange={handleChange}
                            error={!!errors.phone} 
                            helperText={errors.phone}
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0", 
                            borderRadius: "8px", 
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                textAlign: "left",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "left", 
                                padding: "12px",
                            },
                            }}
                        />
                       
                           
                           <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#00A359', color: 'white', width: '150px',
                                height: '50px', borderRadius: "10px" , fontSize: "20px"}} 
                            onClick={handleSubmit}
                        >
                            ویرایش
                        </Button>  
                        </form>  
                    </div>
                    </div>
                   
           
             </MainLayout>
       
        
  
        
    );  
};  

export default EditProfile;
