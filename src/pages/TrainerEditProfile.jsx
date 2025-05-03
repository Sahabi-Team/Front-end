
import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import {  Typography } from "@mui/material";
import { trainerProfileAPI } from '../services/TrainerProfileApi.jsx';
import Footer from '../components/Footer.jsx';
import NavBar from "../components/home/NavbarCard.jsx";
import Sidebar from "../components/TrainerSidebar.jsx";
import EditProfileLayout from "../components/TrainerEditProfile/EditProfileLayout.jsx";
import ProfileImageUpload from "../components/TrainerEditProfile/ProfileImageUpload.jsx";
import EditProfileForm from "../components/TrainerEditProfile/EditProfileForm.jsx";
import { AuthContext } from '../contexts/AuthContext.jsx';

const EditProfile = () => { 
 
  const { userInfo } = useContext(AuthContext);
   const navigate = useNavigate();
    const [userData, setUserData] = useState({  
      firstName: "",
      lastName: "",
      bio: "",
      experience: "",
      isAvailableForReservation: true,
      price: "",
      specialties: "",
      certificates: "",
      username: "",
      email: "",
      phone: "",
      password: "********",
    });  
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await trainerProfileAPI.getProfile();
          const trainerData = response.data;
          console.log(response.data);
          setUserData({
            firstName: trainerData.user.first_name || "",
            lastName: trainerData.user.last_name || "",
            bio: trainerData.bio || "",
            experience: trainerData.experience || "",
            isAvailableForReservation: trainerData.isAvailableForReservation || false,
            price: trainerData.price || "",
            specialties: trainerData.specialties || "",
            certificates: trainerData.certificates || "",
            username: trainerData.username || "",
            email: trainerData.email || "",
            phone: trainerData.phone_number || "",
            password: "********"
          });
          if (trainerData.user.profile_picture) {
            setProfileImageUrl(`http://84.234.29.28:8000${trainerData.user.profile_picture}`);
          }
        } catch (error) {
          console.error("Fetch profile error:", error);
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
            }, [userInfo, navigate]);
              

    useEffect(() => {
      document.body.style.background = "#E2E2E2";
      return () => {
        document.body.style.background = "#E2E2E2";
      };
    }, []);
  
    const handleChange = (e) => {  
      const { name, value } = e.target;  
      const processedValue = name === "isAvailableForReservation" 
      ? value === "true"
      : value;
    setUserData({ ...userData, [name]: processedValue });
    };  
  
    const validate = () => {
      let tempErrors = {};
      
      if (!userData.firstName) {
        tempErrors.firstName = "نام الزامی است";
      }
      
      if (!userData.lastName) {
        tempErrors.lastName = "نام خانوادگی الزامی است";
      }
      if (!userData.price) {
        tempErrors.price = "هزینه دریافتی الزامی است";
      }
      if (!userData.bio) {
        tempErrors.bio = " بیوگرافی الزامی است";
      }
      if (!userData.certificates) {
        tempErrors.certificates = " مدارک الزامی است";
      }
      if (!userData.experience) {
        tempErrors.experience = " سابقه کار الزامی است";
      }
      if (!userData.specialties) {
        tempErrors.specialties = " تخصص الزامی است";
      }
      if (userData.experience && isNaN(userData.experience)) {
        tempErrors.experience = "سابقه کاری باید عدد باشد";
      }
      
      if (userData.price && isNaN(userData.price)) {
        tempErrors.price = "هزینه باید عدد باشد";
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
        formData.append('first_name', userData.firstName);
        formData.append('last_name', userData.lastName);
        formData.append('bio', userData.bio);
        formData.append('experience', userData.experience);
        formData.append('isAvailableForReservation', userData.isAvailableForReservation);
        formData.append('price', userData.price);
        formData.append('specialties', userData.specialties);
        formData.append('certificates', userData.certificates);
        formData.append('email', userData.email);
        formData.append('username', userData.username);
        formData.append('phone_number', userData.phone);
        
        
        if (profileImage) {
          formData.append('profile_picture', profileImage);
        }
        else if (profileImageUrl === null) {
          formData.append('delete_profile_picture', true);
        }
        
        await trainerProfileAPI.updateProfile(formData);
       // alert("اطلاعات با موفقیت به‌روزرسانی شد");
      } catch (error) {
        console.error("Update error:", error);
        alert("خطا در به‌روزرسانی پروفایل");
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleFileChange = async (e) => {  
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file);
        setProfileImageUrl(URL.createObjectURL(file));
        await trainerProfileAPI.uploadAvatar(file);
      }
    };
    
    const handleRemoveImage = async () => {
      try {
        await trainerProfileAPI.deleteAvatar();
        setProfileImage(null);
        setProfileImageUrl(null);
      //  alert("عکس پروفایل با موفقیت حذف شد");
      } catch (error) {
        console.error("حذف عکس ناموفق بود:", error);
      }
    };
  
    if (isLoading) {
      return (
        <div>
          <NavBar />
          در حال بارگذاری...
        </div>
      );
    }
  
    return (
      <div>
        <NavBar />
        <Sidebar />
        <EditProfileLayout>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* عنوان در سمت راست بالا */}
            <Typography 
          variant="h4" // تغییر از h4 به h5 برای سایز کوچکتر
          component="h1" 
          gutterBottom
          style={{
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
            textAlign: 'right',
            width: '100%',
            paddingRight: '16px'
          }}
        >
          ویرایش اطلاعات
        </Typography>
    
            {/* تصویر پروفایل در وسط */}
            <div style={{
              margin: '0px 0'
            }}>
              <ProfileImageUpload 
                profileImageUrl={profileImageUrl}
                handleFileChange={handleFileChange}
                handleRemoveImage={handleRemoveImage}
              />
            </div>
    
            {/* فرم در وسط صفحه */}
            <div style={{
             width: '100%',
             display: 'flex',
             justifyContent: 'center'
             
            }}>
              <EditProfileForm 
                userData={userData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </EditProfileLayout>
        <Footer />
      </div>
    );
  };  
  
  export default EditProfile;
  
