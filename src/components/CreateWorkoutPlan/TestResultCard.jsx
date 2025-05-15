import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const users = [
  {
    id: 1,
    name: "مهدی اشرف زاده",
    gender: "مرد",
    height: "۱۷۸ سانتی‌متر",
    weight: "۷۶ کیلوگرم",
    targetWeight: "۸۰ کیلوگرم",
    age: "۳۰ سال",
    timePerWeek: "۳-۵ روز در هفته",
    workoutPlace: "باشگاه",
    targetMuscles: ["جلو بازو", "پشت بازو", "سینه"],
    workoutGoal: "تناسب اندام، کاهش وزن",
    healthIssues: [
      "تنگی نفس",
      "کف پای صاف",
      "تنگی نفس",
      "تنگی نفس",
      "تنگی نفس",
    ],
  },
  {
    id: 2,
    name: "علی محمدی",
    gender: "مرد",
    height: "۱۸۲ سانتی‌متر",
    weight: "۹۰ کیلوگرم",
    targetWeight: "۸۵ کیلوگرم",
    age: "۳۵ سال",
    timePerWeek: "۲-۴ روز در هفته",
    workoutPlace: "خانه",
    targetMuscles: ["پشت", "شکم"],
    workoutGoal: "چربی‌سوزی و قدرت عضلانی",
    healthIssues: ["زانو درد"],
  },
];

const TestResultCard = () => {
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const selectedUser = users.find((user) => user.id === selectedUserId);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  if (isSm || isXs) {
    return (
      <>
        <Box paddingRight={9} paddingLeft={9} paddingTop={9}>
          <Stack direction={"column"} gap={1}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">
                نوشتن برنامه برای شاگرد:
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                onChange={(e) => setSelectedUserId(e.target.value)}
                sx={{ width:250 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* نمایش نتیجه تست */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              نتیجه تست
            </Typography>
            <AssignmentOutlinedIcon sx={{ color: "#1976d2", ml: 1 }} />
          </Box>

          <Divider sx={{ mb: 3 }} />
          <Box
          // sx={{ justifyContent: "center" }}
          >
            <Stack
              direction="column"
              gap={4}
              alignItems="flex-start"
              // sx={{ minWidth: 250 }}
            >
              <Typography sx={{ whiteSpace: "nowrap" }}>
                جنسیت: {selectedUser.gender}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                سن: {selectedUser.age}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                قد: {selectedUser.height}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                زمان هفتگی: {selectedUser.timePerWeek}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                وزن: {selectedUser.weight}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                وزن هدف: {selectedUser.targetWeight}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                مکان تمرین: {selectedUser.workoutPlace}
              </Typography>
              <Stack direction={"row"} gap={1}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  هدف از ورزش:
                </Typography>
                <Typography sx={{ maxWidth: 300 }}>{selectedUser.workoutGoal}</Typography>
              </Stack>

              <Stack direction="row" gap={1}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  عضلات هدف:
                </Typography>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={1}
                  sx={{ maxWidth: 300 }} // یا هر عرضی که تقریبا برای 3 چیپ کافیه
                >
                  {selectedUser.targetMuscles.map((muscle, index) => (
                    <Chip
                      key={index}
                      label={muscle}
                      color="primary"
                      variant="outlined"
                      // sx={{ flex: "1 1 calc(33.33% - 8px)" }} // 3 تا در هر خط با gap=1
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack direction="row" gap={1}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  بیماری‌ها:
                </Typography>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={1}
                  sx={{ maxWidth: 300 }}
                >
                  {selectedUser.healthIssues.map((issue, index) => (
                    <Chip
                      key={index}
                      label={issue}
                      color="error"
                      variant="outlined"
                      // sx={{ flex: "1 1 calc(33.33% - 8px)" }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box mb={1} mt={5} textAlign="center">
            <Button variant="contained" color="success" size="large">
              شروع نوشتن برنامه
            </Button>
          </Box>
        </Box>
      </>
    );
  } else if (isMd) {
    return (
      <>
        <Box paddingRight={9} paddingLeft={9} paddingTop={9}>
          <Stack direction={"row"} gap={2}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                نوشتن برنامه برای شاگرد:
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                onChange={(e) => setSelectedUserId(e.target.value)}
                sx={{ width: 300 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* نمایش نتیجه تست */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              نتیجه تست
            </Typography>
            <AssignmentOutlinedIcon sx={{ color: "#1976d2", ml: 1 }} />
          </Box>

          <Divider sx={{ mb: 3 }} />
          <Box
            paddingLeft={5}
            paddingRight={10}
            sx={{ justifyContent: "center" }}
          >
            <Stack direction={"row"} gap={10} alignItems="flex-start">
              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                // sx={{ minWidth: 250 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  جنسیت: {selectedUser.gender}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  سن: {selectedUser.age}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  مکان تمرین: {selectedUser.workoutPlace}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  هدف از ورزش: {selectedUser.workoutGoal}
                </Typography>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    عضلات هدف:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }} // یا هر عرضی که تقریبا برای 3 چیپ کافیه
                  >
                    {selectedUser.targetMuscles.map((muscle, index) => (
                      <Chip
                        key={index}
                        label={muscle}
                        color="primary"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }} // 3 تا در هر خط با gap=1
                      />
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    بیماری‌ها:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }}
                  >
                    {selectedUser.healthIssues.map((issue, index) => (
                      <Chip
                        key={index}
                        label={issue}
                        color="error"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                sx={{ minWidth: 200 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  قد: {selectedUser.height}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  زمان هفتگی: {selectedUser.timePerWeek}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن: {selectedUser.weight}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن هدف: {selectedUser.targetWeight}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mb={1} mt={5} textAlign="center">
            <Button variant="contained" color="success" size="large">
              شروع نوشتن برنامه
            </Button>
          </Box>
        </Box>
      </>
    );
  } else if (isLg) {
    return (
      <>
        <Box paddingRight={9} paddingLeft={9} paddingTop={9}>
          <Stack direction={"row"} gap={2}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                نوشتن برنامه برای شاگرد:
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                onChange={(e) => setSelectedUserId(e.target.value)}
                sx={{ width: 300 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* نمایش نتیجه تست */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              نتیجه تست
            </Typography>
            <AssignmentOutlinedIcon sx={{ color: "#1976d2", ml: 1 }} />
          </Box>

          <Divider sx={{ mb: 3 }} />
          <Box
            paddingLeft={10}
            paddingRight={10}
            sx={{ justifyContent: "center" }}
          >
            <Stack direction={"row"} gap={7} alignItems="flex-start">
              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                // sx={{ minWidth: 250 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  جنسیت: {selectedUser.gender}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  سن: {selectedUser.age}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  مکان تمرین: {selectedUser.workoutPlace}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  هدف از ورزش: {selectedUser.workoutGoal}
                </Typography>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    عضلات هدف:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }} // یا هر عرضی که تقریبا برای 3 چیپ کافیه
                  >
                    {selectedUser.targetMuscles.map((muscle, index) => (
                      <Chip
                        key={index}
                        label={muscle}
                        color="primary"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }} // 3 تا در هر خط با gap=1
                      />
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    بیماری‌ها:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }}
                  >
                    {selectedUser.healthIssues.map((issue, index) => (
                      <Chip
                        key={index}
                        label={issue}
                        color="error"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                sx={{ minWidth: 200 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  قد: {selectedUser.height}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  زمان هفتگی: {selectedUser.timePerWeek}
                </Typography>
              </Stack>

              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                sx={{ minWidth: 200 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن: {selectedUser.weight}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن هدف: {selectedUser.targetWeight}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mb={1} mt={5} textAlign="center">
            <Button variant="contained" color="success" size="large">
              شروع نوشتن برنامه
            </Button>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box paddingRight={9} paddingLeft={9} paddingTop={9}>
          <Stack direction={"row"} gap={2}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                نوشتن برنامه برای شاگرد:
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                onChange={(e) => setSelectedUserId(e.target.value)}
                sx={{ width: 300 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* نمایش نتیجه تست */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              نتیجه تست
            </Typography>
            <AssignmentOutlinedIcon sx={{ color: "#1976d2", ml: 1 }} />
          </Box>

          <Divider sx={{ mb: 3 }} />
          <Box
            paddingLeft={15}
            paddingRight={10}
            sx={{ justifyContent: "center" }}
          >
            <Stack direction={"row"} gap={19} alignItems="flex-start">
              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                // sx={{ minWidth: 250 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  جنسیت: {selectedUser.gender}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  سن: {selectedUser.age}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  مکان تمرین: {selectedUser.workoutPlace}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  هدف از ورزش: {selectedUser.workoutGoal}
                </Typography>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    عضلات هدف:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }} // یا هر عرضی که تقریبا برای 3 چیپ کافیه
                  >
                    {selectedUser.targetMuscles.map((muscle, index) => (
                      <Chip
                        key={index}
                        label={muscle}
                        color="primary"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }} // 3 تا در هر خط با gap=1
                      />
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    بیماری‌ها:
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ maxWidth: 300 }}
                  >
                    {selectedUser.healthIssues.map((issue, index) => (
                      <Chip
                        key={index}
                        label={issue}
                        color="error"
                        variant="outlined"
                        // sx={{ flex: "1 1 calc(33.33% - 8px)" }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                sx={{ minWidth: 200 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  قد: {selectedUser.height}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  زمان هفتگی: {selectedUser.timePerWeek}
                </Typography>
              </Stack>

              <Stack
                direction="column"
                gap={4}
                alignItems="flex-start"
                sx={{ minWidth: 200 }}
              >
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن: {selectedUser.weight}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن هدف: {selectedUser.targetWeight}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box mb={0}  textAlign="center">
            <Button variant="contained" color="success" size="large">
              شروع نوشتن برنامه
            </Button>
          </Box>
        </Box>
        
      </>
    );
  }
};

export default TestResultCard;
