import React, { useState, useEffect } from "react";
import { Box, MenuItem, TextField} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';

const Step2 = ({setIsFormValid}) => {
  const [formData, setFormData] = useState({
    goal: "",
    focusArea: "",
    equipment: "",
    workoutDays: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isValid = formData.goal && formData.focusArea && formData.equipment && formData.workoutDays;
    setIsFormValid(isValid);
  }, [formData, setIsFormValid]);

  return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap="24px">
        <TextField
          select
          label="هدفت از ورزش"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          sx={{flex: "1 1 45%", minWidth: "200px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
          slotProps={{select: {IconComponent: ExpandMoreIcon, sx: {"& .MuiSelect-icon": {color: "#00A359", fontSize: "28px"}}}}}
        >
          <MenuItem value="عضله سازی">عضله سازی</MenuItem>
          <MenuItem value="کاهش سایز">کاهش سایز</MenuItem>
          <MenuItem value="خوش فرم شدن">خوش فرم شدن</MenuItem>
        </TextField>

        <TextField
          select
          label="عضو مورد تمرکز"
          name="focusArea"
          value={formData.focusArea}
          onChange={handleChange}
          sx={{flex: "1 1 45%", minWidth: "200px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
          slotProps={{select: {IconComponent: ExpandMoreIcon, sx: {"& .MuiSelect-icon": {color: "#00A359", fontSize: "28px"}}}}}
        >
          <MenuItem value="بازو">بازو</MenuItem>
          <MenuItem value="شکم و پهلو">شکم و پهلو</MenuItem>
          <MenuItem value="سینه ها">سینه ها</MenuItem>
        </TextField>

        <TextField
          select
          label="وسایل بدنسازی چی داری"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          sx={{flex: "1 1 45%", minWidth: "200px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
          slotProps={{select: {IconComponent: ExpandMoreIcon, sx: {"& .MuiSelect-icon": {color: "#00A359", fontSize: "28px"}}}}}
        >
          <MenuItem value="هیچ ندارم">هیچ ندارم</MenuItem>
          <MenuItem value="کش بدنسازی">کش بدنسازی</MenuItem>
          <MenuItem value="دمبل">دمبل</MenuItem>
          <MenuItem value="کش و دمبل">کش و دمبل</MenuItem>
          <MenuItem value="باشگاه میرم">باشگاه میرم</MenuItem>
        </TextField>

        <TextField
          select
          label="در هفته چقدر وقت داری"
          name="workoutDays"
          value={formData.workoutDays}
          onChange={handleChange}
          sx={{flex: "1 1 45%", minWidth: "200px", '& .MuiOutlinedInput-root': {borderRadius: '28px'}}}
          slotProps={{select: {IconComponent: ExpandMoreIcon, sx: {"& .MuiSelect-icon": {color: "#00A359", fontSize: "28px"}}}}}
        >
          <MenuItem value="۱ الی ۲ روز">۱ الی ۲ روز</MenuItem>
          <MenuItem value="۳ الی ۴ روز">۳ الی ۴ روز</MenuItem>
          <MenuItem value="۵ الی ۶ روز">۵ الی ۶ روز</MenuItem>
        </TextField>
      </Box>
  );
};

export default Step2;