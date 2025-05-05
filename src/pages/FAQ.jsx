import React from "react";
import { Container, Box, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import AccordionItem from "../components/FAQ/Accordion";
import FAQ_Image from "../assets/imgs/FAQ.png";
import Navbar from "../components/home/NavbarCard";
import Footer from "../components/Footer";

const Questions = [
  { question: "برای انجام تمرین‌های ورزشی حتما باید باشگاه برم؟", answer: "خیر، این شما هستید که محل تمرینتون رو انتخاب می‌کنید و ما با توجه به اون بهتون برنامه ورزشی می‌دیم. خیالتون راحت هم تو خونه هم تو باشگاه می‌تونید ورزش کنید." },
  { question: "اگه حرکتی رو بلد نبودم چیکار کنم؟", answer: "شما می‌تونید ویدیوهای آموزشی ما رو ببینید یا از مربی سوال بپرسید." },
  { question: "توی چندوقت میتونم به وزن ایده آلم برسم؟", answer: "بستگی به برنامه غذایی و تمرینات شما داره." },
  { question: "برای انجام حرکات ورزشی به چه وسایلی نیاز دارم؟", answer: "برای حرکات بدن‌وزنی نیازی به وسیله ندارید، ولی برای تمرینات پیشرفته‌تر، به بعضی از وسایل نیاز دارید که لیست آن ها را در هنگام گرفتن برنامه ورزشی، دریافت می کنید." },
  { question: "آیا میتونم خودم مربی ورزشیمو انتخاب کنم؟", answer: "بله، شما می‌تونید از بین مربی‌های ما انتخاب کنید." },
  { question: "همزمان چندتا برنامه ورزشی میتونم داشته باشم؟", answer: "به هر تعدادی که نیاز داشته باشید، میتونید برنامه ورزشی از مربیان مختلف بگیرید." },
  { question: "اگه از مربیم ناراضی بودم چی؟", answer: "میتونید با پرداخت هزینه یک برنامه ورزشی دیگر از یک مربی متفاوت بگیرید." },
  { question: "کمر و زانوهام درد می‌کنه، می‌تونم از این برنامه استفاده کنم؟", answer: "از اونجا که موقع ثبت نام یه گزارش دقیق از وضعیت جسمانی شما گرفته می‌شه، حرکات ورزشی کاملا با توجه به شرایط و محدودیت‌های شما آماده خواهد شد." },
  { question: "چطوری می‌تونم از مربیان ورزشی مشاوره بگیرم؟", answer: "میتونی همین الان با دادن یک تست رایگان، وضعیت جسمانی خودتو بسنجی و سریعا با مربیان ما ارتباط بگیری." }
];

function FAQPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Navbar />
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{flexGrow: 1, mt: 8, pt: 5, pb: 8, background: "#FFFFFF"}}>
        <img src={FAQ_Image} alt="FAQ_Image" style={{maxWidth: "100%", height: "auto"}} />
        <Typography fontSize={40} fontWeight={700} m={3}>سوالی داری؟</Typography>
        {Questions.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </Container>
      <Footer />
    </Box>
  );
}

export default FAQPage;