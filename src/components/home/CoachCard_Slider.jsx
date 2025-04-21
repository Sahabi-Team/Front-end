import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
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

export default function CoachSlider() {
  const isMediumOrLarger = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const swiperRef = useRef(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  // داده‌ها رو از API می‌گیریم
  useEffect(() => {
    fetch("https://ighader.pythonanywhere.com/api/trainer/trainers/filter/")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          name: item.name,
          specialty: item.expertise,
          experience: item.experience_years,
          price: 0, // اگر از API نیومده، مقدار پیش‌فرض
          rating: item.rating,
          image: item.profile_picture || "https://i.pravatar.cc/150?img=10", // پیش‌فرض در صورت نبودن عکس
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
        swiperRef.current?.swiper.autoplay?.restart();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            480: { slidesPerView: 1, spaceBetween: 24 },
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
            sx={navButtonStyles}
          >
            <ChevronRight fontSize="medium" />
          </IconButton>
          <IconButton
            onClick={() => swiperRef.current?.swiper.slideNext()}
            sx={navButtonStyles}
          >
            <ChevronLeft fontSize="medium" />
          </IconButton>
        </Box>

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
            width: 390px;
            transition: all 0.5s ease;
            transform-style: preserve-3d;
          }
          @media (min-width: 600px) {
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
    <Grid container spacing={2} sx={{ alignItems: "center", my: 4 }}>
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => swiperRef.current?.swiper.slidePrev()} sx={navButtonStyles}>
          <ChevronRight fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ width: "100%", px: 2 }}>
          <Swiper
            ref={swiperRef}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            coverflowEffect={{
              rotate: 40,
              stretch: -20,
              depth: 150,
              modifier: 1.5,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            style={{ paddingBottom: "40px" }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 50 },
              1024: { slidesPerView: "auto", spaceBetween: 60 },
            }}
          >
            {coaches.map((coach, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    padding: "16px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CoachCard {...coach} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton onClick={() => swiperRef.current?.swiper.slideNext()} sx={navButtonStyles}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const navButtonStyles = {
  backgroundColor: "primary.main",
  color: "white",
  "&:hover": {
    backgroundColor: "primary.dark",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease",
  boxShadow: 3,
  width: 56,
  height: 56,
};
