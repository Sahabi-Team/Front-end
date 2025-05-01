import React from "react";
import { Paper } from "@mui/material";

const EditProfileLayout = ({ children }) => {
  return (
    <div style={{   
      display: 'flex',  
      justifyContent: 'flex-end',  
      alignItems: 'stretch',  
      background: '#E2E2E2',
      width: "90%",
      minHeight: "140vh",
      marginRight: "75px",
     // marginBottom:"30px"
    }}>  
      <Paper   
        elevation={3}   
        sx={{   
          padding: 4,  
          borderRadius: 6,  
          width: '90%',
          minHeight:'120vh',
          height: { xs: '295vh', md: '130vh' }, 
          marginTop: '80px',
          //marginBottom:'10px'
        }}  
      >  
        {children}
      </Paper>  
    </div>
  );
};

export default EditProfileLayout;