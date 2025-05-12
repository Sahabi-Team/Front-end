import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
 // padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  color: "black"
}));

const ImageBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const Image = styled("img")(({ theme }) => ({
  maxWidth: "90%",
  height: "auto",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));


function InternalServerErrorPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Root>

         {/* تصویر */}
      <ImageBox>
        <Image src="/internal.svg" alt="500 Error" />
      </ImageBox>
      {/* متن‌ها */}
      <ContentBox>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
          اوه نه ! به نظر میرسه سرور ما خسته شده!
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 ,fontSize: "1.3rem"}}>
          به نظر یک اشتباه فنی رخ داده<br />  و سیستم ما برای لحظه ای از دسترس خارج شده!
        </Typography>
        <Typography variant="body1" sx={{ mb: 1,fontSize: "1.3rem" }}>
          تیم ما در حال بررسی مشکله و خیلی زود <br /> دوباره همه‌چیز مثل قبل خواهد بود
        </Typography>
        <Typography variant="body1" sx={{ mt: 1,fontSize: "1.4rem" }}  fontWeight="bold">
          می‌تونی به{" "}
          <RouterLink
            to="/"
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            صفحه اصلی
          </RouterLink>{" "}
          برگردی
        </Typography>
      </ContentBox>
    </Root>
  );
}

export default InternalServerErrorPage;
