
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileAPI } from '../services/ClientProfileApi.jsx';
import Footer from '../components/Footer.jsx';
import NavBar from "../components/home/NavbarCard.jsx";
import Sidebar from "../components/TrainerSidebar.jsx";
import EditProfileLayout from "../components/TrainerEditProfile/EditProfileLayout.jsx";
import ProfileImageUpload from "../components/TrainerEditProfile/ProfileImageUpload.jsx";
import EditProfileForm from "../components/TrainerEditProfile/EditProfileForm.jsx";

const EditProfile = () => { 
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
          const response = await profileAPI.getProfile();
          console.log(response.data);
          setUserData({
            firstName: response.data.user.first_name || "",
            lastName: response.data.user.last_name || "",
            bio: response.data.user.bio || "",
            experience: response.data.user.experience || "",
            isAvailableForReservation: response.data.user.is_available_for_reservation || false,
            price: response.data.user.price || "",
            specialties: response.data.user.specialties || "",
            certificates: response.data.user.certificates || "",
            username: response.data.user.username || "",
            email: response.data.user.email || "",
            phone: response.data.user.phone_number || "",
            password: "********"
          });
          if (response.data.user.profile_picture) {
            setProfileImageUrl(`https://ighader.pythonanywhere.com${response.data.user.profile_picture}`);
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
        formData.append('reservation_type', userData.reservationType);
        formData.append('price', userData.price);
        formData.append('specialties', userData.specialties);
        formData.append('certificates', userData.certificates);
        formData.append('email', userData.email);
        formData.append('username', userData.username);
        formData.append('phone_number', userData.phone);
        
        if (profileImage) {
          formData.append('profile_picture', profileImage);
        }
        
        await profileAPI.updateProfile(formData);
        alert("اطلاعات با موفقیت به‌روزرسانی شد");
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
      }
    };
    
    const handleRemoveImage = async () => {
      try {
        await profileAPI.deleteAvatar();
        setProfileImage(null);
        setProfileImageUrl(null);
        alert("عکس پروفایل با موفقیت حذف شد");
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
        <Sidebar/>
        <EditProfileLayout>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row-reverse', 
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '50px',
            padding: '20px',
          }}>
            <ProfileImageUpload 
              profileImageUrl={profileImageUrl}
              handleFileChange={handleFileChange}
              handleRemoveImage={handleRemoveImage}
            />
            
            <div style={{ flex: 1 }}>
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
  
