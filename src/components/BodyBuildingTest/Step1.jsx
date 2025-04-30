import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import moment from "moment-jalaali";
import "moment/locale/fa";

moment.loadPersian({ /*usePersianDigits: true,*/ dialect: "persian-modern" });

const Step1 = ({data, setData, setIsFormValid}) => {
  const [errors, setErrors] = useState({ height: false, weight: false, goalWeight: false, birthDate: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "height") {
      newErrors.height = !/^[1-9]\d*$/.test(value);
    }
    else if (name === "weight" || name === "goalWeight") {
      newErrors[name] = !/^\d+(\.\d{1})?$/.test(value);
    }

    setErrors(newErrors);
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const isValid = data.height && data.weight && data.goalWeight && data.birthDate && !Object.values(errors).some((err) => err);
    setIsFormValid(isValid);
  }, [data]);


  return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap="24px">
        <TextField
          label="وزن الان (کیلوگرم)"
          name="weight"
          value={data.weight}
          onChange={handleChange}
          error={errors.weight}
          helperText={errors.weight ? "لطفا یک عدد، حداکثر با یک رقم اعشار وارد کنید" : ""}
          sx={{flex: "1 1 45%", minWidth: "180px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
        />
        <TextField
          label="وزن هدف (کیلوگرم)"
          name="goalWeight"
          value={data.goalWeight}
          onChange={handleChange}
          error={errors.goalWeight}
          helperText={errors.goalWeight ? "لطفا یک عدد، حداکثر با یک رقم اعشار وارد کنید" : ""}
          sx={{flex: "1 1 45%", minWidth: "180px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
        />
        <TextField
          label="قد (سانتی‌متر)"
          name="height"
          value={data.height}
          onChange={handleChange}
          error={errors.height}
          helperText={errors.height ? "لطفاً یک عدد صحیح وارد کنید" : ""}
          sx={{flex: "1 1 45%", minWidth: "180px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
        />
        <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
          <DatePicker
            label="تاریخ تولد (شمسی)"
            value={data.birthDate}
            onChange={(newValue) => setData({ ...data, birthDate: newValue })}
            maxDate={moment().subtract(18, "years")}
            openTo="year"
            slotProps={{
                openPickerButton: {color: 'primary'},
                textField: {sx: {flex: "1 1 45%", minWidth: "180px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
            }}
          />
        </LocalizationProvider>
      </Box>
  );
};

export default Step1;