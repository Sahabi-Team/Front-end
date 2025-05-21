import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const levels = [
  {title: "سطح ۱", desc: "سابقه تمرین ورزشی ندارم، حتی نرم دویدن و بالا رفتن از چند تا پله برام سخته" },
  {title: "سطح ۲", desc: "فقط پیاده روی کردم، گاهی با دوستان تفریحی ورزش میکنم" },
  {title: "سطح ۳", desc: "۶ ماهی هست تمرین بدنسازی نداشتم،گاهی باشگاه رفتم ولی ول کردم" },
  {title: "سطح ۴", desc: "بدنسازی رو دو سه ماه هست که مرتب هفته ای ۳ جلسه انجام میدم" },
  {title: "سطح ۵", desc: "۶ ماهه که به صورت مرتب هفته ای ۴ یا ۵ جلسه تمرین بدنسازی میکنم" },
  {title: "سطح ۶", desc: "مدت زیادیه که با برنامه و مرتب بدنسازی کار میکنم، ورزشکار کاملا حرفه‌ای هستم" },
];



const Step4 = ({data, setData, setIsFormValid}) => {
  const handleChange = (index) => {
    if (data === index) {
      setData(null);
    }
    else {
      setData(index);
    }
  };

  useEffect(() => {
    setIsFormValid(data !== null);
  }, [data]);


  return (
    <Box display="grid" gridTemplateColumns={{xs: "1fr", sm: "1fr 1fr"}} gap={4}>
    {levels.map((level, index) => (
      <Box key={index}>
        <Typography mb={1} color="primary" fontSize={20} fontWeight="bold"> {level.title} </Typography>
        <Button
          onClick={() => handleChange(index)}
          variant="outlined"
          sx={{
              borderRadius: "100px",
              textAlign: "center",
              py: 2,
              px: 3,
              border: data === index ? "2px solid #00A359" : "2px solid #ddd",
              backgroundColor: data === index ? "#E8F5E9" : "#FFFFFF",
              color: "text.primary",
              "&:hover": {borderColor: "#00A359"}
          }}
          >
          <Typography> {level.desc} </Typography>
        </Button>
      </Box>
    ))}
    </Box>
  );
};

export default Step4;