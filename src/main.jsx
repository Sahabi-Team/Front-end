import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material';
import { RtlProvider } from './utils/RTLProvider.jsx';
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn",
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RtlProvider>
  </StrictMode>,
)
