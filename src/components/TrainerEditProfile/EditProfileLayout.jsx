import React from "react";
import { Paper,Box } from "@mui/material";

const EditProfileLayout = ({ children }) => {
  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'flex',
      minHeight: 'calc(100vh - 32px)',
     // padding: '16px',
      transition: 'margin-right 0.3s ease', // Smooth transition for sidebar
    }}
  >
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 6,
        boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.2)', 
        minHeight: 'calc(100vh - 100px)',
        overflow: 'auto',
        width: '85%',
        maxWidth: '1300px',
        padding: '24px',
        margin: 'auto',
        marginTop:'80px'
      }}
    >
      {children}
    </Box>
  </Box>
  );
};

export default EditProfileLayout;