import React from 'react';
import { Stack, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import CommentCard from './CommentCard'; // مسیر صحیح ایمپورت
import etemad from "../../assets/imgs/Comments/etemad.jpg";
import khalaj from "../../assets/imgs/Comments/khalaj.jpg";
import mohsen from "../../assets/imgs/Comments/mohsen.jpg";
import pooya from "../../assets/imgs/Comments/pooya.jpg";
import seyyed from "../../assets/imgs/Comments/seyyed.jpg";

const CustomGridManual = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // true اگه md یا بیشتر

  if (!isMdUp) {
    // 📱 نسخه موبایل (xs یا sm)
    return (
      <Stack spacing={5}>
        <CommentCard
          name="محسن معین فر"
          avatar={etemad}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محسن معین فر"
          avatar="https://via.placeholder.com/150"
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محسن معین فر"
          avatar="https://via.placeholder.com/150"
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محسن معین فر"
          avatar="https://via.placeholder.com/150"
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محسن معین فر"
          avatar="https://via.placeholder.com/150"
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
      </Stack>
    );
  }

  // 🖥 نسخه دسکتاپ (md به بالا)
  return (
    <Stack spacing={10}>
      {/* ردیف اول */}
      <Stack direction="row" spacing={2}>
        <CommentCard
          name="محسن معین فر"
          avatar={etemad}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="محسن معین فر"
          avatar={mohsen}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showRightPin={true}
        />
      </Stack>

      {/* ردیف دوم */}
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="محسن معین فر"
          avatar={pooya}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
          showRightPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
      </Stack>

      {/* ردیف سوم */}
      <Stack direction="row" spacing={2}>
        <CommentCard
          name="محسن معین فر"
          avatar={khalaj}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showLeftPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="محسن معین فر"
          avatar={seyyed}
          role="کشتی گیر"
          rating={5}
          comment="گرفتن برنامه از جیمی‌فیتو خیلی بهم کمک کرد چون میتونستم هر حرکتی که بلد نیستم رو از لیست حرکات ورزشی ببینم و دیدن آنالیز کلی بهم انگیزه زیادی برای ادامه دادن میداد!"
          showRightPin={true}
        />
      </Stack>
    </Stack>
  );
};

export default CustomGridManual;
