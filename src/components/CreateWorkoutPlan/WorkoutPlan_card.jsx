import React, { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Stack,
  IconButton,
  Paper,
  Button,
  Input,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Remove, Close } from "@mui/icons-material";
import config from "../../config";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../modals/ErrorModal";
import SuccessfulModal from "../modals/SuccessfulModal";
import CircularProgress from "@mui/material/CircularProgress"; // MUI spinner

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#999",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
      borderWidth: 2,
    },
  },
}));

const SmallNumberInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    fontSize: "14px",
    height: "40px",
    "& input": {
      textAlign: "center",
    },
  },
}));

const NumberBox = ({ value, onChange }) => (
  <SmallNumberInput
    type="number"
    value={value}
    onChange={onChange}
    variant="outlined"
    size="small"
    sx={{
      width: "70px",
      backgroundColor: "#f9f9f9",
    }}
  />
);

const options = ["پرس سینه", "اسکات", "ددلیفت", "شنا", "بارفیکس", "سرشانه"];

const MoveBlock = ({ index, moveData, onUpdate, onDelete }) => {
  const [exercises, setExercises] = useState([]);

  const toPersianNumber = (num) =>
    num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  // 🟡 Fetch list of exercises from the backend
  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/api/exercises/`)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("خطا در دریافت لیست حرکات:", error.message);
      });
  }, []);

  // 🟢 Update exercise ID and label when changed
  const handleNameChange = (selectedId, movename) => {
    onUpdate({ ...moveData, name: selectedId, realname: movename });
  };

  // 🔧 Update the value of a specific set
  const handleSetValueChange = (setIndex, newValue) => {
    const updatedSets = moveData.sets.map((v, i) =>
      i === setIndex ? parseInt(newValue || 0, 10) : v
    );
    onUpdate({ ...moveData, sets: updatedSets });
  };

  // ➕ Add a new set (default 1 rep)
  const handleAddSet = () => {
    onUpdate({ ...moveData, sets: [...moveData.sets, 1] });
  };

  // ➖ Remove the last set
  const handleRemoveLastSet = () => {
    if (moveData.sets.length > 1) {
      onUpdate({ ...moveData, sets: moveData.sets.slice(0, -1) });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 3,
        backgroundColor: "#fcfcfc",
        position: "relative",
      }}
    >
      {/* ❌ Delete button */}
      <IconButton
        onClick={onDelete}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "#f44336",
          backgroundColor: "#fff",
          border: "1px solid #eee",
          "&:hover": {
            backgroundColor: "#fdecea",
          },
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      {/* 🔤 Title */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333" }}
      >
        حرکت {toPersianNumber(index + 1)}
      </Typography>

      {/* 🔍 Exercise Selector */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={2}
        flexWrap="wrap"
      >
        <Typography variant="body1" color="text.secondary">
          نام حرکت :
        </Typography>
        <Autocomplete
          options={exercises}
          getOptionLabel={(option) => option.name}
          value={exercises.find((e) => e.id === moveData.name) || null}
          onChange={(e, newValue) =>
            handleNameChange(newValue?.id || null, newValue?.name)
          }
          renderInput={(params) => (
            <StyledTextField {...params} placeholder="جستجو و انتخاب..." />
          )}
          clearOnBlur
          autoHighlight
          sx={{ width: { xs: "100%", sm: "80%", md: "50%" } }}
        />
      </Stack>

      {/* 🧱 Sets Editor */}
      {moveData.name && (
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          flexWrap="wrap"
          sx={{ mt: 2 }}
        >
          {moveData.sets.map((rep, i) => (
            <Stack key={i} direction="column" alignItems="center" spacing={1}>
              <Typography variant="caption" color="text.secondary">
                ست {toPersianNumber(i + 1)}
              </Typography>
              <NumberBox
                value={rep}
                onChange={(e) => handleSetValueChange(i, e.target.value)}
              />
            </Stack>
          ))}

          <Box
            display="flex"
            gap={0.5}
            mt={3.5}
            flexWrap="wrap"
            justifyContent={{ xs: "start", sm: "center" }}
          >
            {/* ➕ Add Set Button */}
            <IconButton
              onClick={handleAddSet}
              sx={{
                border: "1px solid #1976d2",
                color: "#1976d2",
                borderRadius: "50%",
                width: 36,
                height: 36,
                backgroundColor: "#e3f2fd",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              }}
            >
              <Add fontSize="small" />
            </IconButton>

            {/* ➖ Remove Set Button */}
            <IconButton
              onClick={handleRemoveLastSet}
              disabled={moveData.sets.length === 1}
              sx={{
                border: "1px solid #f44336",
                color: "#f44336",
                borderRadius: "50%",
                width: 36,
                height: 36,
                backgroundColor: "#ffebee",
                "&:hover": {
                  backgroundColor: "#ffcdd2",
                },
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      )}
    </Paper>
  );
};

const ComboBox = ({
  selectedUserId,
  setSelectedUserId,
  mentorshipId,
  setMentorshipId,
  showtest,
  setShowWorkoutPlan,
  initialSessions,
  setInitialsession,
  updating,
  workoutplanidonupdate,
  initialworkoutname,
  initialworkoutdescription,
}) => {
  const [sessions, setSessions] = useState(
    initialSessions ?? [{ moves: [], note: "" }]
  );
  const [sessionIndex, setSessionIndex] = useState(0);

  const currentSession = sessions[sessionIndex];

  const { userInfo, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [workoutname, setWorkoutname] = useState(
    initialworkoutname == null ? null : initialworkoutname
  );

  const [workoutdescription, setWorkoutdescription] = useState(
    initialworkoutdescription == null ? null : initialworkoutdescription
  );

  const toPersianNumber = (num) =>
    num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const [successmessage, setSuccessMessage] = React.useState("");
  const [opensuccessfulmodal, setOpenSuccessfulModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = useState(false);

  // console.log(userInfo);
  // console.log(localStorage.getItem("access_token"));
  //  console.log(mentorshipId ,"  MID");

  //  console.log("sessionssssssss  ",sessions);

  const handleshowtest = () => {
    showtest(true);
    setShowWorkoutPlan(false);
    setInitialsession(sessions);
  };

  const handleAddMove = () => {
    const newMove = { name: null, sets: [1] };
    const updatedSession = {
      ...currentSession,
      moves: [...currentSession.moves, newMove],
    };
    updateSession(sessionIndex, updatedSession);
  };

  const handleUpdateMove = (index, updatedMove) => {
    const updatedMoves = [...currentSession.moves];
    updatedMoves[index] = updatedMove;
    const updatedSession = { ...currentSession, moves: updatedMoves };
    updateSession(sessionIndex, updatedSession);
  };

  const handleDeleteMove = (index) => {
    const updatedMoves = currentSession.moves.filter((_, i) => i !== index);
    const updatedSession = { ...currentSession, moves: updatedMoves };
    updateSession(sessionIndex, updatedSession);
  };

  const handleNoteChange = (e) => {
    // const updatedSession = { ...currentSession, note: e.target.value };
    // updateSession(sessionIndex, updatedSession);
    setWorkoutdescription(e.target.value);
  };

  const updateSession = (index, updatedSession) => {
    setSessions((prev) =>
      prev.map((s, i) => (i === index ? updatedSession : s))
    );
  };

  const goToNextDay = () => {
    if (sessionIndex === sessions.length - 1) {
      setSessions((prev) => [...prev, { moves: [], note: "" }]);
    }
    setSessionIndex((prev) => prev + 1);
  };

  const goToPreviousDay = () => {
    if (sessionIndex > 0) {
      setSessionIndex((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    if (updating) {
      navigate("/trainer_students");
    } else {
      setSelectedUserId(null);
      showtest(false);
      setInitialsession(null);
      setShowWorkoutPlan(false);
    }
  };

  const deleteWorkoutPlanById = async (planId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("❌ توکن یافت نشد.");
      // return 1;
    }

    try {
      await axios.delete(
        `${config.API_BASE_URL}/api/workout/workout-plans/${planId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "❌ خطا در حذف workout plan:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let error_occured = false;

    for (let dayIndex = sessions.length - 1; dayIndex >= 0; dayIndex--) {
      const day = sessions[dayIndex];

      // حذف حرکاتی که name ندارند
      for (let moveIndex = day.moves.length - 1; moveIndex >= 0; moveIndex--) {
        const move = day.moves[moveIndex];
        if (move.name == null) {
          day.moves.splice(moveIndex, 1);
        }
      }

      // اگر پس از فیلتر، حرکتی باقی نماند، کل روز را حذف کن
      if (day.moves.length === 0) {
        sessions.splice(dayIndex, 1);
      }
    }
    setSessionIndex(sessions.length == 0 ? 0 : sessions.length - 1);

    if (
      !(
        sessions.length == 0 ||
        (sessions.length == 1 && sessions[0].moves.length == 0)
      )
    ) {
      if (updating == true) {
        await deleteWorkoutPlanById(workoutplanidonupdate);
      }

      const workoutData = {
        mentorship: mentorshipId,
        status: "در حال انجام",
        name: workoutname == null ? "برنامه یک ماهه" : workoutname,
        description: (workoutdescription==null)? "هیچ یادداشتی اضافه نشده است." :workoutdescription,
      };

      const token = localStorage.getItem("access_token");

      let workoutPlanId = null;
      try {
        const response = await axios.post(
          `${config.API_BASE_URL}/api/workout/workout-plans/`,
          workoutData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        workoutPlanId = response.data.id;

        for (let dayIndex = 0; dayIndex < sessions.length; dayIndex++) {
          const day = sessions[dayIndex]; // یک روز خاص

          for (let moveIndex = 0; moveIndex < day.moves.length; moveIndex++) {
            const move = day.moves[moveIndex];
            // console.log(move.name,"     salamas");
            const exercisePayload = {
              exercise_id: move.name, // چون ما در Autocomplete شناسه تمرین رو در name ذخیره کردیم
              workout_plan_id: workoutPlanId,
              sets: move.sets.length,
              reps: move.sets[0] || 0, // مقدار اولین ست
              // duration: , // اگر داشتی اضافه کن
              description: "تمرین اختصاصی این روز",
              order: moveIndex + 1,
              day: dayIndex + 1,
            };

            try {
              const res = await axios.post(
                `${config.API_BASE_URL}/api/workout/workout-plans/${workoutPlanId}/add_exercise/`,
                exercisePayload,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            } catch (exErr) {
              error_occured = true;
            }
          }
        }
      } catch (error) {
        error_occured = true;
        await deleteWorkoutPlanById(workoutPlanId);
        setErrorMessage("خطا در ساختن برنامه");
      }
    } else {
      setSessions([{ moves: [], note: "" }]);
      setErrorMessage("هیچ حرکتی انتخاب نشده است.");
      // setOpenErrorModal(true);
      error_occured = true;
      setLoading(false);
    }

    if (error_occured) {
      setOpenErrorModal(true);
    } else {
      setSuccessMessage("برنامه با موفقیت ذخیره شد.");
      setOpenSuccessfulModal(true);

      setTimeout(() => {
        handleshowpreview();
      }, 1500); // 60000 میلی‌ثانیه = 60 ثانیه
    }

    setLoading(false); // پایان حالت لودینگ
  };


  // just for debugging purpose
  const delete_programs = async () => {
    const token = localStorage.getItem("access_token");
    // alert(token);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/mentorship/mentorships/${mentorshipId}/last_workout_plan/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("ddd ",response.data);
      let x = response.data.id;
      deleteWorkoutPlanById(x);
    } catch {
      alert("eeror");
    }
  };

  const handleshowpreview = () => {
    let dayPrograms = generateDayProgramsFromSessions();
    // console.log(dayPrograms);
    navigate("/workoutpreview", { state: { dayPrograms } });
  };

  function generateDayProgramsFromSessions() {
    return sessions.map((session, index) => {
      const dayTitle = `برنامه روز ${convertNumberToPersian(index + 1)}`;

      const exercises = session.moves.map((move) => {
        return {
          id: move.name,
          name: move.realname,
          sets: move.sets.map((reps, idx) => ({
            setNumber: idx + 1,
            reps: reps.reps ?? reps, // پشتیبانی از حالت ساده عدد یا آبجکت { reps: ... }
          })),
        };
      });

      return {
        title: dayTitle,
        exercises,
      };
    });
  }
  function convertNumberToPersian(number) {
    const persianNumbers = [
      "اول",
      "دوم",
      "سوم",
      "چهارم",
      "پنجم",
      "ششم",
      "هفتم",
      "هشتم",
      "نهم",
      "دهم",
    ];
    return persianNumbers[number - 1] || number.toString();
  }

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // بستن مودال
  };
  const handleCloseSuccessfulModal = () => {
    setOpenSuccessfulModal(false); // بستن مودال
  };

  const handlechangeworkoutname = (e) => {
    setWorkoutname(e.target.value);
  };
  // console.log(userInfo);

  return (
    <Stack>
      <Box
        px={{ xs: 2, sm: 3, md: 4 }}
        sx={{
          width: "90%",
          // maxWidth: 400,
          mx: "auto 0",
          mt: 5,
          mb: 1,
          // ml:5,
          // backgroundColor:'red',
        }}
      >
        <Stack direction={"row"}>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              mr: 1,
              // ml: 4.5,
              fontWeight: 500,
              whiteSpace: "nowrap",
              fontSize: 19,
            }}
          >
            نام برنامه:
          </Typography>

          <TextField
            placeholder="مثلاً: برنامه تمرینی قدرتی"
            variant="outlined"
            value={workoutname}
            onChange={handlechangeworkoutname}
            sx={{
              width: { xs: "70%", md: "40%" },
              bgcolor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </Stack>
        <Divider
          sx={{
            my: 3,
            borderColor: "#ddd",
            borderWidth: "1px",
            width: "50%",
            mx: "auto 0",
          }}
        />
      </Box>

      <Box px={{ xs: 2, sm: 3, md: 4 }} pb={14}>
        <Typography variant="h6" color="primary" mb={3} textAlign="left">
          جلسه تمرینی {toPersianNumber(sessionIndex + 1)}
        </Typography>

        {currentSession.moves.map((move, index) => (
          <MoveBlock
            key={index}
            index={index}
            moveData={move}
            onUpdate={(data) => handleUpdateMove(index, data)}
            onDelete={() => handleDeleteMove(index)}
          />
        ))}

        <Box display="flex" justifyContent="center" mt={2}>
          <Paper
            onClick={handleAddMove}
            elevation={2}
            sx={{
              borderRadius: 3,
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              border: "1px dashed #aaa",
              backgroundColor: "#fefefe",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1976d2",
              },
            }}
          >
            <Add fontSize="small" />
            <Typography variant="body2">افزودن حرکت</Typography>
          </Paper>
        </Box>

        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            توضیحات برنامه :
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            value={workoutdescription}
            onChange={handleNoteChange}
            placeholder="توضیحات بیشتری بنویسید..."
            sx={{
              backgroundColor: "#fafafa",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Footer */}
        <Box
          bottom={0}
          left={0}
          width={{ xs: "50%", md: "80%" }}
          bgcolor="#ffffffee"
          boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
          py={2}
          px={3}
          zIndex={1300}
          mt={3}
          sx={{
            mx: "auto", // این خط باعث می‌شود باکس به صورت افقی وسط‌چین شود
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              onClick={goToPreviousDay}
              disabled={sessionIndex === 0}
              color="primary"
              sx={{
                width: { xs: "100%", md: 300 },
                whiteSpace: "nowrap",
              }}
            >
              روز قبل
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={goToNextDay}
              sx={{
                width: { xs: "100%", md: 300 },
                whiteSpace: "nowrap",
              }}
            >
              روز بعد
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleshowtest}
              sx={{
                width: { xs: "100%", md: 300 },
                whiteSpace: "nowrap",
              }}
            >
              نتیجه تست
            </Button>
            {/* <Button
            variant="contained"
            color="primary"
            onClick={handleshowpreview}
            fullWidth={true}
          >
            پیش نمایش
          </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancel}
              sx={{
                width: { xs: "100%", md: 300 },
              }}
            >
              انصراف
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: { xs: "100%", md: 350 },
                whiteSpace: "nowrap",
              }}
            >
              {loading && (
                <CircularProgress size={20} sx={{ color: "white" }} />
              )}
              {loading ? "در حال ذخیره..." : "ذخیره برنامه"}
            </Button>
          </Stack>
        </Box>
        <ErrorModal
          open={openErrorModal}
          onClose={handleCloseErrorModal}
          errorMessage={errorMessage}
        />
        <SuccessfulModal
          open={opensuccessfulmodal}
          onClose={handleCloseSuccessfulModal}
          successMessage={successmessage}
        />
      </Box>
    </Stack>
  );
};

export default ComboBox;
