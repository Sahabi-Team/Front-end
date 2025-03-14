import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { BorderAll } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import { Paper } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },

}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    if (!username.value || !/\S+@\S+\.\S+/.test(username.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    
    <Card variant="outlined"  sx={{height : '40.7rem',borderRadius :{md: '30px 0 0 30px',xs: '30px 30px 30px 30px'}}}>
      {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box> */}
      <Typography
        component="h2"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom :'1rem' }}
      >
        ورود به حساب کاربری
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
      <FormControl>
  
  <TextField
    error={emailError}
    helperText={emailErrorMessage}
    id="username"
    type="username"
    name="username"
    placeholder="نام کاربری"
    autoComplete="username"
    autoFocus
    required
    fullWidth
    variant="outlined"
    color={emailError ? 'error' : 'primary'}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon/>
          </InputAdornment>
        ),
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px', // گوشه‌های گرد
        backgroundColor: 'background.paper', // رنگ پس‌زمینه
        '& fieldset': {
          borderColor: emailError ? 'error.main' : 'divider', // رنگ border پیش‌فرض
        },
        '&:hover fieldset': {
          borderColor: emailError ? 'error.main' : 'primary.main', // رنگ border هنگام hover
        },
        '&.Mui-focused fieldset': {
          borderColor: emailError ? 'error.main' : 'primary.main', // رنگ border هنگام focus
          boxShadow: emailError
            ? '0 0 0 3px rgba(244, 67, 54, 0.2)' // سایه قرمز هنگام error
            : '0 0 0 3px rgba(0, 163, 89, 0.2)', // سایه سبز هنگام focus
        },
      },
      '& .MuiInputBase-input': {
        padding: '12px 14px', // padding داخلی
        fontSize: '1rem', // اندازه فونت
        color: 'text.primary', // رنگ متن
      },
      '& .MuiInputLabel-root': {
        color: 'text.secondary', // رنگ placeholder
      },
      '& .MuiFormHelperText-root': {
        fontSize: '0.875rem', // اندازه فونت متن راهنما
        color: emailError ? 'error.main' : 'text.secondary', // رنگ متن راهنما
      },
    }}
  />
</FormControl>
        <FormControl>
 
  <TextField
    error={passwordError}
    helperText={passwordErrorMessage}
    name="password"
    placeholder="رمز عبور"
    type="password"
    id="password"
    autoComplete="current-password"
    autoFocus
    required
    fullWidth
    variant="outlined"
    color={passwordError ? 'error' : 'primary'}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      },
    }}
    sx={{
      marginTop : '1rem',
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px', // گوشه‌های گرد
        backgroundColor: 'background.paper', // رنگ پس‌زمینه
        '& fieldset': {
          borderColor: passwordError ? 'error.main' : 'divider', // رنگ border پیش‌فرض
        },
        '&:hover fieldset': {
          borderColor: passwordError ? 'error.main' : 'primary.main', // رنگ border هنگام hover
        },
        '&.Mui-focused fieldset': {
          borderColor: passwordError ? 'error.main' : 'primary.main', // رنگ border هنگام focus
          boxShadow: passwordError 
            ? '0 0 0 3px rgba(244, 67, 54, 0.2)' // سایه قرمز هنگام error
            : '0 0 0 3px rgba(0, 163, 89, 0.2)', // سایه سبز هنگام focus
        },
      },
      '& .MuiInputBase-input': {
        padding: '12px 14px', // padding داخلی
        fontSize: '1rem',    // اندازه فونت
        color: 'text.primary', // رنگ متن
      },
      '& .MuiInputLabel-root': {
        color: 'text.secondary', // رنگ placeholder
      },
      '& .MuiFormHelperText-root': {
        fontSize: '0.875rem', // اندازه فونت متن راهنما
        color: passwordError ? 'error.main' : 'text.secondary', // رنگ متن راهنما
      },
    }}
  />
</FormControl>
        <FormControlLabel sx={{marginRight:'-0.6rem' , marginTop: '1rem'}}
          control={<Checkbox value="remember" color="primary"/>}
          label="مرا به خاطر بسپار"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Box
      display="flex"
      justifyContent="center" // وسط‌چین کردن افقی
      width="100%"           // عرض کامل
    >
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: '50%', // عرض دکمه
          alignItems: 'center',
          marginTop: '1rem',
          backgroundColor: '#00A359', // رنگ پس‌زمینه سبز
          color: '#ffffff',           // رنگ متن سفید
          fontSize: '1rem',        // اندازه فونت
          fontWeight: '600',         // ضخامت فونت
          padding: '12px 24px',      // padding داخلی
          borderRadius: '8px',       // گوشه‌های گرد
          boxShadow: '0 4px 6px rgba(0, 163, 89, 0.2)', // سایه سبز
          transition: 'all 0.3s ease', // انیمیشن نرم
          '&:hover': {
            backgroundColor: '#008A4F', // تغییر رنگ پس‌زمینه هنگام hover
            boxShadow: '0 6px 8px rgba(0, 163, 89, 0.3)', // سایه بیشتر هنگام hover
            transform: 'translateY(-2px)', // حرکت کمی به بالا
          },
          '&:active': {
            backgroundColor: '#007744', // تغییر رنگ پس‌زمینه هنگام کلیک
            boxShadow: '0 3px 5px rgba(0, 163, 89, 0.2)', // سایه کمتر هنگام کلیک
            transform: 'translateY(0)', // بازگشت به موقعیت اولیه
          },
        }}
      >
        ورود
      </Button>
    </Box>
<Link
    component="button"
    type="button"
    onClick={handleClickOpen}
    variant="body2"
    sx={{ 
      marginTop:'1rem',
      textAlign: 'center', 
      textDecoration: 'none', // حذف خط زیر لینک
      color: 'primary.main',  // تغییر رنگ لینک به رنگ اصلی
    }}
  >
    رمز عبور خود را فراموش کردید؟
  </Link>
        <Typography sx={{ textAlign: 'center' }}>
        حساب کاربری ندارید ؟  {'        '}
          <span>
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              
              sx={{ alignSelf: 'center' , textDecoration : 'none' }}
            >
              ثبت نام
            </Link>
          </span>
        </Typography>
      
        <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',   
    width: '100%',          
                      
  }}
>
  
</Box>

        
      </Box>
      <Divider sx={{color:'primary'}}/>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
  fullWidth
  variant="outlined"
  onClick={() => alert('Sign in with Google')}
  startIcon={<GoogleIcon />}
  sx={{
    marginTop:'2rem',
    '& .MuiButton-startIcon': {
      marginLeft: '0.3rem',    // اطمینان از عدم وجود margin-left
    },
  }}
>
  ورود با حساب گوگل
</Button>

      </Box>
    </Card>

    
  );
}
