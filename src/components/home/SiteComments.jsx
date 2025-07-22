import React from "react";
import { Stack, Paper, Box, useMediaQuery, useTheme } from "@mui/material";
import CommentCard from "./CommentCard"; // مسیر صحیح ایمپورت
import etemad from "../../assets/imgs/Comments/etemad.jpg";
import khalaj from "../../assets/imgs/Comments/khalaj.jpg";
import mohsen from "../../assets/imgs/Comments/mohsen.jpg";
import pooya from "../../assets/imgs/Comments/pooya.jpg";
import seyyed from "../../assets/imgs/Comments/seyyed.jpg";

const CustomGridManual = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // true اگه md یا بیشتر

  if (!isMdUp) {
    // 📱 نسخه موبایل (xs یا sm)
    return (
      <Stack spacing={5}>
        <CommentCard
          name="عرفان اعتماد"
          avatar={etemad}
          role="شناگر"
          rating={5}
          comment="تست رایگانی که تو جیمباتو انجام دادم واقعاً دید خوبی بهم داد. فهمیدم بدنم تو چه وضعیه و مربی‌ای که انتخاب کردم دقیقاً مطابق نیازم برام برنامه نوشت. حس می‌کنم دارم هدف‌مندتر تمرین می‌کنم!"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محسن معین فر"
          avatar={mohsen}
          role="کشتی گیر"
          rating={5}
          comment="تو جیمباتو وقتی تمرینی رو بلد نبودم، می‌تونستم خیلی راحت جزئیات اون حرکت رو ببینم. همین باعث شد با اعتماد به نفس بیشتری تمرین کنم. مخصوصاً چت با مربیم خیلی کمکم کرد وقتی سوال داشتم"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="محمد پویا تراشی"
          avatar={pooya}
          role="فوتبالیست"
          rating={5}
          comment="جیمباتو خیلی برام مفید بود چون تونستم یه مربی با سبک مورد علاقه‌ام انتخاب کنم و اون برام برنامه شخصی نوشت. حس خوبی بود که می‌دونستم یکی داره دقیق شرایط منو بررسی می‌کنه"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
          name="کسری خلج"
          avatar={khalaj}
          role="والیبالیست"
          rating={5}
          comment="قبل از اینکه تمرین‌ها رو شروع کنم، یه ارزیابی کامل از وضعیت بدنم انجام دادم. دیدن عددهای مربوط به وزن، قد و درصد چربی بدنم باعث شد بهتر بفهمم باید روی کدوم قسمت‌هام بیشتر کار کنم. همین موضوع باعث شد تمرین‌هام هدفمندتر بشن و انگیزه‌م چند برابر بشه"
          showLeftPin={true}
          showRightPin={true}
        />
        <CommentCard
           name="سید امیر محمد میرشمسی"
          avatar={seyyed}
          role="بسکتبالیست"
          rating={5}
          comment="برنامه‌ای که از مربی تو جیمباتو گرفتم دقیقاً متناسب با سطح و هدفم بود. نکته جالب این بود که می‌تونستم هر حرکتی رو که نمی‌دونستم، ببینم و یاد بگیرم. حس می‌کردم واقعاً دارم پیشرفت می‌کنم"
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
          name="عرفان اعتماد"
          avatar={etemad}
          role="شناگر"
          rating={5}
          comment="تست رایگانی که تو جیمباتو انجام دادم واقعاً دید خوبی بهم داد. فهمیدم بدنم تو چه وضعیه و مربی‌ای که انتخاب کردم دقیقاً مطابق نیازم برام برنامه نوشت. حس می‌کنم دارم هدف‌مندتر تمرین می‌کنم"
          showLeftPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="محسن معین فر"
          avatar={mohsen}
          role="کشتی گیر"
          rating={5}
          comment="تو جیمباتو وقتی تمرینی رو بلد نبودم، می‌تونستم خیلی راحت جزئیات اون حرکت رو ببینم. همین باعث شد با اعتماد به نفس بیشتری تمرین کنم. مخصوصاً چت با مربیم خیلی کمکم کرد وقتی سوال داشتم"
          showRightPin={true}
        />
      </Stack>

      {/* ردیف دوم */}
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="محمد پویا تراشی"
          avatar={pooya}
          role="فوتبالیست"
          rating={5}
          comment="جیمباتو خیلی برام مفید بود چون تونستم یه مربی با سبک مورد علاقه‌ام انتخاب کنم و اون برام برنامه شخصی نوشت. حس خوبی بود که می‌دونستم یکی داره دقیق شرایط منو بررسی می‌کنه"
          showLeftPin={true}
          showRightPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
      </Stack>

      {/* ردیف سوم */}
      <Stack direction="row" spacing={2}>
        <CommentCard
          name="کسری خلج"
          avatar={khalaj}
          role="والیبالیست"
          rating={5}
          comment="قبل از اینکه تمرین‌ها رو شروع کنم، یه ارزیابی کامل از وضعیت بدنم انجام دادم. دیدن عددهای مربوط به وزن، قد و درصد چربی بدنم باعث شد بهتر بفهمم باید روی کدوم قسمت‌هام بیشتر کار کنم. همین موضوع باعث شد تمرین‌هام هدفمندتر بشن و انگیزه‌م چند برابر بشه"
          showLeftPin={true}
        />
        <Box sx={{ width: 370, height: 200 }} />
        <CommentCard
          name="سید امیر محمد میرشمسی"
          avatar={seyyed}
          role="بسکتبالیست"
          rating={5}
          comment="برنامه‌ای که از مربی تو جیمباتو گرفتم دقیقاً متناسب با سطح و هدفم بود. نکته جالب این بود که می‌تونستم هر حرکتی رو که نمی‌دونستم، ببینم و یاد بگیرم. حس می‌کردم واقعاً دارم پیشرفت می‌کنم"
          showRightPin={true}
        />
      </Stack>
    </Stack>
  );
};

export default CustomGridManual;
