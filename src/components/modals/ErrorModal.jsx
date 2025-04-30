import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { keyframes } from "@mui/system";

// Keyframes for the error icon animation
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

const ErrorModal = ({ open, onClose, errorMessage }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white", // White background
          color: "red", // Red text
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {/* Animated Error Icon */}
        <ErrorOutlineIcon
          sx={{
            fontSize: 48,
            color: "red",
            animation: `${errorIconAnimation} 0.5s ease-in-out`,
          }}
        />

        {/* Error Message Title */}
        <Typography id="error-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: "red" }}>
          خطا!
        </Typography>

        {/* Dynamic Error Message */}
        <Typography id="error-modal-description" sx={{ mt: 2, color: "red" }}>
          {errorMessage}
        </Typography>

        {/* Close Button */}
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 3,
            bgcolor: "red",
            color: "white",
            "&:hover": {
              bgcolor: "#d32f2f",
            },
          }}
        >
          بستن
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;