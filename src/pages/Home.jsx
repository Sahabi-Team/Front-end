import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { CssBaseline, Box, Typography, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import BannerCard from "../components/home/BannerCard";
import NavBar from "../components/home/NavbarCard";
//  import NavBar from "../components/Navbar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonIcon from "@mui/icons-material/Person";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import patternImage from "../assets/imgs/home/Background_Page.png";
import FeaturesGrid from "../components/home/Featured_Grid";
import GreenGradientBar from "../components/home/Seprator";
import CoachCard from "../components/home/TrainerCard";
import CoachSlider from "../components/home/CoachCard_Slider";
import CommentCard from "../components/home/CommentCard";
import SiteComments from "../components/home/SiteComments";
import Footer from "../components/Footer";
import { useEffect } from "react";

const FullListButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CoachListButton = () => {
  return (
    <FullListButton variant="contained" sx={{ ml: 2 }}>
      مشاهده لیست کامل مربی‌ها
    </FullListButton>
  );
};



const AnimatedCounter = ({ end, duration = 2 }) => {
  // محاسبه گام و مدت زمان بر اساس مقدار نهایی
  let step = 10;
  if (end > 100) {
    step = 10;
  }
  if (end > 500) {
    step = 50;
  }
  if (end > 1000) {
    step = 100;
  }
  const adjustedDuration =
    end > 500
      ? Math.min(duration, end / 500) // برای اعداد بزرگ سرعت بیشتری دارد
      : duration;

  return (
    <CountUp
      end={end}
      duration={adjustedDuration}
      separator=","
      decimals={0}
      useEasing={true}
      start={0}
      step={step}
    />
  );
};

function FullWidthRepeatingBackground({
  imageUrl,
  children,
  repeatDirection = "repeat-y", // یا 'repeat-x' یا 'repeat'
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)", // تصحیح برای centering layout
        overflow: "hidden",
      }}
    >
      {/* لایه بک‌گراند */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: repeatDirection,
          backgroundSize: "auto",
          zIndex: 0,
        }}
      />

      {/* محتوای اصلی */}
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

export default function Home() {
  const [total_clients, setNum1] = useState(null);
  const [total_trainers, setNum2] = useState(null);
  const [total_wp, setNum3] = useState(null);
  const [loading, setLoading] = useState(true);
  // useState
  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch(
            "https://ighader.pythonanywhere.com/api/analytics/total-clients/"
          ),
          fetch(
            "https://ighader.pythonanywhere.com/api/analytics/total-trainers/"
          ),
          fetch(
            "https://ighader.pythonanywhere.com/api/analytics/total-workout-plans/"
          ),
        ]);

        const [data1, data2, data3] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
        ]);

        setNum1(parseInt(data1.total_clients));
        setNum2(parseInt(data2.total_trainers));
        setNum3(parseInt(data3.total_workout_plans));
      } catch (error) {
        console.error("خطا در دریافت اعداد:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);



  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          padding: "0",
          height: "40rem",
          position: "absolute", // تغییر از fixed به absolute
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <BannerCard />
      </Box>

      <NavBar />

      <Box
        sx={{
          position: "relative",
          mt: { xs: "15rem", md: "15rem" },
          ml: { xs: "55%", md: "55%", lg: "65%", xl: "75%" },
          maxWidth: { xs: "90%", md: "30%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "140%", sm: "200%", md: "200%", lg: "250%" },
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          وقتشه شروع کنیم!
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "73%", md: "110%", lg: "140%" },
            color: "text.secondary",
            mb: 1,
            fontWeight: 500,
            marginLeft: "-5%",
          }}
        >
          عضو جیمباتو شو تا استارت کاررو بزنیم
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "73%", md: "110%", lg: "140%" },
            color: "text.disabled",
            fontStyle: "italic",
            marginLeft: { xs: "-2%", md: "20%", lg: "20%" },
          }}
        >
          تازه شروع کاره...
        </Typography>
      </Box>

      <Box
        sx={{
          height: "4px",
          width: "40%",
          ml: "30%",
          mt: 45,
          backgroundImage:
            "linear-gradient(to right, transparent, #009e57, #009e57, #009e57, transparent)",
          borderRadius: "3px",
          boxShadow: "0 2px 12px rgba(76, 175, 80, 0.4)",
        }}
      />

      {/* Stats Section */}
      <Box
        sx={{
          mt: "7rem",
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 3, md: 10, lg: 20, xl: 40 }}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            maxWidth: 1200,
            textAlign: "center",
          }}
        >
          {/* Item 1 - Programs */}
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2.2rem" },
              }}
            >
              <AnimatedCounter end={total_wp} duration={5} />
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                برنامه نوشته شده
              </Typography>
              <FitnessCenterIcon
                sx={{
                  color: "success.light",
                  fontSize: "1.2rem",
                  mr: 1,
                }}
              />
            </Box>
          </Box>

          {/* Item 2 - Users */}
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2.2rem" },
              }}
            >
              <AnimatedCounter end={total_clients} duration={10} />
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                کاربر
              </Typography>
              <PersonIcon
                sx={{
                  color: "info.main",
                  fontSize: "1.2rem",
                  mr: 1,
                }}
              />
            </Box>
          </Box>

          {/* Item 3 - Coaches */}
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2.2rem" },
              }}
            >
              <AnimatedCounter end={total_trainers} duration={5} />
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                مربی آماده
              </Typography>
              <StarBorderIcon
                sx={{
                  color: "warning.main",
                  fontSize: "1.2rem",
                  mr: 1,
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: { xs: "10%", sm: "10%", md: "10%" }, // تغییر margin بر اساس سایز صفحه
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // تغییر سایز فونت
            fontWeight: "bold", // در صورت نیاز
            textAlign: "center", // برای اطمینان از وسطچین بودن متن
          }}
        >
          امکانات ویژه
        </Typography>
      </Box>

      <GreenGradientBar
        animated={true}
        colors={["#009e57", "#009e57", "#009e57"]}
      />

      <FullWidthRepeatingBackground
        imageUrl={patternImage}
        repeatDirection="repeat-y"
      >
        <Box
          sx={{
            p: 0,
            pt: { xs: 4, md: 8 }, // فاصله از بالای بک‌گراند
            pb: { xs: 6, md: 10 }, // فاصله از پایین بک‌گراند
          }}
        >
          <Box sx={{mt:-10}}><FeaturesGrid />
          </Box>
          
          {/* coach part */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: { xs: "5%", sm: "5%", md: "5%" }, // تغییر margin بر اساس سایز صفحه
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // تغییر سایز فونت
                  fontWeight: "bold", // در صورت نیاز
                  textAlign: "center", // برای اطمینان از وسطچین بودن متن
                }}
              >
                مربی های برتر
              </Typography>
            </Box>
            <GreenGradientBar
              animated
              colors={["#ff9800", "#ff5722", "#ff9800"]}
              width="15%"
              marginLeft="42.7%"
            />

            {/* add coaches here  */}
            <Box
              sx={{
                mt: 5,
                px: { xs: 1, md: 2 },
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CoachSlider />
            </Box>

            <CoachListButton />
          </Box>

          {/* {your comments part} */}
          <Box>
            {/* عنوان */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: { xs: "10%", sm: "10%", md: "10%" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                نظرات شما
              </Typography>
            </Box>

            {/* نوار گرادیانی زیبا */}
            <GreenGradientBar
              animated
              colors={["#ff9800", "#ff5722", "#ff9800"]}
              width="15%"
              marginLeft="42.7%"
            />

            {/* قرار دادن کامپوننت وسط صفحه */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <SiteComments />
            </Box>
          </Box>

          {/* Contact with us */}
          <Box sx={{ height: 200 }}></Box>
        </Box>
      </FullWidthRepeatingBackground>
      <Footer />
    </Box>
  );
}
