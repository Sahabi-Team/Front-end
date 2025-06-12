import React from "react";
import {
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";


const toPersianDigits = (str) => {
  return String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

const EditProfileForm = ({ userData, errors, handleChange, handleSubmit }) => {
 
  const handlePersianInputChange = (e) => {
    const { name, value } = e.target;
    const englishNumber = value.replace(/[۰-۹]/g, (d) =>
      "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
    );
    handleChange({ target: { name, value: englishNumber } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "85%" }}>
      <Grid container spacing={3}>
        {/* First Row - First Name & Last Name */}
        <Grid item xs={12} md={6}>
          <label style={labelStyle}>نام</label>
          <TextField
            fullWidth
            placeholder="نام خود را وارد کنید"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label style={labelStyle}>نام خانوادگی</label>
          <TextField
            fullWidth
            placeholder="نام خانوادگی خود را وارد کنید"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        {/* Second Row - Biography */}
        <Grid item xs={12}>
          <label style={labelStyle}>بیوگرافی</label>
          <TextField
            fullWidth
            placeholder="درباره خود بنویسید"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            error={Boolean(errors.bio)}
            helperText={errors.bio}
            multiline
            rows={4}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        {/* Third Row - Work Experience, Reservation Ability, Pricing */}
        <Grid item xs={12} md={4}>
          <label style={labelStyle}>سابقه کاری (سال)</label>
          <TextField
            fullWidth
            placeholder="مثال: ۵"
            name="experience"
            type="text"
            value={toPersianDigits(userData.experience || "")}
            onChange={handlePersianInputChange}
            error={Boolean(errors.experience)}
            helperText={errors.experience}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <label style={labelStyle}>قابلیت رزرو</label>
          <FormControl fullWidth>
            <Select
              name="isAvailableForReservation"
              value={userData.isAvailableForReservation ? "true" : "false"}
              onChange={handleChange}
              sx={{
                ...textFieldStyle,
                textAlign: "left",
                "& .MuiSelect-select": {
                  textAlign: "left",
                },
              }}
            >
              <MenuItem value="true">بله</MenuItem>
              <MenuItem value="false">خیر</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <label style={labelStyle}>هزینه دریافتی (هزارتومان)</label>
          <TextField
            fullWidth
            placeholder="مثال: ۲۰۰"
            name="price"
            type="text"
            value={toPersianDigits(userData.price || "")}
            onChange={handlePersianInputChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        {/* Fourth Row - Specialties & Certificates */}
        <Grid item xs={12} md={6}>
          <label style={labelStyle}>تخصص‌ها</label>
          <TextField
            fullWidth
            placeholder="تخصص‌های خود را با کاما جدا کنید"
            name="specialties"
            value={userData.specialties}
            onChange={handleChange}
            error={Boolean(errors.specialties)}
            helperText={errors.specialties}
            multiline
            rows={2}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label style={labelStyle}>مدارک</label>
          <TextField
            fullWidth
            placeholder="مدارک خود را با کاما جدا کنید"
            name="certificates"
            value={userData.certificates}
            onChange={handleChange}
            error={Boolean(errors.certificates)}
            helperText={errors.certificates}
            multiline
            rows={2}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00A359",
              color: "white",
              height: "50px",
              fontSize: "20px",
              marginTop: "20px",
              borderRadius: "12px",
              width: "150px",
              marginBottom: "30px",
            }}
          >
            ذخیره تغییرات
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

// Styles
const labelStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "black",
  marginBottom: "5px",
  textAlign: "right",
  display: "block",
};

const textFieldStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "12px",
  marginTop: "10px",
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderRadius: "12px", border: "none" },
  },
};

export default EditProfileForm;
