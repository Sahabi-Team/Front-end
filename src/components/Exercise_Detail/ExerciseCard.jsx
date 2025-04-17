import React from "react";
import {
  Card,
  Box,
  Stack,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import img from "../../assets/imgs/builder_background.jpg"; // مسیر تصویر

const ExerciseCard = () => {
  const infoTable = [
    ["سطح حرکت", "مبتدی"],
    ["عضلات درگیر", "زیر بغل و پشت"],
    ["نوع تمرین", "قدرتی"],
    ["محل تمرین", "باشگاه"],
    ["وسایل مورد نیاز", "ماشین (لوازم باشگاه)"],
  ];

  const steps = [
    "وزنه مناسب روی دستگاه قرار دهید!",
    "ارتفاع صندلی را به گونه ای تنظیم کنید که دسته‌ها هم سطح سینه‌تان قرار بگیرند.",
    "دسته‌های باز دستگاه را طبق تصویر بگیرید.",
    "همزمان با کشیدن دسته‌ها به سمت خود، شانه‌ها را به سمت عقب ببرید و آرنج خود را خم کنید.",
    "در آخرین نقطه بازو حرکت اندکی مکث کرده و سپس به آرامی به حالت شروع بازگردید.",
    "در تکرارهای بیشتر دسته‌ها را در نقاط پایان بازه حرکت متوقف نکنید تا فشار ناشی از انجام حرکت دائما روی ماهیچه باشد.",
  ];

  return (
    <Card sx={{ borderRadius: 4, p: 2, boxShadow: 4 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {/* ستون چپ: جدول و توضیحات */}
     

        {/* ستون راست: تصویر بک‌گراند */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 2,
            minHeight: 400, // ارتفاع ثابت برای نمایش مناسب تصویر
            position: "relative",
          }}
        >
          {/* تصویر به صورت بک‌گراند */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover", // یا "contain" اگر نمی‌خوای تصویر برش بخوره
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          {/* عنوان روی تصویر */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              bgcolor: "rgba(255,255,255,0.8)",
              textAlign: "center",
              py: 1,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              اج دست باز
            </Typography>
          </Box>
        </Box>
        <Stack spacing={2} flex={1} minWidth={300}>
          {/* جدول مشخصات */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 1,
            }}
          >
            <Grid container>
              {infoTable.map(([label, value], index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      bgcolor: "#e0f7fa",
                      p: 1,
                      borderBottom: "1px solid #ccc",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      p: 1,
                      borderBottom: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  >
                    {value}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>

          {/* نحوه انجام حرکت */}
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 2,
              bgcolor: "#f8f9fa",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: "center", mb: 1 }}
            >
              نحوه انجام حرکت
            </Typography>
            <List>
              {steps.map((step, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemText primary={`• ${step}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ExerciseCard;
