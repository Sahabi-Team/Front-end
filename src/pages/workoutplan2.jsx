import React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ClientSidebar from "../components/ClientSidebar";
import Vazneh from "../assets/imgs/home/vazneh.png";
import Footer from "../components/Footer.jsx";

const LogoImage = styled("img")(({ theme }) => ({
  height: "70px",
  width: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));



const statusColor = (status) => {
  switch (status) {
    case "در حال انجام":
      return "success";
    case "تمام شده":
      return "default";
    default:
      return "primary";
  }
};

export default function WorkoutPlan() {
  return (
    <>
      <CssBaseline />
      <Stack direction={"column"}>
        <Box>
          <Paper elevation={50}>
            <ClientSidebar />
          </Paper>
        </Box>
        <Box
          sx={{
            width: { xs: "86.67%", md: "86.67%" },
            marginLeft: { xs: 8, md: 28.9 },
            padding: 8,
          }}
        >
          <Stack direction={"column"}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ direction: "rtl", p: 2.5 }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <LogoImage src={Vazneh} alt="لوگو وزنه" />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    صفحه کاربر
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Paper
                elevation={7}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  maxWidth: 1300,
                  height: 1200,
                  mx: "auto",
                  mt: 0,
                  maxHeight: "70vh", // حداکثر ارتفاع
                  overflowY: "auto", // فعال کردن اسکرول عمودی فقط روی پیپر
                }}
              >

                <Stack spacing={3}>
                  <Stack direction={'row'}>
                    <Typography >دوره یک ماهه</Typography>
                    <Typography>بازگشت</Typography>
                  </Stack>
                 
                </Stack>
              </Paper>
            </Box>

            {/* <Footer/> */}
          </Stack>
        </Box>
      </Stack>
    </>
  )
}