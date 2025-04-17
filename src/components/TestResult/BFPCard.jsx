import React from 'react';
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

const GradientCircle = () => {
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
      <path
        d="M 10,100 A 90,90 0 0 1 230,100"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="18"
        strokeLinecap="round"
        className="transform transition-all duration-1000 ease-in-out"
      />
      {/* <path
        d="M 10,100 A 90,90 0 0 1 230,100"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray="226"
        strokeDashoffset="170"
        className="transform transition-all duration-1000 ease-in-out"
      /> */}
      {/* <text x="10" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۰
      </text>
      <text x="50" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۱۰
      </text>
      <text x="90" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۱۵
      </text>
      <text x="130" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۲۰
      </text>
      <text x="170" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۲۵
      </text>
      <text x="210" y="120" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۳۰
      </text>
      <text x="230" y="80" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۳۵
      </text>
      <text x="210" y="40" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۴۰
      </text>
      <text x="230" y="20" style={{ fontSize: '12px', fill: '#9ca3af' }}>
        ۴۵
      </text> */}

    <g transform="translate(90, 100) rotate(-20)">
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
    </svg>
  );
};

const BFPGauge = ({ value = 15.3 }) => {
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
        <GradientCircle />
      </Box>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        textAlign: 'center' 
      }}>
        <Typography variant="h6" fontWeight="bold">
          {value}
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