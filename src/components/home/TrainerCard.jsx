import React from "react";
import { Box, Typography, Button, Rating, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const toPersianDigits = (num) => {
  return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const CoachCard = ({ id, name, specialty, experience, price, rating, image }) => {
  const navigate = useNavigate();

  return (
    <Box
  sx={{
    width: { xs: 280, sm: 390 },
    height: {xs:250,sm:280},
    bgcolor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
    p:1,
  }}
>
  {/* حلال سبز رنگ */}
  <Box
    sx={{
      position: "absolute",
      left: 0,
      top: 0,
      width: { xs: 90, sm: 140 }, // ✅ کوچکتر شدن در xs
      height: "100%",
      bgcolor: "#00a651",
      borderTopRightRadius: "100% 60%",
      borderBottomRightRadius: "100% 60%",
      zIndex: 0,
    }}
  />

  {/* آواتار مربی */}
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: { xs: 50, sm: 70 }, // ✅ نزدیک‌تر در xs
      transform: "translateY(-50%)",
      zIndex: 2,
    }}
  >
    <Avatar
      src={image}
      alt={name}
      sx={{
        width: { xs: 90, sm: 125 }, // ✅ کوچکتر شدن آواتار در xs
        height: { xs: 90, sm: 125 },
        border: "4px solid #fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    />
  </Box>

  {/* اطلاعات مربی */}
  <Box
    sx={{
      width: "50%",
      marginLeft: { xs: 17, sm: 24 }, // ✅ شیفت به چپ در xs
      position: "relative",
      zIndex: 1,
    }}
  >
    {/* امتیاز */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        mt: 0,
      }}
    >
      <Typography
        sx={{
          mr: 1,
          fontWeight: "bold",
          fontSize: { xs: "0.8rem", sm: "1rem" },
          border: "2px solid #c1a600",
          borderRadius: "12px",
          px: 1.5,
          py: 0.4,
          color: "#000",
          backgroundColor: "#fff",
          minWidth: "40px",
          textAlign: "center",
        }}
      >
        {toPersianDigits(rating)}/{toPersianDigits(5)}
      </Typography>
      <Box sx={{ direction: "ltr", display: "inline-block" }}>
        <Rating
          name="read-only"
          value={rating}
          precision={0.25}
          readOnly
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem" },
            "& .MuiRating-iconFilled": {
              color: "#f5a623",
            },
            "& .MuiRating-iconEmpty": {
              color: "#ccc",
            },
          }}
        />
      </Box>
    </Box>

    {/* مشخصات مربی */}
    <Box sx={{ mt: 1.5 }}>
      <Typography fontWeight="bold" fontSize={{ xs: "14px", sm: "16px" }} mb={0.5}>
        نام مربی: {name}
      </Typography>
      <Typography fontSize={{ xs: "13px", sm: "15px" }} mb={0.5}>
        تخصص: {specialty}
      </Typography>
      <Typography fontSize={{ xs: "13px", sm: "15px" }} mb={0.5}>
        سطح تجربه: {toPersianDigits(experience)} سال
      </Typography>
      <Typography fontSize={{ xs: "13px", sm: "15px" }} mb={0.5}>
        هزینه دریافتی:
      </Typography>
      <Typography
        sx={{ color: "#f39c12", fontWeight: "bold", fontSize: { xs: "14px", sm: "15px" } }}
      >
        {toPersianDigits(price)} هزار تومان
      </Typography>
    </Box>
  </Box>

  {/* دکمه */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 1,
      mt: 2,
      marginLeft: { xs: 8, sm: 13 }, // ✅ تنظیم فاصله برای دکمه در xs
      position: "relative",
      zIndex: 1,
    }}
  >
    <Button
      variant="outlined"
      onClick={() => navigate(`/trainer_profile/${id}`)}
      sx={{
        borderColor: "#00a651",
        color: "#00a651",
        borderRadius: "12px",
        px: 1.2,
        py: 0.6,
        fontSize: { xs: "12px", sm: "13px" },
        minWidth: 110,
        whiteSpace: "nowrap",
        "&:hover": {
          borderColor: "#008a43",
          color: "#008a43",
          backgroundColor: "rgba(0,166,81,0.05)",
        },
      }}
    >
      مشاهده پروفایل مربی
    </Button>
  </Box>
</Box>

  );
};

export default CoachCard;
