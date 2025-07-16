import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography, Box, useMediaQuery } from "@mui/material";

const ExerciseCard = ({ id, name, images, equipments, tags, muscle_groups }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
        width: "100%",
        maxWidth: 420,
        height: isSmallScreen ? 130 : 160,
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
          left: isSmallScreen ? "35%" : "40%",
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
          width: isSmallScreen ? "35%" : "40%",
          height: "100%",
          objectFit: "cover",
        }}
        image={imageUrl}
        alt={name}
      />
      
      <Box sx={{ 
        width: isSmallScreen ? "65%" : "60%",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}>
        <CardContent sx={{ p: 0, pb: "0!important" }}>
          <Typography 
            variant={isSmallScreen ? "subtitle1" : "h6"}
            fontWeight="bold"
            sx={{ 
              mb: 0.5,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>
        </CardContent>

        <Box sx={{ 
          display: "flex",
          flexDirection: "column",
          gap: 0.7,
          overflow: "hidden",
        }}>
        
          {tagNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {tagNames.slice(0, 2).map((type, index) => (
                <Chip
                  key={`tag-${index}`}
                  label={type}
                  size="small"
                  sx={{
                    backgroundColor: "#e0e0e0",
                    color: "#424242",
                  }}
                />
              ))}
            </Stack>
          )}

         
          {equipmentNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {equipmentNames.slice(0, 2).map((name, index) => (
                <Chip 
                  key={`equip-${index}`} 
                  label={name} 
                  size="small"
                  sx={{ 
                    backgroundColor: "#00A359",
                    color: "white",
                  }}
                />
              ))}
            </Stack>
          )}

         
          {muscleGroupNames.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {muscleGroupNames.slice(0, 2).map((name, index) => (
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