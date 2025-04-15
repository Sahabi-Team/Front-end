import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from 'react';
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
import { useMediaQuery, Box, Grid, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function CoachSlider({ coaches }) {
  const isMediumOrLarger = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current?.swiper.autoplay?.restart();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMediumOrLarger) {
    return (
    
       

       
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            loop={true}
            spaceBetween={16}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={false}
            modules={[Pagination, Navigation, Autoplay]}
            style={{ paddingBottom: "24px" }}
          >
            {coaches.map((coach, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "12px",
                    marginInline: "auto",
                    
                  }}
                >
                  <CoachCard {...coach} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
       


    
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
