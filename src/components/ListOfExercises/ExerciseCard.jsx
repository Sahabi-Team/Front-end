import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Box,
} from "@mui/material";

const ExerciseCard = ({ id, name, images, equipment, tags, muscle_group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/exercisedetail/${id}`);
  };

  const imageUrl = images && images.length > 0 ? images[0].image : '';
  const equipmentArray = equipment ? [equipment] : [];
  const muscle_groupArray = muscle_group ? [muscle_group] : [];
  const tagNames = tags?.map(tag => tag.name) || [];

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 420,
        height: 150,
        borderRadius: 2,
        border: "2.5px solid #00A359",
        boxShadow: 1,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        position: "relative", // برای border سبز کنار عکس
        "&::before": { // ایجاد border سبز کنار عکس
          content: '""',
          position: "absolute",
          left: "40%", // مطابق با عرض تصویر
          top: 0,
          bottom: 0,
          width: "3px",
          backgroundColor: "#00A359",
          zIndex: 1,}
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "40%",
          height: "100%",
          objectFit: "cover",
          position: "relative",
          zIndex: 0,
        }}
        image={imageUrl}
        alt={name}
      />
      
      <Box sx={{ 
        width: "60%",
        display: "flex",
        flexDirection: "column",
      }}>
        <CardContent sx={{ 
          p: 2,
          pb: 0, // کاهش padding پایین
          textAlign: "left",
        }}>
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{ 
              mb: 1.5, // کاهش بیشتر فاصله زیر عنوان
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
        </CardContent>

        <Box sx={{ 
          px: 2, // padding فقط برای چپ و راست
          pb: 2, // padding فقط برای پایین
          display: "flex",
          flexDirection: "column",
          gap: 1, // کاهش فاصله بین تگ‌ها
        }}>
          {/* تگ تجهیزات (فقط اگر وجود داشته باشد) */}
          {equipmentArray.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {equipmentArray.map((eq, index) => (
                <Chip 
                  key={`equip-${index}`} 
                  label={eq} 
                  size="small"
                  sx={{ 
                    backgroundColor: "#e0e0e0",
                    color: "#424242",
                  }}
                />
              ))}
            </Stack>
          )}

          {/* تگ نوع تمرین */}
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {tagNames.map((type, index) => (
              <Chip
                key={index}
                label={type}
                size="small"
                sx={{
                  backgroundColor: "#00A359",
                  color: "white",
                }}
              />
            ))}
          </Stack>
          {muscle_groupArray.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {muscle_groupArray.map((eq, index) => (
                <Chip 
                  key={`equip-${index}`} 
                  label={eq} 
                  size="small"
                  sx={{ 
                    backgroundColor: "#e0e0e0",
                    color: "#424242",
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ExerciseCard;