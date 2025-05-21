import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Pagination, useMediaQuery, CssBaseline  } from "@mui/material";
import SearchBar from "../components/ListOfTrainers/SearchBar";
import CoachFilters from "../components/ListOfTrainers/FiltersSidebar";
import CoachCard from "../components/ListOfTrainers/CoachCard.jsx";
import Navbar from "../components/home/NavbarCard";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/modals/SuccessfulModal";
import ErrorModal from "../components/modals/ErrorModal";
import config from '../config';

const TrainersList = () => {
  const [allCoaches, setAllCoaches] = useState([]);
  const [displayedCoaches, setDisplayedCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();
  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const CoachesPerPage = 10;
  
  const [filters, setFilters] = useState({
    specialties: [],
    experience: [],
    rating: [],
    priceRange: { min: "", max: "" },
    availability: "all",
  });

  //Fetch all coaches from backend
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

      const response = await axios.get(`${config.API_BASE_URL}/api/trainer/trainers/filter`, { params });
      setAllCoaches(response.data || []);
      setCurrentPage(1);
    }
    catch (error) {
      console.error("Error fetching Coaches:", error);
    }
    finally {
      setIsLoading(false);
    }
  };
  
  //If filters changed, fetch data again
  useEffect(() => {
    fetchAllCoaches();
  }, [filters, searchTerm]);
  
  //If data changed, reload the pagination
  useEffect(() => {
    const lastCoachIndex = currentPage * CoachesPerPage;
    const firstCoachIndex = lastCoachIndex - CoachesPerPage;
    setDisplayedCoaches(allCoaches.slice(firstCoachIndex, lastCoachIndex));
  }, [allCoaches, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //Handle the Buttons
  const handleViewProfile = (coach) => {
    navigate(`/coach_profile/${coach.trainer_id}`);
  };
  
  const handleOrder = async (coach) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setOpenErrorModal(true);
        console.error("کاربر وارد نشده است.");
        return;
      }

      const response = await axios.post(
        `${config.API_BASE_URL}/api/mentorship/mentorships/`,
        {
          trainer: coach.trainer_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenSuccessModal(true);
    }
    catch (error) {
      setOpenErrorModal(true);
      console.error("خطا در ثبت سفارش:", error);
    }
  };


  //For Responsiveness
  const isScreenBelow700 = useMediaQuery("(max-width:700px)");
  const isScreenBelow1050 = useMediaQuery("(max-width:1050px)");
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Navbar />
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg" sx={{flexGrow: 1, mt: 6, p: 10}}>
        <Typography fontSize={32} mb={4}>
          بیا بهترین مربی رو انتخاب کنیم!
        </Typography>

        <Box sx={{display: "flex", flexDirection: isScreenBelow700 ? "column" : "row", gap: 5, alignItems: "flex-start"}}>
          {/*Filter*/}
          <Box sx={{width: isScreenBelow700 ? "100%" : "25%", minWidth: "240px", order: isScreenBelow700 ? 1 : 0}}>
            <CoachFilters filters={filters} setFilters={setFilters} />
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
                {displayedCoaches.map((coach, index) => (
                  <Grid item xs={12} sm={isScreenBelow1050 ? 12 : 6} key={index}>
                    <CoachCard coach={coach} onViewProfile={handleViewProfile} onOrder={handleOrder} />
                  </Grid>
                ))}
              </Grid>
            )}

            <Pagination
              count={Math.ceil(allCoaches.length / CoachesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                justifyItems: "center",
                mt: 6,
                '& .MuiPaginationItem-root': {
                  color: '#00A359',
                  '&.Mui-selected': {backgroundColor: '#00A359', color: 'white'}
                }
              }}
            />
          </Box>
        </Box>

        <SuccessModal open={openSuccessModal} onClose={() => {setOpenSuccessModal(false); navigate("/");}} successMessage="سفارش شما با موفقیت ثبت شد." />
        <ErrorModal open={openErrorModal} onClose={() => {setOpenErrorModal(false); navigate("/signin");}} errorMessage="سفارش شما ثبت نشد! لطفا ابتدا وارد حساب کاربری خود شوید!" />
      </Container>
      <Footer />
    </Box>
  );
};

export default TrainersList;