import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
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
import { useMediaQuery, Box, Grid, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function CoachSlider({ coaches }) {
  const isMediumOrLarger = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const swiperRef = useRef(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (swiperRef.current) {
  //       swiperRef.current?.swiper.autoplay?.restart();
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  if (!isMediumOrLarger) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
        sx={{ my: 4, width: "100%", }}
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
            480: { slidesPerView: 1.1, spaceBetween: 24 },
            720: { slidesPerView: 1.5, spaceBetween: "1%" },
            768: { slidesPerView: 1.5, spaceBetween: "1%" },
          }}
          style={{
            paddingBottom: "40px",
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

        <Box display="flex" justifyContent="center" gap={2}>
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
            <ChevronLeft fontSize="medium" />
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
            <ChevronRight fontSize="medium" />
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
            border-radius: 16px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            padding: 16px;
            width: 390px; /* Default width */
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
    <Grid container spacing={2} sx={{ alignItems: "center", my: 4 }}>
      {/* ستون چپ - دکمه قبلی */}
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
            width: 56,
            height: 56,
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
      </Grid>

      {/* ستون وسط - اسلایدر */}
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
              pauseOnMouseEnter: true, // اختیاری: هنگام هاور ماوس متوقف شود
              waitForTransition: true, // صبر کند تا ترنزیشن کامل شود
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

      {/* ستون راست - دکمه بعدی */}
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-start" }}>
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
            width: 56,
            height: 56,
          }}
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
