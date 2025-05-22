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

      <Typography lineHeight="2rem">
        برای شروع مسیر تناسب اندام ابتدا باید بدنت رو بهتر بشناسیم!
      </Typography>

      <Typography lineHeight="2rem">
        در این تست کوتاه و رایگان، ما فقط چندتا سوال ازت می‌پرسیم:
      </Typography>

     
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ color: "green", lineHeight: "2rem" }}>✅ قد، وزن و سن</Typography>
        <Typography sx={{ color: "green", lineHeight: "2rem" }}>✅ عضلاتی که دوست داری تقویتشون کنی</Typography>
        <Typography sx={{ color: "green", lineHeight: "2rem" }}>✅ بیماری‌ها یا محدودیت‌های بدنی</Typography>
        <Typography sx={{ color: "green", lineHeight: "2rem" }}>✅ سطح کلی آمادگی جسمانیت</Typography>
      </Box>

      <Typography sx={{ mt: 3 }} >
        با همین اطلاعات، بهت اینارو میگیم:
      </Typography>

     
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ color: "#FF5722", lineHeight: "2rem" }}>🎯 شاخص توده بدنیت (BMI)</Typography>
        <Typography sx={{ color: "#FF5722", lineHeight: "2rem" }}>🎯 درصد چربی بدنت (BFP)</Typography>
        <Typography sx={{ color: "#FF5722", lineHeight: "2rem" }}>🎯 تعداد تقریبی هفته‌هایی که برای رسیدن به هدفت نیاز داری</Typography>
      </Box>

      <Typography sx={{ mt: 5 }} fontWeight="bold">
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
          gap: 10,
          '& .MuiToggleButtonGroup-grouped': {
            marginTop: 3,
            border: '2px solid #ccc',
            borderRadius: '999px !important',
          }
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
            width: 160,
            height: 45,
            backgroundColor: data === "female" ? "#f0f8ff" : "#fff",
            '&:hover': {
              backgroundColor: "#f5f5f5",
            },
            '&.Mui-selected': {
              borderColor: "primary.main",
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", position: "relative", left: 10}}>زن</Typography>
          <Avatar src="/female.png" alt="زن" sx={{ width: 42, height: 42, position: "absolute", left: 0}} />
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
            width: 160,
            height: 45,
            backgroundColor: data === "male" ? "#f0f8ff" : "#fff",
            '&:hover': {
              backgroundColor: "#f5f5f5",
            },
            '&.Mui-selected': {
              borderColor: "primary.main",
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", position: "relative", left: 10}}>مرد</Typography>
          <Avatar src="/male.png" alt="مرد" sx={{ width: 42, height: 42, position: "absolute", left: 0}} />
        </ToggleButton>
      </ToggleButtonGroup>


    </Box>
  );
};

export default Step0;
