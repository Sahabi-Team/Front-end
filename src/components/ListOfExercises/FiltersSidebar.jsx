import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExerciseFilters = ({ filters, setFilters, onApply }) => {
  const filterOptions = {
    level: ["مبتدی", "متوسط", "پیشرفته"],
    type: ["قدرتی", "هوازی", "استقامتی", "کششی", "فانکشنال"],
    muscles: ["سینه", "شکم و پهلو", "پا", "سرشانه", "زیر بغل"],
    equipment: ["دمبل", "هالتر", "کش", "استپ", "نیمکت"],
  };

  const handleChange = (filterKey, value) => {
    setFilters((prevFilters) => {
      const current = prevFilters[filterKey] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prevFilters, [filterKey]: updated };
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: 2,
        width: 250,
        boxShadow: 3,
      
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3} color={"black"}  textAlign="left" ml={2}   >
        فیلتر ها
      </Typography>

      {Object.entries(filterOptions).map(([key, options]) => (
        <Accordion key={key} sx={{ mb: 1 }} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {getFilterLabel(key)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={filters[key]?.includes(option) || false}
                      onChange={() => handleChange(key, option)}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={onApply}
        sx={{ mt: 3 ,backgroundColor:"#00A359"}}
      >
        اعمال فیلتر
      </Button>
    </Box>
  );
};

// برچسب فارسی برای هر فیلتر
const getFilterLabel = (key) => {
  switch (key) {
    case "level":
      return "سطح حرکت";
    case "type":
      return "نوع تمرین";
    case "muscles":
      return "عضلات درگیر";
    case "equipment":
      return "وسایل مورد نیاز";
    default:
      return key;
  }
};

export default ExerciseFilters;
