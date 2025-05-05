import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Stack, Pagination, useMediaQuery, useTheme, CssBaseline  } from "@mui/material";
import SearchBar from "../components/ListOfTrainers/SearchBar";
import CoachFilters from "../components/ListOfTrainers/FiltersSidebar";
import CoachCard from "../components/ListOfTrainers/CoachCard.jsx";
import Navbar from "../components/home/NavbarCard";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TrainersList = () => {
  const [allCoaches, setAllCoaches] = useState([]); // تمام تمرینات دریافت شده از بک‌اند
  const [displayedCoaches, setDisplayedCoaches] = useState([]); // تمرینات نمایش داده شده در صفحه فعلی
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    specialties: [],
    experience: [],
    rating: [],
    priceRange: { min: "", max: "" },
    availability: "all",
  });

  // حالت صفحه‌بندی
  const [currentPage, setCurrentPage] = useState(1);
  const CoachesPerPage = 10;

  const location = useLocation();
  useEffect(() => {
    if (location.state?.muscle) {
      const muscleFromNav = location.state.muscle;
      const newFilters = {
        ...filters,
        muscles: [muscleFromNav],
      };
      setFilters(newFilters);
      fetchAllCoaches(newFilters);
  
      // پاک کردن state برای جلوگیری از اجرای دوباره
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);


  // دریافت تمام مربی ها از بک‌اند
  const fetchAllCoaches = async (customFilter = filters) => {

    const convertExperience = (expLabel) => {
      const map = {
        "۱ تا ۳ سال": "1-3",
        "۳ تا ۶ سال": "3-6",
        "۶ تا ۱۰ سال": "6-10",
        "بیشتر از ۱۰ سال": "10-100000",
      };
      return map[expLabel];
    };

    const convertRating = (ratingLabel) => {
      const englishNumber = ratingLabel.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
      return englishNumber.replace("+", "");
    };

    setIsLoading(true);
    try {
      const params = {};
  
      if (searchTerm)
        params.search = searchTerm;
      if (customFilter.specialties.length > 0)
        params.specialties = customFilter.specialties.join(",");
      if (customFilter.experience.length > 0)
        params.experience = customFilter.experience.map(convertExperience).join(",");
      if (customFilter.rating.length > 0)
        params.rating = customFilter.rating.map(convertRating).join(",");
      if (customFilter.priceRange.min)
        params.price_min = customFilter.priceRange.min;
      if (customFilter.priceRange.max)
        params.price_max = customFilter.priceRange.max;
      if (customFilter.availability === "available")
        params.available = true;

      console.log("فیلترهای ارسالی به بک‌اند:", params);
      const response = await axios.get("https://ighader.pythonanywhere.com/api/trainer/trainers/filter", { params });
      setAllCoaches(response.data || []);
      setCurrentPage(1);
      console.log("همه مربیان:", allCoaches);
    }
    catch (error) {
      console.error("Error fetching Coaches:", error);
    }
    finally {
      setIsLoading(false);
    }
  };
  

  // هر بار که فیلترها یا عبارت جستجو تغییر می‌کند، داده‌ها را مجدداً دریافت کنید
  useEffect(() => {
    fetchAllCoaches();
  }, [filters, searchTerm]);
  
  // هر بار که تمام مربیان یا صفحه فعلی تغییر کرد، لیست نمایش داده شده را به‌روز کنید
  useEffect(() => {
    const lastCoachIndex = currentPage * CoachesPerPage;
    const firstCoachIndex = lastCoachIndex - CoachesPerPage;
    setDisplayedCoaches(allCoaches.slice(firstCoachIndex, lastCoachIndex));
  }, [allCoaches, currentPage]);

  // تابع جستجو
  // const handleSearchResults = (term) => {
  //   setSearchTerm(term);
  // };

  // تابع اعمال فیلترها
  const applyFilters = () => {
    // نیازی به فراخوانی fetchAllExercises() نیست چون useEffect آن را مدیریت می‌کند
    // فقط صفحه به 1 بازمی‌گردد
    setCurrentPage(1);
  };

  // تغییر صفحه
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //For Responsiveness
  const isScreenBelow700 = useMediaQuery("(max-width:700px)");
  const isScreenBelow1050 = useMediaQuery("(max-width:1050px)");
  
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Navbar />
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg" sx={{flexGrow: 1, mt: 6, p: 6}}>
        <Typography fontSize={32} mb={4}>
          بیا بهترین مربی رو انتخاب کنیم!
        </Typography>

        <Box sx={{display: "flex", flexDirection: isScreenBelow700 ? "column" : "row", gap: 5, alignItems: "flex-start"}}>
          {/*Filter*/}
          <Box sx={{width: isScreenBelow700 ? "100%" : "25%", minWidth: "240px", order: isScreenBelow700 ? 1 : 0}}>
            <CoachFilters filters={filters} setFilters={setFilters} onApply={applyFilters} />
          </Box>

          {/*Cards*/}
          <Box sx={{flexGrow: 1, order: isScreenBelow700 ? 2 : 0}}>
            <SearchBar onResults={setSearchTerm} />

            {isLoading ? (
              <Typography textAlign="center" fontSize={20} my={5}>
                در حال دریافت مربی‌ها ...
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {allCoaches.map((coach, index) => (
                  <Grid item xs={12} sm={isScreenBelow1050 ? 12 : 6} key={index}>
                    <CoachCard coach={coach} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

      </Container>
      <Footer />
    </Box>
  );
};

export default TrainersList;