import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    // Start animation after a small delay
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  // Calculate rotation based on value (0-45 range maps to -90 to 90 degrees)
  const rotation = (currentValue / 45) * 180 - 90;
  
  return (
    <svg viewBox="0 0 240 120" width="100%">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="20%" stopColor="#22c55e" />
          <stop offset="40%" stopColor="#84cc16" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="80%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      {/* Main gradient arc */}
      <path
        d="M 10,100 A 90,90 0 0 1 230,100"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="18"
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
        <line x1="0" y1="0" x2="0" y2="-60" stroke="#000" strokeWidth="2" />
        
        {/* Arrow head - more pointed */}
        <path 
          d="M0,-60 L-6,-48 L0,-52 L6,-48 Z" 
          fill="#000" 
          stroke="#000"
          strokeWidth="0.5"
        />
      </g>

      {/* Value markers */}
      {/* <g>
        <text x="10" y="115" style={{ fontSize: '12px', fill: '#666', textAnchor: 'middle' }}>0</text>
        <text x="65" y="115" style={{ fontSize: '12px', fill: '#666', textAnchor: 'middle' }}>15</text>
        <text x="120" y="115" style={{ fontSize: '12px', fill: '#666', textAnchor: 'middle' }}>25</text>
        <text x="175" y="115" style={{ fontSize: '12px', fill: '#666', textAnchor: 'middle' }}>35</text>
        <text x="230" y="115" style={{ fontSize: '12px', fill: '#666', textAnchor: 'middle' }}>45</text>
      </g> */}
    </svg>
  );
};

const BFPGauge = ({ value = 15.3 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate the number counting up
    const duration = 1500; // 1.5 seconds to match arrow animation
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = step * increment;
      if (step === steps) {
        current = value; // Ensure we end up at exactly the target value
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
      height: '192px',
      my: 4 
    }}>
      <Box sx={{ 
        position: 'absolute', 
        width: '100%', 
        height: '128px'
      }}>
        <GradientCircle value={value} />
      </Box>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
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
      <CardContent sx={{ textAlign: 'right' }}>
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
        
        <BFPGauge value={bfpValue} />
        
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 2,
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
      </CardContent>
    </GreenCard>
  );
};

export default BFPCard;