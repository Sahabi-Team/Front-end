import React, { useState, useEffect, } from "react";
import { Box, Container, Typography, Grid, Stack, Pagination, useMediaQuery, useTheme  } from "@mui/material";
import SearchBar from "../components/ListOfExercises/SearchBar";
import ExerciseFilters from "../components/ListOfExercises/FiltersSidebar";
import ExerciseCard from "../components/ListOfExercises/ExerciseCard";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/home/NavbarCard";

const ExercisesPage = () => {
  const [allExercises, setAllExercises] = useState([]); // تمام تمرینات دریافت شده از بک‌اند
  const [displayedExercises, setDisplayedExercises] = useState([]); // تمرینات نمایش داده شده در صفحه فعلی
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    level: [],
    type: [],
    muscles: [],
    equipment: [],
  });

  // حالت صفحه‌بندی
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;

  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:1200px)');
  const location = useLocation();
  useEffect(() => {
    if (location.state?.muscle) {
      const muscleFromNav = location.state.muscle;
      const newFilters = {
        ...filters,
        muscles: [muscleFromNav],
      };
      setFilters(newFilters);
      fetchAllExercises(newFilters);
  
      // پاک کردن state برای جلوگیری از اجرای دوباره
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);


  // دریافت تمام تمرینات از بک‌اند
  const fetchAllExercises = async (customFilters = filters) => {
    setIsLoading(true);
    try {
      const params = {};
  
      if (searchTerm) params.search = searchTerm;
      if (customFilters.level.length > 0) params.difficulty = customFilters.level.join(',');
      if (customFilters.type.length > 0) {
        params.tags = customFilters.type.map(t => t.id || t).join(',');
      }
      if (customFilters.muscles.length > 0) {
        params.muscle_groups = customFilters.muscles.map(m => m.id || m).join(',');
      }
      
      if (customFilters.equipment.length > 0) {
        params.equipments = customFilters.equipment.map(e => e.id || e).join(',');
      }
      console.log(params);
      const response = await axios.get('http://84.234.29.28:8000/api/exercises/filter', { params });
     console.log(response);
      setAllExercises(response.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // محاسبه تمرینات صفحه جاری
  const updateDisplayedExercises = () => {
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    setDisplayedExercises(allExercises.slice(indexOfFirstExercise, indexOfLastExercise));
  };

  // هر بار که فیلترها یا عبارت جستجو تغییر می‌کند، داده‌ها را مجدداً دریافت کنید
  useEffect(() => {
    fetchAllExercises();
  }, [filters, searchTerm]);
  
  // هر بار که تمام تمرینات یا صفحه فعلی تغییر کرد، لیست نمایش داده شده را به‌روز کنید
  useEffect(() => {
    updateDisplayedExercises();
  }, [allExercises, currentPage]);

  // تابع جستجو
  const handleSearchResults = (term) => {
    setSearchTerm(term);
  };

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

  
  // حالت دسکتاپ
  const DesktopView = () => (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "250vh",
         // minHeight:"100vh",
          pt: 15,
          pb: 6,
         
        }}
      >
        <Container maxWidth="lg" sx={{ px: 0 }}>
          <Typography 
            variant="h4"
            sx={{
              color: "black",
              mb: 4,
              textAlign: "center"
            }}
          >
            چطوری این حرکت رو بزنم؟ جوابش این پایینه!
          </Typography>

          <Box sx={{
            backgroundColor: "#00A359",
            height: "100px",
            borderRadius: "8px",
            mb: 8,
            padding: 3,
            width: "100%",
            position: 'relative',
            alignItems: "center",
              display: "flex",
            justifyContent: "center",
          
          }}>
            <Stack 
              direction="row"
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
                mt: 25
              }}
            >
              <Box sx={{ 
                width: "250px",
                //marginRight: 0.1,
                marginLeft: -2 
              }}>
                <ExerciseFilters 
                  filters={filters}
                  setFilters={setFilters}
                  onApply={applyFilters}
                />
              </Box>
              <Box sx={{ 
                flexGrow: 1,
                maxWidth: "80%", 
              }}>
                <SearchBar onResults={handleSearchResults} />
              </Box>
            </Stack>
          </Box>

          {isLoading && (
            <Typography textAlign="center" my={4}>در حال دریافت تمرینات...</Typography>
          )}

          <Grid container spacing={0.1} sx={{ 
            marginTop: 4,
            marginLeft: 40,
            width: "80%"
          }}>
            {displayedExercises.map((exercise) => (
              <Grid item xs={12} sm={6} md={6}key={exercise.id} sx={{ marginBottom: 1, marginTop: 6 }} >
                <ExerciseCard {...exercise} sx={{ 
                  width: "100%",
                  borderRadius: 0,
                  borderLeft: "none"
                }} />
              </Grid>
            ))}
          </Grid>

          {allExercises.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, ml: 45 }}>
              <Pagination
                count={Math.ceil(allExercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#00A359',
                    '&.Mui-selected': {
                      backgroundColor: '#00A359',
                      color: 'white',
                    },
                  }
                }}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );

  // حالت موبایل
  const MobileView = () => (
    <>
      <Box
        sx={{
          
          backgroundColor: "white",
          minHeight: "100vh",
          maxHeight: "300vh",
          pt: { xs: 12, sm: 15 },
          pb: 6,
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h4"
            sx={{
              color: "black",
              mb: 4,
              textAlign: "center"
            }}
          >
            چطوری این حرکت رو بزنم؟ جوابش این پایینه!
          </Typography>

          <Box
            sx={{
              backgroundColor: "#00A359",
              borderRadius: "8px",
              mb: 4,
              p: { xs: 2, sm: 4 },
              width: '100%',
              mx: 'auto',
              minHeight: '0px',
            }}
          >
            <Stack
              direction="column-reverse"
              spacing={2}
              alignItems="stretch"
            >
              <Box sx={{ width: "100%" }}>
                <ExerciseFilters
                  filters={filters}
                  setFilters={setFilters}
                  onApply={applyFilters}
                />
              </Box>

              <Box sx={{ flex: 1 ,width: "95%"}}>
                <SearchBar onResults={handleSearchResults} />
              </Box>
            </Stack>
          </Box>

          {isLoading && (
            <Typography textAlign="center" my={4}>در حال دریافت تمرینات...</Typography>
          )}

          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: 'center',
              mt: 2,
             // ml:5
            }}
          >
            {displayedExercises.map((exercise) => (
              <Grid item xs={12}  key={exercise.id}>
                <ExerciseCard {...exercise} />
              </Grid>
            ))}
          </Grid>

          {allExercises.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, width: '100%' }}>
              <Pagination
                count={Math.ceil(allExercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#00A359',
                    '&.Mui-selected': {
                      backgroundColor: '#00A359',
                      color: 'white',
                    },
                  }
                }}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );

  return (
    <>
      <NavBar />
      {isMobile ? <MobileView /> : <DesktopView />}
      <Footer />
    </>
  );
};

export default ExercisesPage;