import React, { useState,useEffect  } from "react";  
import { TextField, Button, Avatar, Paper, Typography } from "@mui/material";  
import Sidebar from '../components/ClientSidebar.jsx'; 
import { Routes, Route,useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const EditProfile = () => { 
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
    
        const handleChange = (e) => {  
            const { name, value } = e.target;  
            setUserData({ ...userData, [name]: value });  
        };  
        useEffect(() => {
            document.body.style.background = "#E2E2E2";
            return () => {
                document.body.style.background = "#E2E2E2"; 
            };
        }, []);
        // ✅ تابع اعتبارسنجی  
        const validate = () => {
            let tempErrors = {};
            
            if (userData.fullName) {
                tempErrors.fullName = /^[آ-یa-zA-Z\s]+$/.test(userData.fullName) ? "" : "نام و نام خانوادگی فقط باید شامل حروف باشد!";
            }
                    
            tempErrors.username = userData.username.length >= 3
            ? "" : "نام کاربری باید حداقل ۳ کاراکتر باشد!";

           
            if (userData.email) {
                tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email) ? "" : "ایمیل معتبر نیست!";
            }
    
            if (userData.phone) {
                tempErrors.phone = /^\d{10,11}$/.test(userData.phone) ? "" : "شماره تلفن معتبر نیست!";
            }
    
            setErrors(tempErrors);
            return Object.values(tempErrors).every((x) => x === ""); 
        };
    
        const handleSubmit = (e) => {  
            e.preventDefault();  
            if (validate()) {  
                console.log("Profile data submitted: ", userData);  
            }
        }; 
    
        const handleFileChange = (e) => {  
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        };  
    
        const handleRemoveImage = () => {
            setProfileImage(null);
        };
    

    return ( 
        <div >
        <div style={{   
            display: 'flex',  
            justifyContent: 'center',  
            alignItems: 'stretch',  
            background: '#E2E2E2',
            width:"100%",
           minheight: "160vh",
         
        }}>  
           <Sidebar />
           <Navbar />
            <Paper   
                elevation={3}   
                sx={{   
                    padding: 4,  
                    borderRadius: 6,  
                    backgroundColor: "#F9F9F9", 
                    width: '90%',
                    minheight: '170vh', 
                   height: { xs: '220vh',  md: '130vh' }, 
                    marginTop: '130px', // Space for the navbar  
                    marginRight: '80px', 
                    marginLeft:'80px',
                    marginBottom: '30px', // فاصله از پایین  
                }}  
            >  
            <div style={{ 
                      
                        padding: '25px', 
                        textAlign: 'center', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }} >
                
                 {/* متن ویرایش اطلاعات در سمت راست */}
                 <Typography variant="h5" color="black" fontWeight="bold">
                            ویرایش اطلاعات
                 </Typography>
                 {/* دکمه در سمت چپ */}
                 <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#00A359', color: 'white', width: '150px',
                                height: '50px', borderRadius: "10px" }} 
                            onClick={handleSubmit}
                        >
                            ویرایش
                        </Button>
                
            </div>
        
               
               {/* فریم بالا با دو رنگ: سبز و نارنجی */}
               <div style={{ 
                        background: 'linear-gradient(to bottom, #009451 0%, #D07C28 100%)',
                        padding: '40px', 
                        borderRadius: '8px 8px 8px 8px', 
                        textAlign: 'center' 
                    }}>
                        
                </div>
                    
                  
                 {/* ✅ چیدمان فرم */}
                 <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row-reverse', 
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '100px',
                    padding: '100px'
                }}>
                    

                    {/* ✅ قسمت آپلود عکس (سمت چپ) */}
                    <div style={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       width: '250px',
                       padding: '20px',
                       
                      
                    }}>
                        <Avatar 
                            src={profileImage} 
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

                    {/* ✅ فرم اطلاعات (سمت راست) */}
                    <div style={{ flex: 1, flexDirection: "column", alignItems: "flex-end"  }}>
                        <form onSubmit={handleSubmit} >  
                          <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
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
                            backgroundColor: "#f0f0f0", // پس‌زمینه طوسی روشن
                            borderRadius: "8px", 
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, // حذف حاشیه
                                textAlign: "right",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right", 
                                padding: "12px",
                            },
                            }}
                        />
                           
                           <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right",
                            marginBottom:"10px",
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
                            backgroundColor: "#f0f0f0", // پس‌زمینه طوسی روشن
                            borderRadius: "8px", // گوشه‌های گرد
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                textAlign: "right",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right", 
                                padding: "12px",
                            },
                            }}
                        />
                        <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
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
                            backgroundColor: "#f0f0f0", // پس‌زمینه طوسی روشن
                            borderRadius: "8px", // گوشه‌های گرد
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                textAlign: "right",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right", 
                                padding: "12px",
                            },
                            }}
                        />
                        <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"

                        }}>
                             تلفن
                        </label>
                        <TextField
                            fullWidth
                            placeholder="تلفن خود را وارد کنید"
                            name="phone"
                            type="tel"
                            value={userData.phone} 
                            onChange={handleChange}
                            error={!!errors.phone} 
                            helperText={errors.phone}
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0", // پس‌زمینه طوسی روشن
                            borderRadius: "8px", // گوشه‌های گرد
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                textAlign: "right",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right", 
                                padding: "12px",
                            },
                            }}
                        />
                        <label style={{
                            fontSize: "16px",
                            color: "black",
                            marginBottom: "5px",
                            textAlign: "right"
                        }}>
                                    رمز عبور

                        </label>
                        <TextField
                            fullWidth
                            placeholder=" رمز عبور خود را وارد کنید"
                            name="password" 
                            type="password"
                            value={userData.password} 
                            onChange={handleChange}
                            disabled
                            variant="outlined"
                            sx={{
                            backgroundColor: "#f0f0f0", // پس‌زمینه طوسی روشن
                            borderRadius: "8px", // گوشه‌های گرد
                            marginTop:'10px',
                            marginBottom: "20px", 
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" }, 
                                textAlign: "right",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right",
                                padding: "12px",
                            },
                            }}
                        />
                           
                            <Button type="submit" variant="contained" sx={{ backgroundColor: "#D9F1DE", color: "#00A359", marginTop: 2 }} 
                            onClick={() => window.location.href = "/changePassword"}> 
                                تغییر رمز عبور  
                            </Button>  
                        </form>  
                    </div>
                    </div>
            </Paper>  
            </div> 
         <Footer />
        </div>  
        
    );  
};  

export default EditProfile;
