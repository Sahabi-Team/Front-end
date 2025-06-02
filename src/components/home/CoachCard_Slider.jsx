import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import React, { useRef } from "react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import CoachCard from "./TrainerCard";
import {
  useMediaQuery,
  Box,
  Grid,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import config from '../../config';

export default function CoachSlider() {
  const isMediumOrLarger = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const swiperRef = useRef(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(coaches);

  // داده‌ها رو از API می‌گیریم
  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/trainer/trainers/filter/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data," m");
        const formatted = data.map((item) => ({
          id : item.trainer_id,
          name: item.user.name,
          specialty: item.specialties,
          experience: item.experience,
          price: item.price, // اگر از API نیومده، مقدار پیش‌فرض
          rating: item.rating,
          image: item.user.profile_picture || null, // پیش‌فرض در صورت نبودن عکس
        }));
        setCoaches(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coaches:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current?.swiper.autoplay?.stop();

        swiperRef.current?.swiper.autoplay?.start();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [spaceBetween, setSpaceBetween] = useState(24);

  // تابع محاسبه spaceBetween برای بازه 460 تا 600
  const calculateSpace = (width) => {
    if (width < 460) return 24;
    if (width >= 600) return 10;
    // از 460 تا 600 هر پیکسل، 0.1% کم شود
    let percent = 10 - (width - 460) * 0.9;
    return percent;
  };

  useEffect(() => {
    const updateSpace = () => {
      const w = window.innerWidth;
      setSpaceBetween(calculateSpace(w));
    };

    updateSpace(); // در بارگذاری اولیه

    window.addEventListener("resize", updateSpace);
    return () => window.removeEventListener("resize", updateSpace);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isMediumOrLarger) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{ my: 4, width: "100%" }}
      >
        <Swiper
          ref={swiperRef}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          speed={800}
          grabCursor={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 24 },
            460: { slidesPerView: 1, spaceBetween: 24 },
            720: { slidesPerView: 1.5, spaceBetween: "-%5" },
            768: { slidesPerView: 1.5, spaceBetween: "-7%" },
          }}
          style={{
            paddingBottom: "50px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {coaches.map((coach, index) => (
            <SwiperSlide key={index} className="three-d-slide">
              <Box className="three-d-card">
                <CoachCard {...coach} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box display="flex" justifyContent="center" gap={1}>
          <IconButton
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: 3,
              width: 40,
              height: 40,
            }}
          >
            <ChevronRight fontSize="medium" />
          </IconButton>

          <IconButton
            onClick={() => swiperRef.current?.swiper.slideNext()}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: 3,
              width: 40,
              height: 40,
            }}
          >
            <ChevronLeft fontSize="medium" />
          </IconButton>
        </Box>

        {/* استایل‌های سه‌بعدی */}
        <style jsx>{`
          .three-d-slide {
            display: flex;
            justify-content: center;
            perspective: 1200px;
          }

          .three-d-card {
            background-color: #fff;
            border-radius: 22px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            padding: 13px;
            width: 298px; /* Default width */
            transition: all 0.5s ease;
            transform-style: preserve-3d;
          }

          /* Responsive width using media queries */
          @media (min-width: 600px) {
            /* sm breakpoint */
            .three-d-card {
              width: 407px;
            }
          }

          .swiper-slide-active .three-d-card {
            transform: scale(1.05) rotateY(0deg);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }

          .swiper-slide-prev .three-d-card {
            transform: scale(0.9) rotateY(15deg);
            opacity: 0.8;
          }

          .swiper-slide-next .three-d-card {
            transform: scale(0.9) rotateY(-15deg);
            opacity: 0.8;
          }

          .three-d-card:hover {
            transform: scale(1.06) rotateY(5deg);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </Stack>
    );
  }

  return (
    <Stack
  direction="row"
  alignItems="center"
  justifyContent="center"
  spacing={2}
  sx={{ my: 4, width: "100%" ,px:2}}
>
  {/* Prev */}
  <IconButton
    onClick={() => swiperRef.current?.swiper.slidePrev()}
    sx={{
      backgroundColor: "primary.main",
      color: "white",
      "&:hover": { backgroundColor: "primary.dark", transform: "scale(1.1)" },
      transition: "all 0.3s ease",
      boxShadow: 3,
      width: 40,
      height: 40,
      zIndex: 10,
    }}
  >
    <ChevronRight fontSize="medium" />
  </IconButton>

  {/* Swiper */}
  <Box sx={{ flex: 1, minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
    <Swiper
      ref={swiperRef}
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      speed={800}
      grabCursor={true}
      modules={[Pagination, Autoplay]}
      breakpoints={{
        0: { slidesPerView: 2, spaceBetween: -100 },
        768: { slidesPerView: 1.6 , spaceBetween: 24 },
        1024: { slidesPerView: 1.9, spaceBetween: 24 },
        1300: { slidesPerView: 2.3, spaceBetween: 24 },
        1500: { slidesPerView: 2.5, spaceBetween: 24 },


        1600: { slidesPerView: 3, spaceBetween: 24 },

      }}
      style={{
        paddingBottom: "50px",
        width: "100%",
      }}
    >
      {coaches.map((coach, index) => (
        <SwiperSlide key={index} className="three-d-slide">
          <Box className="three-d-card">
            <CoachCard {...coach} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>

  {/* Next */}
  <IconButton
    onClick={() => swiperRef.current?.swiper.slideNext()}
    sx={{
      backgroundColor: "primary.main",
      color: "white",
      "&:hover": { backgroundColor: "primary.dark", transform: "scale(1.1)" },
      transition: "all 0.3s ease",
      boxShadow: 3,
      width: 40,
      height: 40,
      zIndex: 10,
    }}
  >
    <ChevronLeft fontSize="medium" />
  </IconButton>

  <style jsx>{`
    .three-d-slide {
      display: flex;
      justify-content: center;
      perspective: 1200px;
    }

    .three-d-card {
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
      padding: 16px;
      width: 407px;
      transition: all 0.5s ease;
      transform-style: preserve-3d;
    }

    .swiper-slide-active .three-d-card {
      transform: scale(1.05) rotateY(0deg);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }

    .swiper-slide-prev .three-d-card {
      transform: scale(0.9) rotateY(15deg);
      opacity: 0.8;
    }

    .swiper-slide-next .three-d-card {
      transform: scale(0.9) rotateY(-15deg);
      opacity: 0.8;
    }

    .three-d-card:hover {
      transform: scale(1.06) rotateY(5deg);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
    }
  `}</style>
</Stack>

  );
}
