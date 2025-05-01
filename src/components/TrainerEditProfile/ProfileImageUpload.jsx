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
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      width: '250px',
      marginLeft: "100px",
      marginTop: "150px"
    }}>
      <Avatar 
        src={profileImageUrl} 
        sx={{ 
          width: 200, 
          height: 200, 
          bgcolor: "#ccc",  
          marginLeft:"90px",
          marginBottom: "30px",
          marginTop: "20px"
        }} 
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
            width: "70%", 
            height: "45px", 
           marginLeft:"70px",
            marginBottom: "15px",
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
          width: "50%", 
          height: "45px",
          marginLeft:"85px",
        }}
        onClick={handleRemoveImage}
      >
        حذف تصویر
      </Button>
    </div>
  );
};

export default ProfileImageUpload;