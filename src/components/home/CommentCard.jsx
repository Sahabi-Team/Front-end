import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";

const CoachTestimonialCard = ({
  name,
  avatar,
  role,
  rating,
  comment,
  showLeftPin = false,
  showRightPin = false,
}) => {
  return (
    <Card
      sx={{
        width: {xs:320 , sm:370},
        minHeight: 260,
        height: 500,
        borderRadius: 4,
        boxShadow: 6,
        mx: "auto",
        direction: "rtl",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* بالای بنفش */}
      <Box
        sx={{
          width: "100%",
          height: 120,
          bgcolor: "#31113E",
          borderRadius: 4,
          borderBottomLeftRadius: "100% 60%",
          borderBottomRightRadius: "100% 60%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {/* پین سمت راست */}
        {showRightPin && (
          <PushPinIcon
            sx={{
              position: "absolute",
              top: -15,
              right: -7,
              fontSize: 32,
              color: "orange",
              transform: "rotate(-20deg)",
              zIndex: 3,
            }}
          />
        )}

        {/* پین سمت چپ */}
        {showLeftPin && (
          <PushPinIcon
            sx={{
              position: "absolute",
              top: -15,
              left: -7,
              fontSize: 32,
              color: "red",
              transform: "rotate(20deg)",
              zIndex: 3,
            }}
          />
        )}
      </Box>

      {/* آواتار */}
      <Avatar
        alt={name}
        src={avatar ? avatar : "https://via.placeholder.com/150"}
        sx={{
          width: 170,
          height: 170,
          border: "4px solid white",
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <CardContent sx={{ pt: 13, pb: 3, px: 3 }}>
        <Typography
          variant="h6"
          component="div"
          align="center"
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 1 }}
        >
          {role}
        </Typography>

        {/* امتیاز */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Rating value={rating} readOnly precision={0.5} />
        </Box>

        {/* متن نظر */}
        <Typography
          variant="body2"
          color="text.primary"
          align="center"
          sx={{ lineHeight: 1.8, mt: 2 }}
        >
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CoachTestimonialCard;

