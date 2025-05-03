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

const ExerciseCard = ({ id, name, images, equipments, tags, muscle_groups }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/exercisedetail/${id}`);
  };

  const imageUrl = images?.[0]?.image || '';
  const equipmentNames = equipments?.map(eq => eq.name) || [];
  const muscleGroupNames = muscle_groups?.map(mg => mg.name) || [];
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
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "40%",
          top: 0,
          bottom: 0,
          width: "3px",
          backgroundColor: "#00A359",
          zIndex: 1,
        }
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
          pb: 0,
          textAlign: "left",
        }}>
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{ 
              mb: 1.5,
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
        </CardContent>

        <Box sx={{ 
          px: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}>
          {/* نمایش تجهیزات */}
          {equipmentNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {equipmentNames.map((name, index) => (
                <Chip 
                  key={`equip-${index}`} 
                  label={name} 
                  size="small"
                  sx={{ 
                    backgroundColor: "#e0e0e0",
                    color: "#424242",
                  }}
                />
              ))}
            </Stack>
          )}

          {/* نمایش تگ‌ها */}
          {tagNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {tagNames.map((type, index) => (
                <Chip
                  key={`tag-${index}`}
                  label={type}
                  size="small"
                  sx={{
                    backgroundColor: "#00A359",
                    color: "white",
                  }}
                />
              ))}
            </Stack>
          )}

          {/* نمایش گروه‌های عضلانی */}
          {muscleGroupNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {muscleGroupNames.map((name, index) => (
                <Chip 
                  key={`muscle-${index}`} 
                  label={name} 
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