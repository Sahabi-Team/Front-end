import React from "react";
import { Box, keyframes } from "@mui/material";


const slide = keyframes`
  0% {
    background-position: 300% 0;
  }
  100% {
    background-position: -300% 0;
  }
`;

const GreenGradientBar = ({
  width = "10%",
  marginTop = 3,
  marginLeft = "45%",
  animated = false,
  colors = ["#8BC34A", "#4CAF50", "#8BC34A"],
}) => {
  const gradient = `linear-gradient(to right, transparent, ${colors.join(
    ", "
  )}, transparent)`;

  return (
    <Box
      sx={{
        height: "4px",
        width: width,
        mt: marginTop,
        ml: marginLeft,
        backgroundImage: gradient,
        backgroundSize: "400% auto",
        animation: animated
          ? `${slide} 5s ease-in-out infinite alternate`
          : "none",
        borderRadius: "3px",
        boxShadow: `0 2px 12px ${colors[1]}66`,
      }}
    />
  );
};

export default GreenGradientBar;
