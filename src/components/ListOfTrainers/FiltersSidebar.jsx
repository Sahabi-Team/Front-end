import React, { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, TextField, InputAdornment, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CoachFilters = ({ filters, setFilters, onApply }) => {
  const filterOptions = {
    specialties: ["قدرتی", "هوازی", "کششی", "استقامتی"],
    experience: ["۱ تا ۳ سال", "۳ تا ۶ سال", "۶ تا ۱۰ سال", "بیشتر از ۱۰ سال"],
    rating: ["۱+", "۲+", "۳+", "۴+", "۵"]
  };

  const getFilterLabel = (key) => {
    switch (key) {
      case "specialties":
        return "تخصص";
      case "experience":
        return "تجربه";
      case "rating":
        return "امتیاز کاربران";
      default:
        return key;
    }
  };

  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [availability, setAvailability] = useState("all");

  const toPersianDigits = (str) =>
    str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const toEnglishDigits = (str) =>
    str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  
  const handlePriceChange = (field) => (e) => {
    const EnglishNumber = toEnglishDigits(e.target.value).replace(/[^\d]/g, ""); //Only English Numbers
    setPriceRange({ ...priceRange, [field]: EnglishNumber });
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

  const handleApply = () => {
    setFilters({
      ...filters,
      priceRange,
      availability
    });
    onApply();
  };

  return (
    <Box sx={{backgroundColor: "white", borderRadius: "16px", padding: 2, boxShadow: 2}}>
      <Typography fontSize={24} fontWeight={500} mb={2}>
        فیلتر ها
      </Typography>

      {Object.entries(filterOptions).map(([key, options]) => (
        <Accordion key={key} sx={{mb: 1, boxShadow: "none"}}>
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

      {/* فیلتر هزینه */}
      <Accordion sx={{mb: 1, boxShadow: "none"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">هزینه برنامه</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              variant="standard"
              autoComplete="off"
              value={toPersianDigits(priceRange.min)}
              onChange={handlePriceChange("min")}
              InputProps={{
                inputMode: "numeric",
                startAdornment: <InputAdornment position="start">از</InputAdornment>,
                endAdornment: <InputAdornment position="end">هزار تومان</InputAdornment>,
              }}
            />
            <TextField
              variant="standard"
              autoComplete="off"
              value={toPersianDigits(priceRange.max)}
              onChange={handlePriceChange("max")}
              InputProps={{
                inputMode: "numeric",
                startAdornment: <InputAdornment position="start">تا</InputAdornment>,
                endAdornment: <InputAdornment position="end">هزار تومان</InputAdornment>,
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* فیلتر وضعیت موجودی */}
      <Box ml={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={availability === "available"}
                onChange={(e) =>
                  setAvailability(e.target.checked ? "available" : "all")
                }
              />
            }
            label="فقط موجود ها"
          />
        </FormGroup>
      </Box>

      {/* دکمه اعمال */}
      <Button variant="contained" fullWidth backgroundColor={"#00A359"} onClick={handleApply} sx={{mt: 2}}>
        اعمال فیلتر
      </Button>
    </Box>
  );
};

export default CoachFilters;