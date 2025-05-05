import React from "react";
import { Box, Typography, Button, Rating, Avatar, Card, CardContent, CardActions } from "@mui/material";

const toPersianDigits = (number) =>
  String(number).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const CoachCard = ({ coach, onViewProfile, onOrder }) => {
  return (
    <Card sx={{ position: "relative", overflow: "hidden", minWidth: "360px", borderRadius: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      {/* حلال سبز رنگ */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 120,
          height: "100%",
          bgcolor: coach.isAvailableForReservation ? "#00a651" : "#c4c4c4",
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
          left: 50,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <Avatar
          src={"http://84.234.29.28:8000" + coach.user.profile_picture}
          alt={coach.user.name}
          sx={{
            width: 120,
            height: 120,
            border: "2px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      <CardContent sx={{marginLeft: 22, position: "relative"}}>
        {/* امتیاز */}
        <Box sx={{display: "flex", justifyContent: "right", mb: 1}}>
          <Typography sx={{fontWeight: "bold", border: "1px solid #BCA301", borderRadius: "8px", minWidth: "40px", mr: 1}}>
            {toPersianDigits(coach.rating)}
          </Typography>
          <Rating readOnly value={coach.rating} sx={{direction: "rtl", fontSize: "1.3rem"}} />
        </Box>

        {/* اطلاعات مربی */}
        <Typography align="right" mb={1}>
          نام مربی: {coach.user.name}
        </Typography>
        <Typography align="right" mb={1}>
          تخصص: {coach.specialties}
        </Typography>
        <Typography align="right" mb={1}>
          سطح تجربه: {toPersianDigits(coach.experience)} سال
        </Typography>
        <Box align="right">
          <Typography sx={{ display: "inline" }}>هزینه: </Typography>
          <Typography sx={{ display: "inline", fontWeight: "bold", color: "#f39c12"}}>
            {toPersianDigits(coach.price)} هزار تومان
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{justifyContent: "right", gap: 0.5, mb: 1.5, mr: 1, ml: 12, position: "relative"}}>
        <Button variant="outlined" onClick={() => onViewProfile(coach)} sx={{ borderRadius: "12px", px: 3, py: 0.6, minWidth: "90px", maxWidth: "120px", fontSize: "14px", textWrap: "nowrap"}}>
          مشاهده پروفایل
        </Button>
        <Button variant="contained" onClick={() => onOrder(coach)} disabled={!coach.isAvailableForReservation} sx={{borderRadius: "12px", px: 3, py: 0.6, minWidth: "90px", maxWidth: "120px", fontSize: "14px", textWrap: "nowrap"}}>
          ثبت سفارش
        </Button>
      </CardActions>
    </Card>
  );
};

export default CoachCard;