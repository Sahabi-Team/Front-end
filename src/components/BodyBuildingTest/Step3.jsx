import React, { useEffect } from "react";
import { Typography, Button, Grid2 } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const diseases = [
  { title: "بیماری داخلی", options: ["آسم", "میگرن", "فشار خون", "سنگ کلیه", "چربی خون", "گرفتگی عروق قلب", "اخیراً جراحی شدم"] },
  { title: "بیماری خاص", options: ["دیابت نوع ۱", "دیابت نوع ۲", "کم‌کاری تیروئید", "پرکاری تیروئید", "سکته قلبی", "سکته مغزی", "نقص عضو"] },
  { title: "بیماری اسکلتی", options: ["کمردرد", "آرتروز گردن", "آرتروز زانو", "دیسک گردن", "دیسک کمر", "در رفتگی شانه", "در رفتگی مچ پا"] },
  { title: "ناهنجاری اسکلتی", options: ["کف پای صاف", "خار پاشنه", "گودی کمر", "گردن رو به جلو", "زانوی پرانتزی", "زانوی ضربدری", "تنگی کانال"] },
];


const Step3 = ({data, setData, setIsFormValid}) => {
  const handleChange = (option) => {
    const newSelection = data.includes(option) ? data.filter((item) => item !== option) : [...data, option];
    setData(newSelection);
  };

  useEffect(() => {
    setIsFormValid(true);
  }, []);


  return (
    <Grid2 container spacing={3}>
      {diseases.map(({ title, options }) => (
        <Grid2 size={{xs: 12, sm: 6, md: 3}} key={title}>
          <Typography fontSize={18} fontWeight="bold" mb={2.5}>{title}</Typography>
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => handleChange(option)}
              fullWidth
              sx={{
                justifyContent: "left",
                marginBottom: "16px",
                padding: "10px",
                borderRadius: "25px",
                border: data.includes(option) ? "1px solid #00A359" : "1px solid #ddd",
                backgroundColor: data.includes(option) ? "#E8F5E9" : "#FFFFFF",
                color: "black",
                "&:hover": {borderColor: "#00A359"}
              }}
            >
              {data.includes(option) ? (<CheckCircleIcon color="primary" fontSize="small" />) : (<CircleOutlinedIcon color="action" fontSize="small" />)}
              <Typography variant="button" marginLeft={1}>{option}</Typography>
            </Button>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Step3;