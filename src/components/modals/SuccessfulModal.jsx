import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { keyframes } from "@mui/system";

// Keyframes for the checkmark animation
const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const SuccessModal = ({ open, onClose, successMessage }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white", // White background
          color: "#4CAF50", // Green text
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {/* Animated Checkmark */}
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 48,
            color: "#4CAF50",
            animation: `${checkmarkAnimation} 0.5s ease-in-out`,
          }}
        />

        {/* Success Message Title */}
        <Typography id="success-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: "#4CAF50" }}>
          
        </Typography>

        {/* Dynamic Success Message */}
        <Typography id="success-modal-description" sx={{ mt: 2, color: "#4CAF50" }}>
          {successMessage}
        </Typography>

        {/* Close Button */}
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 3,
            bgcolor: "#4CAF50",
            color: "white",
            "&:hover": {
              bgcolor: "#45a049",
            },
          }}
        >
          بستن
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;