// components/modals/TestRequiredModal.jsx
import React from "react";
import { Dialog, DialogContent, DialogActions, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // آیکن هشدار قرمز
import { keyframes } from "@mui/system";


const errorIconAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const TestRequiredModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs " PaperProps={{
    sx: {
      width: "350px",
      borderRadius: 2,
    },
  }} > 
      <DialogContent sx={{ textAlign: "center", p: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
           <ErrorOutlineIcon
          sx={{
            fontSize: 60,
            color: "red",
            animation: `${errorIconAnimation} 0.5s ease-in-out`,
          }}
        />

        {/* Error Message Title */}
        <Typography id="error-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: "red" }}>
          خطا!
        </Typography>
        </Box>
        <Typography variant="body1" component="h2" sx={{ mt: 2, color: "red" }}>
          برای ثبت سفارش، ابتدا باید تست بدنسازی انجام دهید.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
      
        <Button
          onClick={onConfirm}
          sx={{
            borderRadius: "999px",
            px: 4,
             border: "2px solid gray",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          
          انجام تست
        </Button>
         <Button
          onClick={onClose}
          sx={{
            borderRadius: "999px",
            px: 4,
            border: "2px solid gray",
            color: "black",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestRequiredModal;
