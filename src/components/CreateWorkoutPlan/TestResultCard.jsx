import React, { useState, useEffect, useContext } from "react";
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
  CircularProgress,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import male1 from "../../assets/imgs/body_shapes/male/Select Field 1.svg";
import male2 from "../../assets/imgs/body_shapes/male/Select Field 2.svg";
import male3 from "../../assets/imgs/body_shapes/male/Select Field 3.svg";
import male4 from "../../assets/imgs/body_shapes/male/Select Field 4.svg";
import male5 from "../../assets/imgs/body_shapes/male/Select Field 5.svg";
import male6 from "../../assets/imgs/body_shapes/male/Select Field 6.svg";
import female1 from "../../assets/imgs/body_shapes/female/Select Field 1.svg";
import female2 from "../../assets/imgs/body_shapes/female/Select Field 2.svg";
import female3 from "../../assets/imgs/body_shapes/female/Select Field 3.svg";
import female4 from "../../assets/imgs/body_shapes/female/Select Field 4.svg";
import female5 from "../../assets/imgs/body_shapes/female/Select Field 5.svg";
import female6 from "../../assets/imgs/body_shapes/female/Select Field 6.svg";

const toPersianDigits = (num) => {
  return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const BodyForms = [
  [male1, male2, male3, male4, male5, male6],
  [female1, female2, female3, female4, female5, female6],
];

const TestResultCard = ({
  onStartWritingPlan,
  setSelectedUserId,
  setMentorshipId,
  selectedUserId,
  isreadonly,
  updating,
}) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const [traineestests, setTraineestests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const selectedUser = traineestests.find(
    (user) => user.trainee_username === selectedUserId
  );
  if (selectedUser) setMentorshipId(selectedUser.mentorship_id);
  let access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  // console.log(access_token);
  // console.log("sss",selectedUser);
  // console.log(traineestests);
  // console.log(selectedUserId);

  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/tests/pupil-tests/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setTraineestests(response.data);
      } catch (error) {
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  // console.log(traineestests);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
      >
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h6" mt={2}>
          در حال بارگذاری...
        </Typography>
      </Box>
    );
  }

  if (isSm || isXs) {
    return (
      <>
        <Box paddingRight={9} paddingLeft={9} paddingTop={9}>
          <Stack direction={"column"} gap={1}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" whiteSpace={'nowrap'}>
                نام شاگرد : 
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                readOnly={isreadonly}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  const selectedUser = traineestests.find(
                    (user) => user.trainee_username === e.target.value
                  );
                  setMentorshipId(selectedUser.mentorship_id);
                }}
                sx={{ width: { xs: "100%",sm:"70%", md: "30%" }, }}
              >
                {traineestests.map((user) => (
                  <MenuItem
                    key={user.mentorship_id}
                    value={user.trainee_username}
                  >
                    {user.trainee_name}
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
          {selectedUser ? (
            <Box>
              <Stack direction="column" gap={4} alignItems="flex-start">
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  {selectedUser.gender
                    ? `جنسیت: ${selectedUser.gender == "male" ? "مرد" : "زن"}`
                    : ""}
                </Typography>

                <Typography sx={{ whiteSpace: "nowrap" }}>
                  سن:{" "}
                  {toPersianDigits(
                    calculateAge(new Date(selectedUser.birth_date))
                  )}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  مکان تمرین: {selectedUser.equipment}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  هدف از ورزش: {selectedUser.goal}
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
                    {(selectedUser.focus_area.split(",") || []).map(
                      (muscle, index) => (
                        <Chip
                          key={index}
                          label={muscle.trim()}
                          color="primary"
                          variant="outlined"
                        />
                      )
                    )}
                  </Stack>
                  {/* <Typography>{selectedUser.focus_area}</Typography> */}
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
                    {(selectedUser.diseases?.split(",") || []).map(
                      (issue, index) => (
                        <Chip
                          key={index}
                          label={issue.trim()}
                          color="error"
                          variant="outlined"
                        />
                      )
                    )}
                  </Stack>
                  {/* <Typography>{selectedUser.diseases}</Typography> */}
                </Stack>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  قد: {toPersianDigits(selectedUser.height)}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  زمان هفتگی: {selectedUser.workout_days}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن: {toPersianDigits(selectedUser.weight)}
                </Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  وزن هدف: {toPersianDigits(selectedUser.goal_weight)}
                </Typography>
                <Box sx={{ mr: 3 }}>
                  <img
                    src={
                      BodyForms[selectedUser.gender == "male" ? 0 : 1][
                        selectedUser.body_form-1
                      ]
                    }
                  />
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Typography variant="h6" color="text.secondary">
                اطلاعاتی جهت نمایش وجود ندارد.
              </Typography>
            </Box>
          )}

          <Box mb={1} mt={5} textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onStartWritingPlan}
            >
              {updating
                ? "ویرایش برنامه"
                : isreadonly
                ? "ادامه نوشتن برنامه"
                : "شروع نوشتن برنامه"}
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
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}
              >
                نام شاگرد : 
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                readOnly={isreadonly}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  const selectedUser = traineestests.find(
                    (user) => user.trainee_username === e.target.value
                  );
                  setMentorshipId(selectedUser.mentorship_id);
                }}
                sx={{ width: 300 }}
              >
                {traineestests.map((user) => (
                  <MenuItem
                    key={user.mentorship_id}
                    value={user.trainee_username}
                  >
                    {user.trainee_name}
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
          {selectedUser ? (
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
                    {selectedUser.gender
                      ? `جنسیت: ${selectedUser.gender == "male" ? "مرد" : "زن"}`
                      : ""}
                  </Typography>

                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    سن:{" "}
                    {toPersianDigits(
                      calculateAge(new Date(selectedUser.birth_date))
                    )}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    مکان تمرین: {selectedUser.equipment}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    هدف از ورزش: {selectedUser.goal}
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
                      {(selectedUser.focus_area.split(",") || []).map(
                        (muscle, index) => (
                          <Chip
                            key={index}
                            label={muscle.trim()}
                            color="primary"
                            variant="outlined"
                          />
                        )
                      )}
                    </Stack>
                    {/* <Typography>{selectedUser.focus_area}</Typography> */}
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
                      {(selectedUser.diseases?.split(",") || []).map(
                        (issue, index) => (
                          <Chip
                            key={index}
                            label={issue.trim()}
                            color="error"
                            variant="outlined"
                          />
                        )
                      )}
                    </Stack>
                    {/* <Typography>{selectedUser.diseases}</Typography> */}
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  gap={4}
                  alignItems="flex-start"
                  sx={{ minWidth: 200 }}
                >
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    قد: {toPersianDigits(selectedUser.height)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    زمان هفتگی: {selectedUser.workout_days}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن: {toPersianDigits(selectedUser.weight)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن هدف: {toPersianDigits(selectedUser.goal_weight)}
                  </Typography>
                  <Box sx={{ mr: 3 }}>
                    <img
                      src={
                        BodyForms[selectedUser.gender == "male" ? 0 : 1][
                          selectedUser.body_form-1
                        ]
                      }
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ) : (
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Typography variant="h6" color="text.secondary">
                اطلاعاتی جهت نمایش وجود ندارد.
              </Typography>
            </Box>
          )}

          <Box mb={1} mt={5} textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onStartWritingPlan}
            >
              {updating
                ? "ویرایش برنامه"
                : isreadonly
                ? "ادامه نوشتن برنامه"
                : "شروع نوشتن برنامه"}
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
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}
              >
                نام شاگرد : 
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                readOnly={isreadonly}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  const selectedUser = traineestests.find(
                    (user) => user.trainee_username === e.target.value
                  );
                  setMentorshipId(selectedUser.mentorship_id);
                }}
                sx={{ width: 300 }}
              >
                {traineestests.map((user) => (
                  <MenuItem
                    key={user.mentorship_id}
                    value={user.trainee_username}
                  >
                    {user.trainee_name}
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

          {selectedUser ? (
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
                    {selectedUser.gender
                      ? `جنسیت: ${selectedUser.gender == "male" ? "مرد" : "زن"}`
                      : ""}
                  </Typography>

                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    سن:{" "}
                    {toPersianDigits(
                      calculateAge(new Date(selectedUser.birth_date))
                    )}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    مکان تمرین: {selectedUser.equipment}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    هدف از ورزش: {selectedUser.goal}
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
                      {(selectedUser.focus_area.split(",") || []).map(
                        (muscle, index) => (
                          <Chip
                            key={index}
                            label={muscle.trim()}
                            color="primary"
                            variant="outlined"
                          />
                        )
                      )}
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
                      {(selectedUser.diseases?.split(",") || []).map(
                        (issue, index) => (
                          <Chip
                            key={index}
                            label={issue.trim()}
                            color="error"
                            variant="outlined"
                          />
                        )
                      )}
                    </Stack>
                    {/* <Typography>{selectedUser.diseases}</Typography> */}
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  gap={4}
                  alignItems="flex-start"
                  sx={{ minWidth: 200 }}
                >
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    قد: {toPersianDigits(selectedUser.height)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    زمان هفتگی: {selectedUser.workout_days}
                  </Typography>
                </Stack>

                <Stack
                  direction="column"
                  gap={4}
                  alignItems="flex-start"
                  sx={{ minWidth: 200 }}
                >
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن: {toPersianDigits(selectedUser.weight)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن هدف: {toPersianDigits(selectedUser.goal_weight)}
                  </Typography>
                  <Box sx={{ mr: 3 }}>
                    <img
                      src={
                        BodyForms[selectedUser.gender == "male" ? 0 : 1][
                          selectedUser.body_form-1
                        ]
                      }
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ) : (
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Typography variant="h6" color="text.secondary">
                اطلاعاتی جهت نمایش وجود ندارد.
              </Typography>
            </Box>
          )}

          <Box mb={1} mt={5} textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onStartWritingPlan}
            >
              {updating
                ? "ویرایش برنامه"
                : isreadonly
                ? "ادامه نوشتن برنامه"
                : "شروع نوشتن برنامه"}
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
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}
              >
                نام شاگرد : 
              </Typography>
              {/* <PersonOutlineIcon sx={{ color: '#1976d2', ml: 1 }} /> */}
            </Box>

            <FormControl sx={{ mb: 3.5 }}>
              {/* <InputLabel id="user-select-label">انتخاب شاگرد</InputLabel> */}
              <Select
                labelId="user-select-label"
                value={selectedUserId}
                //   label="انتخاب شاگرد"
                readOnly={isreadonly}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  const selectedUser = traineestests.find(
                    (user) => user.trainee_username === e.target.value
                  );
                  setMentorshipId(selectedUser.mentorship_id);
                }}
                sx={{ width: 300 }}
              >
                {traineestests.map((user) => (
                  <MenuItem
                    key={user.mentorship_id}
                    value={user.trainee_username}
                  >
                    {user.trainee_name}
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
          {selectedUser ? (
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
                    {selectedUser.gender
                      ? `جنسیت: ${selectedUser.gender == "male" ? "مرد" : "زن"}`
                      : ""}
                  </Typography>

                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    سن:{" "}
                    {toPersianDigits(
                      calculateAge(new Date(selectedUser.birth_date))
                    )}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    مکان تمرین: {selectedUser.equipment}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    هدف از ورزش: {selectedUser.goal}
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
                      {(selectedUser.focus_area.split(",") || []).map(
                        (muscle, index) => (
                          <Chip
                            key={index}
                            label={muscle.trim()}
                            color="primary"
                            variant="outlined"
                          />
                        )
                      )}
                    </Stack>
                    {/* <Typography>{selectedUser.focus_area}</Typography> */}
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
                      {(selectedUser.diseases?.split(",") || []).map(
                        (issue, index) => (
                          <Chip
                            key={index}
                            label={issue.trim()}
                            color="error"
                            variant="outlined"
                          />
                        )
                      )}
                    </Stack>
                    {/* <Typography>{selectedUser.diseases}</Typography> */}
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  gap={4}
                  alignItems="flex-start"
                  sx={{ minWidth: 200 }}
                >
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    قد: {toPersianDigits(selectedUser.height)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    زمان هفتگی: {selectedUser.workout_days}
                  </Typography>
                </Stack>

                <Stack
                  direction="column"
                  gap={4}
                  alignItems="flex-start"
                  sx={{ minWidth: 200 }}
                >
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن: {toPersianDigits(selectedUser.weight)}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    وزن هدف: {toPersianDigits(selectedUser.goal_weight)}
                  </Typography>
                  <Box sx={{ mr: 3 }}>
                    <img
                      src={
                        BodyForms[selectedUser.gender == "male" ? 0 : 1][
                          selectedUser.body_form-1
                        ]
                      }
                    />
                  </Box>
                </Stack>

                {/* Body Shape */}
                <Stack>{/* {console.log(BodyForms[0][0])} */}</Stack>
              </Stack>
            </Box>
          ) : (
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Typography variant="h6" color="text.secondary">
                اطلاعاتی جهت نمایش وجود ندارد.
              </Typography>
            </Box>
          )}

          <Box mb={0} textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onStartWritingPlan}
            >
              {updating
                ? "ویرایش برنامه"
                : isreadonly
                ? "ادامه نوشتن برنامه"
                : "شروع نوشتن برنامه"}
            </Button>
          </Box>
        </Box>
      </>
    );
  }
};

export default TestResultCard;
