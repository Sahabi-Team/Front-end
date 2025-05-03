import React from "react";
import { Avatar, Button } from "@mui/material";

const ProfileImageUpload = ({ 
  profileImageUrl, 
  handleFileChange, 
  handleRemoveImage 
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      marginBottom: '40px',
      width: '100%',
      justifyContent: 'flex-end' // چیدمان از راست
    }}>
       {/* دکمه‌ها در سمت راست عکس */}
       <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
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
              height: "35px", // کاهش سایز
              width: "110px", // عرض ثابت
              fontSize: "13px" // فونت کوچکتر
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
            height: "35px", // کاهش سایز
            width: "110px", // عرض ثابت
            fontSize: "13px" // فونت کوچکتر
          }}
          onClick={handleRemoveImage}
        >
          حذف تصویر
        </Button>
      </div>
      {/* عکس با سایز کوچکتر */}
      <Avatar 
        src={profileImageUrl} 
        sx={{ 
          width: 190, // کاهش سایز
          height: 190, // کاهش سایز
          bgcolor: "#ccc",
        }} 
      />
      
     
    </div>
  );
};

export default ProfileImageUpload;