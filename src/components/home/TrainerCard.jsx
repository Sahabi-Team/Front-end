import React from "react";
import { Box, Typography, Button, Rating, Avatar } from "@mui/material";

const CoachCard = ({ name, specialty, experience, price, rating, image }) => {
  return (
    <Box
      sx={{
        width: {xs:370,sm:390},
        height: 280,
        bgcolor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",

        pt: 1,
        pb: 1,
        px: 1,
      }}
    >
      {/* حلال سبز رنگ */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 140,
          height: "100%",
          bgcolor: "#00a651",
          borderTopRightRadius: "100% 60%",
          borderBottomRightRadius: "100% 60%",
          zIndex: 0,
        }}
      />

      {/* آواتار مربی در وسط و روی حلال سبز */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 70,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <Avatar
          src={image}
          alt={name}
          sx={{
            width: 125,
            height: 125,
            border: "4px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* امتیاز و اطلاعات مربی در سمت سفید کارت */}
      <Box
        sx={{
          width: "50%",
          marginLeft: 24, // فاصله‌گیری از حلال سبز
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* امتیاز */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mt: 0,
          }}
        >
          <Typography
            sx={{
              mr: 1,
              fontWeight: "bold",
              fontSize: "1rem",
              border: "2px solid #c1a600", // طلایی شبیه تصویر
              borderRadius: "12px", // گوشه‌های گرد
              px: 2,
              py: 0.5,
              color: "#000", // رنگ متن مشکی
              backgroundColor: "#fff", // پس‌زمینه سفید
              display: "inline-block",
              minWidth: "48px",
              textAlign: "center",
            }}
          >
            {rating}/5
          </Typography>
          <Box sx={{ direction: "ltr", display: "inline-block" }}>
            <Rating
              name="read-only"
              value={rating}
              precision={0.25}
              readOnly
              sx={{ fontSize: "1.2rem",

                "& .MuiRating-iconFilled": {
                    color: "#f5a623", // رنگ ستاره پر
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#ccc", // رنگ ستاره خالی
                  },
               }}
            />
          </Box>
        </Box>

        {/* اطلاعات مربی */}
        <Box sx={{ mt: 2 }}>
          <Typography fontWeight="bold" fontSize="16px" mb={1}>
            نام مربی: {name}
          </Typography>
          <Typography fontSize="15px" mb={1}>
            تخصص: {specialty}
          </Typography>
          <Typography fontSize="15px" mb={1}>
            سطح تجربه: {experience} سال
          </Typography>
          <Typography fontSize="15px" mb={2}>
            هزینه دریافتی:{" "}
          </Typography>
          <Typography style={{ color: "#f39c12", fontWeight: "bold" }}>
            {price} هزار تومان
          </Typography>
        </Box>
      </Box>

      {/* دکمه‌ها */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          mt: 2,
          marginLeft: 13,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00a651",
            color: "#fff",
            borderRadius: "12px",
            px: 1.5,
            py: 0.8,
            fontSize: "13px",
            minWidth: 120,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            textWrap: "nowrap",
            "&:hover": {
              bgcolor: "#008a43",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            },
          }}
        >
          ثبت سفارش
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#00a651",
            color: "#00a651",
            borderRadius: "12px",
            px: 1.5,
            py: 0.8,
            fontSize: "13px",
            minWidth: 120,
            textWrap: "nowrap",
            "&:hover": {
              borderColor: "#008a43",
              color: "#008a43",
              backgroundColor: "rgba(0,166,81,0.05)",
            },
          }}
        >
          مشاهده پروفایل
        </Button>
      </Box>
    </Box>
  );
};

export default CoachCard;

// import React from "react";
// import { Box, Typography, Button, Rating, Avatar } from "@mui/material";
// import { useState } from "react";

// const CoachCard = ({ name, specialty, experience, price, rating, image }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Box
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         width: { xs: "100%", sm: 350, md: 390 },
//         height: { xs: "auto", md: 280 },
//         bgcolor: "#fff",
//         borderRadius: "16px",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//         position: "relative",
//         overflow: "hidden",
//         pt: 1,
//         pb: 1,
//         px: 1,

//         // افکت سه‌بعدی
//         transform: isHovered ? "scale(1.02) rotateY(2deg)" : "scale(1)",
//         transition: "all 0.4s ease-in-out",

//         // انیمیشن ورود
//         opacity: 0,
//         animation: "fadeInScale 0.6s ease-in-out forwards",
//       }}
//     >
//       {/* حلال سبز رنگ */}
//       <Box
//         sx={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           width: 140,
//           height: "100%",
//           bgcolor: "#00a651",
//           borderTopRightRadius: "100% 60%",
//           borderBottomRightRadius: "100% 60%",
//           zIndex: 0,
//         }}
//       />

//       {/* آواتار مربی در وسط و روی حلال سبز */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: 70,
//           transform: "translateY(-50%)",
//           zIndex: 2,
//         }}
//       >
//         <Avatar
//           src={image}
//           alt={name}
//           sx={{
//             width: 125,
//             height: 125,
//             border: "4px solid #fff",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//           }}
//         />
//       </Box>

//       {/* امتیاز و اطلاعات مربی */}
//       <Box
//         sx={{
//           width: "50%",
//           marginLeft: 24,
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* امتیاز */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             mt: 0,
//           }}
//         >
//           <Typography
//             sx={{
//               mr: 1,
//               fontWeight: "bold",
//               fontSize: "1rem",
//               border: "2px solid #c1a600",
//               borderRadius: "12px",
//               px: 2,
//               py: 0.5,
//               color: "#000",
//               backgroundColor: "#fff",
//               display: "inline-block",
//               minWidth: "48px",
//               textAlign: "center",
//             }}
//           >
//             {rating}/5
//           </Typography>
//           <Box sx={{ direction: "ltr", display: "inline-block" }}>
//             <Rating
//               name="read-only"
//               value={rating}
//               precision={0.25}
//               readOnly
//               sx={{
//                 fontSize: "1.2rem",
//                 "& .MuiRating-iconFilled": {
//                   color: "#f5a623",
//                 },
//                 "& .MuiRating-iconEmpty": {
//                   color: "#ccc",
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         {/* اطلاعات مربی */}
//         <Box sx={{ mt: 2 }}>
//           <Typography fontWeight="bold" fontSize="16px" mb={1}>
//             نام مربی: {name}
//           </Typography>
//           <Typography fontSize="15px" mb={1}>
//             تخصص: {specialty}
//           </Typography>
//           <Typography fontSize="15px" mb={1}>
//             سطح تجربه: {experience} سال
//           </Typography>
//           <Typography fontSize="15px" mb={2}>
//             هزینه دریافتی:
//           </Typography>
//           <Typography style={{ color: "#f39c12", fontWeight: "bold" }}>
//             {price} هزار تومان
//           </Typography>
//         </Box>
//       </Box>

//       {/* دکمه‌ها */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 1.5,
//           mt: 2,
//           marginLeft: 13,
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: "#00a651",
//             color: "#fff",
//             borderRadius: "12px",
//             px: 1.5,
//             py: 0.8,
//             fontSize: "13px",
//             minWidth: 120,
//             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             textWrap: "nowrap",
//             "&:hover": {
//               bgcolor: "#008a43",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             },
//           }}
//         >
//           ثبت سفارش
//         </Button>
//         <Button
//           variant="outlined"
//           sx={{
//             borderColor: "#00a651",
//             color: "#00a651",
//             borderRadius: "12px",
//             px: 1.5,
//             py: 0.8,
//             fontSize: "13px",
//             minWidth: 120,
//             textWrap: "nowrap",
//             "&:hover": {
//               borderColor: "#008a43",
//               color: "#008a43",
//               backgroundColor: "rgba(0,166,81,0.05)",
//             },
//           }}
//         >
//           مشاهده پروفایل
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CoachCard;












// import React from "react";
// import { Box, Typography, Button, Rating, Avatar } from "@mui/material";

// const CoachCard = ({ name, specialty, experience, price, rating, image }) => {
//   return (
//     <Box
//       sx={{
//         width: {xs:370,sm:390},
//         height:280,
//         bgcolor: "#fff",
//         borderRadius: "16px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         position: "relative",
//         overflow: "hidden",
//         // fontFamily: "'IRANSans', sans-serif",
//         pt: 1,
//         pb: 1,
//         px: 1,
//       }}
//     >
//       {/* حلال سبز رنگ */}
//       <Box
//         sx={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           width: 140,
//           height: "100%",
//           bgcolor: "#00a651",
//           borderTopRightRadius: "100% 60%",
//           borderBottomRightRadius: "100% 60%",
//           zIndex: 0,
//         }}
//       />

//       {/* آواتار مربی در وسط و روی حلال سبز */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: 70,
//           transform: "translateY(-50%)",
//           zIndex: 2,
//         }}
//       >
//         <Avatar
//           src={image}
//           alt={name}
//           sx={{
//             width: 125,
//             height: 125,
//             border: "4px solid #fff",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//           }}
//         />
//       </Box>

//       {/* امتیاز و اطلاعات مربی در سمت سفید کارت */}
//       <Box
//         sx={{
//           width: "50%",
//           marginLeft: 24, // فاصله‌گیری از حلال سبز
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* امتیاز */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             mt: 0,
//           }}
//         >
//           <Typography sx={{ mr: 1, fontWeight: "bold", fontSize: "1rem" }}>
//             {rating}/5
//           </Typography>
//           <Rating
//             name="read-only"
//             value={rating}
//             precision={0.25}
//             readOnly
//             sx={{ fontSize: "1.2rem" }}
//           />
//         </Box>

//         {/* اطلاعات مربی */}
//         <Box sx={{ mt: 2 }}>
//           <Typography fontWeight="bold" fontSize="16px" mb={1}>
//             نام مربی: {name}
//           </Typography>
//           <Typography fontSize="15px" mb={1}>
//             تخصص: {specialty}
//           </Typography>
//           <Typography fontSize="15px" mb={1}>
//             سطح تجربه: {experience} سال
//           </Typography>
//           <Typography fontSize="15px" mb={2}>
//             هزینه دریافتی:{" "}
//           </Typography>
//           <Typography style={{ color: "#f39c12", fontWeight: "bold" }}>
//               {price} هزار تومان
//           </Typography>
//         </Box>
//       </Box>

//       {/* دکمه‌ها */}
//       <Box
//   sx={{
//     display: "flex",
//     justifyContent: "center",
//     gap: 1.5,
//     mt: 3,
//     marginLeft:13,
//     position: "relative",
//     zIndex: 1,
//   }}
// >
//   <Button
//     variant="contained"
//     sx={{
//       bgcolor: "#00a651",
//       color: "#fff",
//       borderRadius: "12px",
//       px: 1.5,
//       py: 0.8,
//       fontSize: "13px",
//       minWidth: 120,
//       boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//       textWrap: "nowrap",
//       "&:hover": {
//         bgcolor: "#008a43",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//       },
//     }}
//   >
//     ثبت سفارش
//   </Button>
//   <Button
//     variant="outlined"
//     sx={{
//       borderColor: "#00a651",
//       color: "#00a651",
//       borderRadius: "12px",
//       px: 1.5,
//       py: 0.8,
//       fontSize: "13px",
//       minWidth: 120,
//       textWrap: "nowrap",
//       "&:hover": {
//         borderColor: "#008a43",
//         color: "#008a43",
//         backgroundColor: "rgba(0,166,81,0.05)",
//       },
//     }}
//   >
//     مشاهده پروفایل
//   </Button>
// </Box>

//     </Box>
//   );
// };

// export default CoachCard;
