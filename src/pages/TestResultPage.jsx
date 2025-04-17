// src/pages/TestResultPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import BMICard from '../components/TestResult/BMICard';

const TestResultPage = () => {
  // State for user data
  const [userData, setUserData] = useState({
    weight: null,
    height: null,
  });

  // State for calculated values
  const [bmi, setBmi] = useState(null);
  const [recommendedWeight, setRecommendedWeight] = useState(null);

  // Calculate BMI
  const calculateBMI = (weight, heightInCm) => {
    if (!weight || !heightInCm) return null;
    const heightInMeters = heightInCm / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  // Calculate recommended weight range based on height and normal BMI range (18.5-25)
  const calculateRecommendedWeight = (heightInCm) => {
    if (!heightInCm) return null;
    const heightInMeters = heightInCm / 100;
    const minWeight = Math.round(18.5 * heightInMeters * heightInMeters);
    const maxWeight = Math.round(25 * heightInMeters * heightInMeters);
    return { min: minWeight, max: maxWeight };
  };

  // Update calculations when user data changes
  useEffect(() => {
    if (userData.weight && userData.height) {
      const calculatedBMI = calculateBMI(userData.weight, userData.height);
      const calculatedRecommendedWeight = calculateRecommendedWeight(userData.height);
      setBmi(calculatedBMI);
      setRecommendedWeight(calculatedRecommendedWeight);
    }
  }, [userData]);

  // TODO: Replace this with actual data fetching
  useEffect(() => {
    // Example: Fetch user data from API or local storage
    // This is where you would get the actual user data
    const fetchUserData = async () => {
      try {
        // Example API call
        // const response = await fetch('/api/user-data');
        // const data = await response.json();
        // setUserData(data);

        // For now, using example data
        setUserData({
          weight: 76,
          height: 175,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {bmi && recommendedWeight && (
              <BMICard 
                bmiValue={bmi}
                weight={userData.weight}
                recommendedWeight={recommendedWeight}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TestResultPage;