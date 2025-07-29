import React, { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import Typewriter from "typewriter-effect/dist/core";
import coachImg from "../../assets/imgs/home/coach-selection.svg";
import chatImg from "../../assets/imgs/home/chat-with-coach.svg";
import analyticsImg from "../../assets/imgs/home/progress-analytics.svg";
import { useTheme, useMediaQuery } from "@mui/material";

const features = [
  {
    title: "انتخاب مربی دلخواه",
    text: "تو میتونی با مراجعه به قسمت مربی‌ها همه مربی‌ها رو ببینی و با توجه به قیمت و تخصصی که نیاز داری مربی خودت رو انتخاب کنی",
    image: coachImg,
  },
  {
    title: "امکان چت با مربی",
    text: "میتونی به مربی خودت پیام بدی و اگر سوالی راجب به برنامه‌ات داری راحت ازش سوال کنی :)",
    image: chatImg,
  },
  {
    title: "تست بدنسازی",
    text: "با یه تست ساده  که به صورت رایگان هم هست از وضعیت بدنی و مدت زمان رسیدن به هدفت با خبر شو!",
    image: analyticsImg,
  },
];

const responsiveFontSize = {
  fontSize: {
    xs: "1.2rem",
    sm: "1.4rem",
    md: "1.7rem",
    lg: "1.9rem",
  },
};
const responsiveFontSize2 = {
  fontSize: {
    xs: "1rem",
    sm: "1.2rem",
    md: "1.3rem",
    lg: "1.4rem",
  },
};

const OrangeBar = ({ position, alignFarRight = false }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  let top = isMdUp? 0 : "-30%";
  let circleTop = "-6px"; // موقعیت پیش‌فرض برای دایره

  if (position === "middle") {
    top = "50%";
    circleTop = "calc(50% - 7px)";
  }
  if (position === "bottom") {
    top = isMdUp ? "110%" : "100%";
    circleTop = isMdUp ? "calc(100% - 14px)" : "calc(100% - 14px)"; // این می‌تونه همون باشه چون تغییر نمیکنه
  }

  return (
    <Box
      sx={{
        width: "4px",
        height: 200,
        bgcolor: "orange",
        position: "absolute",
        right: alignFarRight ? "-780" : "-10px",
        top,
        transform:
          position === "middle"
            ? "translateY(-50%)"
            : position === "bottom"
            ? "translateY(-100%)"
            : "none",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Box
        sx={{
          width: 14,
          height: 14,
          bgcolor: "orange",
          borderRadius: "50%",
          position: "absolute",
          right: "-5px",
          top: circleTop,
        }}
      />
    </Box>
  );
};

const FeatureBlock = ({ title, text, image, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    if (isInView && !typed) {
      const instance = new Typewriter(`#typewriter-${index}`, {
        delay: 25,
      });
      instance.typeString(text).start();
      setTyped(true);
    }
  }, [isInView, text, typed, index]);

  const alignFarRight = index % 2 !== 0;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: index % 2 === 0 ? "row" : "row-reverse",
        },
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
        py: 1.5, // کاهش بیشتر فاصله عمودی بین بلاک‌ها
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          width: { xs: "100%", md: "45%" },
          mb: { xs: 3, md: 0 },
          p: 2,
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "450px",
            objectFit: "contain",
            margin: "0 auto",
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          position: "relative",
          paddingRight: index === 1 ? "40px" : "0",
        }}
      >
        <OrangeBar
          position={index === 0 ? "top" : index === 1 ? "middle" : "bottom"}
          alignFarRight={alignFarRight}
        />
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
          sx={{ ...responsiveFontSize }}
        >
          {title}
        </Typography>
        <Typography
          id={`typewriter-${index}`}
          sx={{
            mt: 2,
            lineHeight: 2.2,
            ...responsiveFontSize2,
          }}
        ></Typography>
      </Box>
    </Box>
  );
};

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 1.5 }}>
      {features.map((item, idx) => (
        <FeatureBlock key={idx} index={idx} {...item} />
      ))}
    </Box>
  );
}
