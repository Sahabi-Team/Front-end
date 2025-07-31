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
// shape of the bfp part of the card
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
          transform={`translate(105, 100) rotate(${rotation})`}
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
        <Typography variant="h6" fontWeight="bold" >
          {displayValue.toLocaleString('fa-IR')}
        </Typography>
      </Box>
    </Box>
  );
};

// Helper function to get status and message based on BFP value and gender
const getBFPStatus = (bfpValue, gender = 'male') => {
  if (gender === 'male') {
    if (bfpValue < 6) {
      return {
        color: '#ef4444', // red
        message: 'درصد چربی بدنت خیلی پایینه و در محدوده خطرناک قرار داره. باید با یک رژیم غذایی مناسب و متعادل، درصد چربی رو افزایش بدی',
        shortMessage: 'خیلی پایین و خطرناک'
      };
    } else if (bfpValue >= 6 && bfpValue < 14) {
      return {
        color: '#eab308', // yellow
        message: 'درصد چربی بدنت کمه. با یک برنامه تغذیه‌ای متعادل می‌تونی به محدوده سالم برسی',
        shortMessage: 'پایین‌تر از حد نرمال'
      };
    } else if (bfpValue >= 14 && bfpValue <= 20) {
      return {
        color: '#22c55e', // green
        message: 'تبریک! درصد چربی بدنت در محدوده ایده‌آل و سالم قرار داره. با ادامه تمرینات و تغذیه مناسب این شرایط رو حفظ کن',
        shortMessage: 'ایده‌آل و سالم'
      };
    } else if (bfpValue > 20 && bfpValue <= 25) {
      return {
        color: '#f97316', // orange
        message: 'درصد چربی بدنت کمی بالاتر از حد نرماله. با ورزش منظم و رژیم غذایی مناسب می‌تونی به محدوده ایده‌آل برسی',
        shortMessage: 'کمی بالاتر از حد نرمال'
      };
    } else {
      return {
        color: '#ef4444', // red
        message: 'درصد چربی بدنت خیلی بالاست. توصیه می‌کنیم حتماً با یک متخصص تغذیه مشورت کنی و برنامه ورزشی منظم داشته باشی',
        shortMessage: 'خیلی بالاتر از حد نرمال'
      };
    }
  } else { // female
    if (bfpValue < 14) {
      return {
        color: '#ef4444',
        message: 'درصد چربی بدنت خیلی پایینه و در محدوده خطرناک قرار داره. باید با یک رژیم غذایی مناسب و متعادل، درصد چربی رو افزایش بدی',
        shortMessage: 'خیلی پایین و خطرناک'
      };
    } else if (bfpValue >= 14 && bfpValue < 21) {
      return {
        color: '#eab308',
        message: 'درصد چربی بدنت کمه. با یک برنامه تغذیه‌ای متعادل می‌تونی به محدوده سالم برسی',
        shortMessage: 'پایین‌تر از حد نرمال'
      };
    } else if (bfpValue >= 21 && bfpValue <= 27) {
      return {
        color: '#22c55e',
        message: 'تبریک! درصد چربی بدنت در محدوده ایده‌آل و سالم قرار داره. با ادامه تمرینات و تغذیه مناسب این شرایط رو حفظ کن',
        shortMessage: 'ایده‌آل و سالم'
      };
    } else if (bfpValue > 27 && bfpValue <= 32) {
      return {
        color: '#f97316',
        message: 'درصد چربی بدنت کمی بالاتر از حد نرماله. با ورزش منظم و رژیم غذایی مناسب می‌تونی به محدوده ایده‌آل برسی',
        shortMessage: 'کمی بالاتر از حد نرمال'
      };
    } else {
      return {
        color: '#ef4444',
        message: 'درصد چربی بدنت خیلی بالاست. توصیه می‌کنیم حتماً با یک متخصص تغذیه مشورت کنی و برنامه ورزشی منظم داشته باشی',
        shortMessage: 'خیلی بالاتر از حد نرمال'
      };
    }
  }
};

const BFPCard = ({ bfpValue = 15.3, gender = 'male' }) => {
  const status = getBFPStatus(bfpValue, gender);

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
            :BFP شاخص وضعیت
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign:'left',mb: 2 }}>
            (درصد چربی بدن)
          </Typography>
        </Box>

        {/* Gauge Section */}
        <BFPGauge value={bfpValue} />
        
        {/* Status Section */}
        <Box sx={{ mt: 2.5 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: status.color,
              fontSize: '1.1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              mb: 1
            }}
          >
            {status.shortMessage}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight:'bold',
              mt: 2,
              textAlign: 'left',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color:'#000'
            }}
          >
            {status.message}
          </Typography>
        </Box>
      </Box>
    </GreenCard>
  );
};

export default BFPCard;
