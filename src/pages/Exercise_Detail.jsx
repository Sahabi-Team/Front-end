import React from "react";
import ExerciseCard from "../components/Exercise_Detail/ExerciseCard";
import Navbar from "../components/home/NavbarCard";
import { CssBaseline, Box, Typography, Divider, Stack } from "@mui/material";
import Contactus from "../components/Exercise_Detail/ContactUs";
import Footer from "../components/Footer";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Exercise_Detail() {
  return (
    <>
      <Navbar showInitialBorder={true} />
      <CssBaseline enableColorScheme />
      <Box
          sx={{
            flex: 1,
            marginTop: 9,
            marginBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#fff",
                direction: "rtl", // راست‌چین برای عنوان
              }}
            >
              {/* دکمه بازگشت */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1.5, // فاصله بین آیکون و متن
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                    boxShadow: 2,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                      transform: "scale(1.05)",
                    },
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                <Typography variant="h6" color="text.secondary">
                  بازگشت
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight="bold">
                عنوان حرکت
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ mt: 2 }}>
            <ExerciseCard exerciseId={2} />
            <Box sx={{ mt: 7 }}>
              <Contactus />
            </Box>
          </Box>
        </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "100vh",
          width: "100vw",
          // overflowX: "hidden",
          alignContent: "center",
          marginLeft: -8,
          marginTop : 15,
          // marginBottom: -5,
        }}
      >
        <Footer />
      </Box>
    </>
  );
}
