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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Remove, Close } from "@mui/icons-material";
import config from "../../config";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/api/exercises/`)
      .then((response) => {
        setExercises(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError(error.message || "خطا در دریافت داده‌ها");
        // setLoading(false);
      });
  }, []);

  console.log(exercises);
  const exerciseNames = exercises.map((exercise) => exercise.name);
  console.log(exerciseNames);

  const handleNameChange = (selectedId, movename) => {
    onUpdate({ ...moveData, name: selectedId, realname: movename });
  };

  const handleSetValueChange = (setIndex, newValue) => {
    const updatedSets = moveData.sets.map((v, i) =>
      i === setIndex ? parseInt(newValue || 0, 10) : v
    );
    onUpdate({ ...moveData, sets: updatedSets });
  };

  const handleAddSet = () => {
    onUpdate({ ...moveData, sets: [...moveData.sets, 1] });
  };

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

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333" }}
      >
        حرکت {index + 1}
      </Typography>

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
          getOptionLabel={(option) => option.name} // نمایش نام تمرین
          value={exercises.find((e) => e.id === moveData.name) || null} // مقدار انتخاب‌شده بر اساس id
          onChange={(e, newValue) =>
            handleNameChange(newValue?.id || null, newValue?.name)
          } // ذخیره id در state
          renderInput={(params) => (
            <StyledTextField {...params} placeholder="جستجو و انتخاب..." />
          )}
          clearOnBlur
          autoHighlight
          sx={{ width: { xs: "100%", sm: "80%", md: "50%" } }}
        />
      </Stack>

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
                ست {i + 1}
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
  showtest,
  setShowWorkoutPlan,
  initialSessions,
  setInitialsession,
}) => {
  const [sessions, setSessions] = useState(
    initialSessions ?? [{ moves: [], note: "" }]
  );
  const [sessionIndex, setSessionIndex] = useState(0);

  const currentSession = sessions[sessionIndex];

  const { userInfo, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(userInfo);
  console.log(localStorage.getItem("access_token"));

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
    const updatedSession = { ...currentSession, note: e.target.value };
    updateSession(sessionIndex, updatedSession);
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
    setSelectedUserId(null);
    showtest(false);
    setInitialsession(null);
    setShowWorkoutPlan(false);
  };

  console.log(selectedUserId);
  console.log(sessions);

  const handleSubmit = async () => {
    const workoutData = {
      mentorship: selectedUserId,
      status: "شروع نشده",
      name: "برنامه یک ماههههههه",
      description: "برنامه",
    };
    console.log(workoutData);

    const token = localStorage.getItem("access_token");

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

      console.log("برنامه با موفقیت ذخیره شد:", response.data);
      const workoutPlanId = response.data.id;
      console.log("شناسه برنامه ورزشی:", workoutPlanId);

      // ⬇️⬇️⬇️ place the code hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      console.log(sessions);
      for (let dayIndex = 0; dayIndex < sessions.length; dayIndex++) {
        const day = sessions[dayIndex]; // یک روز خاص

        for (let moveIndex = 0; moveIndex < day.moves.length; moveIndex++) {
          const move = day.moves[moveIndex];

          const exercisePayload = {
            exercise_id: move.name, // چون ما در Autocomplete شناسه تمرین رو در name ذخیره کردیم
            workout_plan_id: workoutPlanId,
            sets: move.sets.length,
            reps: move.sets[0] || 0, // مقدار اولین ست
            duration: 0, // اگر داشتی اضافه کن
            description: "تمرین اختصاصی این روز",
            order: moveIndex + 1,
            day: dayIndex + 1,
          };

          console.log("در حال ارسال:", exercisePayload);

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
            console.log(
              `✅ تمرین ${moveIndex + 1} از روز ${
                dayIndex + 1
              } با موفقیت ثبت شد.`
            );
          } catch (exErr) {
            console.error(
              `❌ خطا در ثبت تمرین ${moveIndex + 1} از روز ${dayIndex + 1}:`,
              exErr.response?.data || exErr.message
            );
          }
        }
      }
    } catch (error) {
      console.error(
        "خطا در ذخیره برنامه:",
        error.response?.data || error.message
      );
    }
  };

  const handleshowpreview = () => {
    let dayPrograms = generateDayProgramsFromSessions();
    console.log(dayPrograms);
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

  // console.log(userInfo);

  return (
    <Box px={{ xs: 2, sm: 3, md: 4 }} pb={14}>
      <Typography variant="h6" color="primary" mb={3} textAlign="left">
        جلسه تمرینی {sessionIndex + 1}
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
          توضیحات جلسه:
        </Typography>
        <TextField
          multiline
          minRows={3}
          fullWidth
          value={currentSession.note}
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
        width="100%"
        bgcolor="#ffffffee"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
        py={2}
        px={3}
        zIndex={1300}
        mt={3}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="contained"
            onClick={goToPreviousDay}
            disabled={sessionIndex === 0}
            color="primary"
            fullWidth={true}
          >
            روز قبل
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={goToNextDay}
            fullWidth={true}
          >
            روز بعد
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={handleshowtest}
          >
            نتیجه تست
          </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={handleshowpreview}
            fullWidth={true}
          >
            پیش نمایش
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancel}
            fullWidth={true}
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth={true}
          >
            ذخیره برنامه
          </Button>
        
        </Stack>
      </Box>
    </Box>
  );
};

export default ComboBox;
