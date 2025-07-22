import React, { useState, useEffect, } from "react";
import { Box, Container, Typography, Grid, Stack, Pagination, useMediaQuery, useTheme ,CssBaseline } from "@mui/material";
import SearchBar from "../components/ListOfExercises/SearchBar";
import ExerciseFilters from "../components/ListOfExercises/FiltersSidebar";
import ExerciseCard from "../components/ListOfExercises/ExerciseCard";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/home/NavbarCard";
import config from '../config';


const ExercisesPage = () => {
  const [allExercises, setAllExercises] = useState([]); 
  const [displayedExercises, setDisplayedExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    level: [],
    type: [],
    muscles: [],
    equipment: [],
  });


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
  
      
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);



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
      // console.log(params);
      const response = await axios.get(`${config.API_BASE_URL}/api/exercises/filter`, { params });
    //  console.log(response);
      setAllExercises(response.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      if (error.response?.status === 500) {
          setServerError(true);
        } 
    } finally {
      setIsLoading(false);
    }
  };
 

  const updateDisplayedExercises = () => {
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    setDisplayedExercises(allExercises.slice(indexOfFirstExercise, indexOfLastExercise));
  };

 
  useEffect(() => {
    fetchAllExercises();
  }, [filters, searchTerm]);

useEffect(() => {
  if (serverError) {
    navigate("/500");
  }
}, [serverError, navigate]);


  
  useEffect(() => {
    updateDisplayedExercises();
  }, [allExercises, currentPage]);

 
  const handleSearchResults = (term) => {
    setSearchTerm(term);
  };


  const applyFilters = () => {
    setCurrentPage(1);
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



  const isScreenBelow700 = useMediaQuery("(max-width:700px)");
  const isScreenBelow1050 = useMediaQuery("(max-width:1050px)");


  return (
    <Box sx={{ minHeight: { sm :"450vh",md:"450vh",lg:"280vh"}, display: "flex", flexDirection: "column", backgroundColor: "white" }}>
      <NavBar />
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg" sx={{ flex: 1, mt: 6, p: 10}}>
        <Typography variant="h4" sx={{ color: "black", mb: 4, textAlign: "center" }}>
          چطوری این حرکت رو بزنم؟ جوابش این پایینه!
        </Typography>

       
        {!isScreenBelow700 && (
          <Box sx={{
            backgroundColor: "#00A359",
            height: "150px",
            borderRadius: "8px",
            //mb:{ sm :250,md:250,lg:150},
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start"
          }}>
            <Box sx={{ 
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mt:9,
              
             // alignItems: "flex-end"
            }}>
              <Box sx={{ width: "25%", minWidth: "240px" }}>
                <ExerciseFilters 
                  filters={filters}
                  setFilters={setFilters}
                  onApply={applyFilters}
                />
              </Box>
              <Box sx={{ flexGrow: 1, maxWidth: "70%" ,ml:5}}>
                <SearchBar onResults={handleSearchResults} />

                  {isLoading ? (
                    <Typography textAlign="center" my={4}>در حال دریافت تمرینات...</Typography>
                  ) : (
                    <Grid container spacing={2}   >
                      {displayedExercises.map((exercise) => (
                        <Grid item xs={12} sm={12} md={12} lg={6} key={exercise.id}>
                          <ExerciseCard {...exercise} />
                        </Grid>
                      ))}
                    </Grid>
                  )}

              
                  {allExercises.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
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

              </Box>
            </Box>
          </Box>
        )}

            
        {isScreenBelow700 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ mb: 3 }}>
              <SearchBar onResults={handleSearchResults} />
            </Box>
            <Box>
              <ExerciseFilters 
                filters={filters}
                setFilters={setFilters}
                onApply={applyFilters}
              />
              
             
              <Box sx={{ height: 30 }} />
              
              
              {isLoading ? (
                <Typography textAlign="center" my={4}>در حال دریافت تمرینات...</Typography>
              ) : (
                <Grid container spacing={2}>
                  {displayedExercises.map((exercise) => (
                    <Grid item xs={12} key={exercise.id}>
                      <ExerciseCard {...exercise} />
                    </Grid>
                  ))}
                </Grid>
              )}

              
              {allExercises.length > 0 && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 6,
                  mb: 4
                }}>
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
            </Box>
          </Box>
        )}

      </Container>
      <Footer />
    </Box>
  );
};

export default ExercisesPage;