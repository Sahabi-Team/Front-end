import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { position } from 'stylis';

const GreenCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
  margin: '10px 0',
  padding: '8px',
  backgroundColor: '#fff',
  direction:'rtl'
}));

const GradientCircle = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  const rotation = (currentValue / 45) * 180 - 90;
  
  return (
    <Box sx={{ 
      width: '80%', 
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <svg viewBox="0 0 240 120" width="100%" >
        <defs>
            <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="200" y2="100" gradientTransform="rotate(180, 100, 100)">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="20%" stopColor="#f97316" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="60%" stopColor="#84cc16" />
                <stop offset="80%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
        </defs>

        {/* Main gradient arc */}
        {/* <path
          d="M 10,100 A 90,90 0 0 1 230,100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="18"
          strokeLinecap="round"
        /> */}
        <path
            d="M 10 100 A 90 90 0 0 1 190 100" // top half of circle
            stroke="url(#gradient)"
            fill="none"
            strokeWidth="20"
            strokeLinecap="round"
        />


        {/* Arrow centered at bottom */}
        <g 
          transform={`translate(120, 100) rotate(${rotation})`}
          style={{
            transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Line */}
          <line x1="0" y1="0" x2="0" y2="-60" stroke="#000" strokeWidth="3" />
          
          {/* Arrow head - more pointed */}
          <path 
            d="M0,-60 L-6,-48 L0,-52 L6,-48 Z" 
            fill="#000" 
            stroke="#000"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </Box>
  );
};

const BFPGauge = ({ value = 15.3 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = step * increment;
      if (step === steps) {
        current = value;
        clearInterval(timer);
      }
      setDisplayValue(current);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      mb: 2
    }}>
    <Box sx={{ 
    position: 'relative',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center',    // Centers vertically
    left: '-15px',
    }}>
    <GradientCircle value={value} />
    </Box>
      <Box sx={{ 
        mt: -2,
        textAlign: 'center' 
      }}>
        <Typography variant="h6" fontWeight="bold">
          {displayValue.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
};

const BFPCard = ({ bfpValue = 15.3 }) => {
  return (
    <GreenCard>
      <Box sx={{ p: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ 
            mb: 0, 
            fontWeight: 'bold',
            direction:'rtl',
            textAlign:'left'
          }}>
            :وضعیت شاخص BFP 
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign:'left',mb: 2 }}>
            (درصد چربی بدن)
          </Typography>
        </Box>

        {/* Gauge Section */}
        <BFPGauge value={bfpValue} />
        
        {/* Status Section */}
        <Box sx={{ mt: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#057542',
              fontSize: '1rem',
              textAlign: 'left'
            }}
          >
            میزان چربی بدنت بین ۱۴-۲۰ درصده و نرماله
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              textAlign: 'left',
              fontSize: '0.9rem',
              lineHeight: 1.8
            }}
          >
            با ورزش کردن و به برنامه ورزشی و غذایی اصولی میتونی عضلات رو بیشتر کنی و تناسب اندام بهتری داشته باشی
          </Typography>
        </Box>
      </Box>
    </GreenCard>
  );
};

export default BFPCard;
