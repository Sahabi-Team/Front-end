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

const programs = [
  {
    title: "دوره یک ماهه",
    startDate: "1404/1/25",
    status: "در حال انجام",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
  {
    title: "دوره چهل روزه",
    startDate: "1404/1/25",
    status: "تمام شده",
  },
];

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
                  {programs.map((program, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        bgcolor: "#f9f9f9",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="h6" fontWeight="bold">
                          {program.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          (شروع از {program.startDate})
                        </Typography>
                      </Box>
                      <Chip
                        label={program.status}
                        color={statusColor(program.status)}
                        variant="filled"
                        sx={{ minWidth: 80 }}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: 2 }}
                      >
                        مشاهده برنامه
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>

            {/* <Footer/> */}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
