import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';

const InfoSection = () => (
  <Box textAlign={'left'}>
    <Typography fontSize={20} fontWeight="bold">درباره مربی:</Typography>
    <Typography fontSize={18} mt={1} paddingX={2} lineHeight={2}>من صالح اعتمادی هستم با سابقه هفت سال مربی گری حرفه ای در زمینه ورزش های رزمی و و دارنده مدال برنز جودو در مسابقات کشوری در سال ۸۷ .</Typography>

    <Typography mt={3}>
      <Typography component="span" fontSize={20} fontWeight="bold">
        سابقه مربیگری:
      </Typography>
      <Typography component="span" fontSize={18} ml={1}>
        ۷ سال
      </Typography>
    </Typography>

    <Typography mt={3} fontSize={20} fontWeight="bold">مدارک:</Typography>
    <ul style={{fontSize: "18px", lineHeight: "36px"}}>
      <li>مدرک بین‌المللی مربی‌گری از فدراسیون جهانی بدنسازی (IFBB)</li>
      <li>دوره تخصصی تغذیه ورزشی</li>
    </ul>

    <Typography mt={3} fontSize={20} fontWeight="bold">تخصص‌ها:</Typography>
    <ul style={{fontSize: "18px", lineHeight: "36px"}}>
      <li>کاهش وزن</li>
      <li>افزایش حجم عضلانی</li>
      <li>آمادگی جسمانی</li>
      <li>تمرین در خانه (Bodyweight)</li>
    </ul>
    
    <Typography mt={3}>
      <Typography component="span" fontSize={20} fontWeight="bold">
        قابلیت رزرو:
      </Typography>
      <Typography component="span" fontSize={18} ml={1}>
        دارد
      </Typography>
    </Typography>

    <Typography mt={3}>
      <Typography component="span" fontSize={20} fontWeight="bold">
        هزینه دریافتی:
      </Typography>
      <Typography component="span" fontSize={20} fontWeight="bold" color="#f39c12" ml={1}>
        ۲۵۰ هزار تومان
      </Typography>
    </Typography>

    <Box mt={4} textAlign="center">
      <Button variant="contained" fullWidth sx={{maxWidth: 200, borderRadius: 2.5, fontSize: "1.2rem"}}>ثبت سفارش</Button>
    </Box>
  </Box>
);

export default InfoSection;