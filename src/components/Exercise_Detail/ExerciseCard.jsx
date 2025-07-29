// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Box,
//   Stack,
//   Typography,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";

// import img from "../../assets/imgs/builder_background.jpg";

// const ExerciseCard = ({ exerciseId }) => {
//   const [exerciseData, setExerciseData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const res = await fetch(
//           `https://http://84.234.29.28:8000/api/exercises/exercises/${exerciseId}/`,
//           {
//             headers: {
//               accept: "application/json",
//             },
//           }
//         );
//         const data = await res.json();
//         setExerciseData(data);
//       } catch (error) {
//         console.error("خطا در دریافت اطلاعات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExercise();
//   }, [exerciseId]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!exerciseData || !exerciseData.name) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" p={4} minHeight={300}>
//         <Typography color="textSecondary" variant="h6">
//           اطلاعاتی برای این حرکت یافت نشد.
//         </Typography>
//       </Box>
//     );
//   }

//   const infoTable = [
//     ["سطح حرکت", exerciseData.difficulty],
//     [
//       "عضلات درگیر",
//       exerciseData.muscle_groups?.map((m) => m.name).join("، ") || "",
//     ],
//     [
//       "نوع تمرین",
//       exerciseData.tags?.map((tag) => tag.name).join("، ") || "",
//     ],
//     [
//       "محل تمرین",
//       exerciseData.workoutplaces? exerciseData.workoutplaces : "",
//     ],
//     [
//       "وسایل مورد نیاز",
//       exerciseData.equipments?.map((eq) => eq.name).join("، ") || "",
//     ],
//   ];

//   const steps = exerciseData.description
//     ? exerciseData.description.split("\n").filter(Boolean)
//     : ["توضیحاتی ثبت نشده است."];

//   return (
//     <Card sx={{ borderRadius: 4, p: 2, boxShadow: 4 }}>
//       <Stack direction="row" spacing={2} flexWrap="wrap">
//         <Stack
//           direction={"column"}
//           sx={{
//             flex: 1,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: 2,
//             minHeight: 400,
//           }}
//         >
//           <Box
//             sx={{
//               flex: 1,
//               backgroundImage: `url(${exerciseData.images?.[0]?.image || img})`,
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//             }}
//           />
//           <Box
//             sx={{
//               width: "100%",
//               bgcolor: "rgba(255,255,255,0.8)",
//               textAlign: "center",
//               py: 1,
//             }}
//           >
//             <Typography variant="body1" fontWeight="bold">
//               {exerciseData.name || "بدون عنوان"}
//             </Typography>
//           </Box>
//         </Stack>

//         <Stack spacing={2} flex={1} minWidth={300}>
//           <Box
//             sx={{
//               border: "1px solid #ccc",
//               borderRadius: 2,
//               overflow: "hidden",
//               boxShadow: 1,
//             }}
//           >
//             <Grid container>
//               {infoTable.map(([label, value], index) => (
//                 <React.Fragment key={index}>
//                   <Grid
//                     item
//                     xs={6}
//                     sx={{
//                       bgcolor: "#e0f7fa",
//                       p: 1,
//                       borderBottom: "1px solid #ccc",
//                       fontWeight: "bold",
//                       textAlign: "center",
//                     }}
//                   >
//                     {label}
//                   </Grid>
//                   <Grid
//                     item
//                     xs={6}
//                     sx={{
//                       p: 1,
//                       borderBottom: "1px solid #ccc",
//                       textAlign: "center",
//                     }}
//                   >
//                     {value}
//                   </Grid>
//                 </React.Fragment>
//               ))}
//             </Grid>
//           </Box>

//           <Box
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               boxShadow: 2,
//               bgcolor: "#f8f9fa",
//               p: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{ textAlign: "center", mb: 1 }}
//             >
//               نحوه انجام حرکت
//             </Typography>
//             <List>
//               {steps.map((step, idx) => (
//                 <ListItem key={idx} sx={{ py: 0.5 }}>
//                   <ListItemText primary={`• ${step}`} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Stack>
//       </Stack>
//     </Card>
//   );
// };

// export default ExerciseCard;


import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Stack,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import img from "../../assets/imgs/builder_background.jpg";
import config from '../../config';

const ExerciseCard = ({ exerciseId }) => {
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(
          `${config.API_BASE_URL}/api/exercises/exercises/${exerciseId}/`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setExerciseData(data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!exerciseData || !exerciseData.name) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4} minHeight={300}>
        <Typography color="textSecondary" variant="h6">
          اطلاعاتی برای این حرکت یافت نشد.
        </Typography>
      </Box>
    );
  }

  const infoTable = [
    ["سطح حرکت", exerciseData.difficulty],
    [
      "عضلات درگیر",
      exerciseData.muscle_groups?.map((m) => m.name).join("، ") || "",
    ],
    [
      "نوع تمرین",
      exerciseData.tags?.map((tag) => tag.name).join("، ") || "",
    ],
    [
      "محل تمرین",
      exerciseData.workoutplaces ? exerciseData.workoutplaces : "",
    ],
    [
      "وسایل مورد نیاز",
      exerciseData.equipments?.map((eq) => eq.name).join("، ") || "",
    ],
  ];

  const steps = exerciseData.description
    ? exerciseData.description.split("\n").filter(Boolean)
    : ["توضیحاتی ثبت نشده است."];

  const content = isSmallScreen ? (
    <>
      {/* جدول اطلاعات بالا */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 1,
          mb: 2,
        }}
      >
        <Grid container>
          {infoTable.map(([label, value], index) => (
            <React.Fragment key={index}>
              <Grid
                item
                xs={6}
                sx={{
                  color : "rgb(250, 250, 250)",
                  bgcolor: "rgb(92, 165, 85)",
                  p: 1,
                  borderBottom: "1px solid #ccc",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {label}
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  p: 1,
                  borderBottom: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                {value}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      {/* تصویر وسط */}
      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 2,
          minHeight: 300,
          backgroundImage: `url(${exerciseData.images?.[0]?.image || img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mb: 1,
        }}
      />
      <Box
        sx={{
          width: "100%",
          bgcolor: "rgba(255,255,255,0.8)",
          textAlign: "center",
          py: 1,
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {exerciseData.name || "بدون عنوان"}
        </Typography>
      </Box>

      {/* توضیحات پایین */}
      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 2,
          bgcolor: "#f8f9fa",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 1 }}
        >
          نحوه انجام حرکت
        </Typography>
        <List>
          {steps.map((step, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemText primary={`• ${step}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  ) : (
    // حالت دسکتاپ - تصویر و اطلاعات کنار هم
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Stack
        direction={"column"}
        sx={{
          flex: 1,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 2,
          minHeight: 400,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${exerciseData.images?.[0]?.image || img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            width: "100%",
            bgcolor: "rgba(255,255,255,0.8)",
            textAlign: "center",
            py: 1,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {exerciseData.name || "بدون عنوان"}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2} flex={1} minWidth={300}>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <Grid container>
            {infoTable.map(([label, value], index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    color : "rgb(250, 250, 250)",
                    bgcolor: "rgb(92, 165, 85)",
                    p: 1,
                    borderBottom: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {label}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    p: 1,
                    borderBottom: "1px solid #ccc",
                    textAlign: "center",
                  }}
                >
                  {value}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 2,
            bgcolor: "#f8f9fa",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textAlign: "center", mb: 1 }}
          >
            نحوه انجام حرکت
          </Typography>
          <List>
            {steps.map((step, idx) => (
              <ListItem key={idx} sx={{ py: 0.5 }}>
                <ListItemText primary={`• ${step}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ borderRadius: 4, p: 2, boxShadow: 4 }}>
      {content}
    </Card>
  );
};

export default ExerciseCard;
