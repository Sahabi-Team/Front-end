import React, { useEffect } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Avatar } from "@mui/material";

const Step0 = ({ data, setData, setIsFormValid }) => {
  useEffect(() => {
    setIsFormValid(!!data);
  }, [data]);

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" >
        تست رایگان چیه؟
      </Typography>

      <Typography >
        برای شروع مسیر تناسب اندام ابتدا باید بدنت رو بهتر بشناسیم!
      </Typography>

      <Typography >
        در این تست کوتاه و رایگان، ما فقط چندتا سوال ازت می‌پرسیم:
      </Typography>

     
      <Box sx={{ mt: 2, lineHeight: "2.2rem" }}>
        <Typography sx={{ color: "green" }}>✅ قد، وزن و سن</Typography>
        <Typography sx={{ color: "green" }}>✅ عضلاتی که دوست داری تقویتشون کنی</Typography>
        <Typography sx={{ color: "green" }}>✅ بیماری‌ها یا محدودیت‌های بدنی</Typography>
        <Typography sx={{ color: "green" }}>✅ سطح کلی آمادگی جسمانیت</Typography>
      </Box>

      <Typography sx={{ mt: 3 }} >
        با همین اطلاعات، بهت اینارو میگیم:
      </Typography>

     
      <Box sx={{ mt: 1, lineHeight: "2.2rem" }}>
        <Typography sx={{ color: "#FF5722" }}>🎯 شاخص توده بدنیت (BMI)</Typography>
        <Typography sx={{ color: "#FF5722" }}>🎯 درصد چربی بدنت (BFP)</Typography>
        <Typography sx={{ color: "#FF5722" }}>🎯 تعداد تقریبی هفته‌هایی که برای رسیدن به هدفت نیاز داری</Typography>
      </Box>

      <Typography sx={{ mt: 3 }} fontWeight="bold">
        برای شروع تست لازم است که جنسیت خود را انتخاب کنید:
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={data}
        onChange={(e, value) => {
          if (value !== null) setData(value);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
       
        <ToggleButton
          value="female"
          disableRipple
          sx={{
             position: "relative", 
            justifyContent: "center", 
            alignItems: "center",
            flexDirection: "row-reverse",
            borderRadius: "999px",
            border: "2px solid",
            borderColor: data === "female" ? "primary.main" : "#ccc",
            padding: "0.5rem 0rem",
            width: 140,
            height: 40,
            backgroundColor: data === "female" ? "#f0f8ff" : "#fff",
            margin: "0 8px",
            '&:hover': {
              backgroundColor: "#f5f5f5",
            },
            '&.Mui-selected': {
              borderColor: "primary.main",
            },
            '&.MuiToggleButtonGroup-grouped': {
              margin: 2,
              borderRadius: "999px",
            },
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" ,position: "absolute",right:30}}>زن</Typography>
        
            <Avatar src="/female.png" alt="زن" sx={{ width: 46, height: 38, position: "absolute",left: 0}} />
        </ToggleButton>

       
        <ToggleButton
          value="male"
          disableRipple
          sx={{
            position: "relative", 
            justifyContent: "center", 
            alignItems: "center",
            flexDirection: "row-reverse",
            borderRadius: "999px",
            border: "2px solid",
            borderColor: data === "male" ? "primary.main" : "#ccc",
            padding: "0.5rem 2rem",
            width: 140,
            height: 40,
            backgroundColor: data === "male" ? "#f0f8ff" : "#fff",
            margin: "0 8px",
            '&:hover': {
              backgroundColor: "#f5f5f5",
            },
            '&.Mui-selected': {
              borderColor: "primary.main",
            },
            '&.MuiToggleButtonGroup-grouped': {
              margin: 2,
              borderRadius: "999px",
            },
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" ,position: "absolute",right:30}}>مرد</Typography>
        
            <Avatar src="/male.png" alt="مرد" sx={{ width: 44, height: 38 ,position: "absolute",left: 0, }} />

        </ToggleButton>
      </ToggleButtonGroup>


    </Box>
  );
};

export default Step0;
