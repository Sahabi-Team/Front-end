import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Card, CardContent, Container, Box, Divider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Step1 from "../components/BodyBuildingTest/Step1";
import Step2 from "../components/BodyBuildingTest/Step2";
import Step3 from "../components/BodyBuildingTest/Step3";
import Step4 from "../components/BodyBuildingTest/Step4";
import axios from "axios";
import Navbar from "../components/home/NavbarCard";
import SuccessModal from "../components/modals/SuccessfulModal";
import ErrorModal from "../components/modals/ErrorModal";
import { useNavigate } from "react-router";

const steps = ["مشخصات اولیه", "هدفت چیه؟", "کدوم بیماری را داری؟", "آمادگی جسمانیت الان در چه سطحیه؟"];

const BodyBuildingTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    step1: { height: "", weight: "", goalWeight: "", birthDate: null },
    step2: { goal: "", focusArea: "", equipment: "", workoutDays: "" },
    step3: [],
    step4: null,
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep < steps.length - 1)
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0)
      setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    const payload = {
      height: Number(formData.step1.height),
      weight: Number(formData.step1.weight),
      goal_weight: Number(formData.step1.goalWeight),
      birth_date: formData.step1.birthDate.format('jYYYY-jMM-jDD'),
      goal: formData.step2.goal,
      focus_area: formData.step2.focusArea,
      equipment: formData.step2.equipment,
      workout_days: formData.step2.workoutDays,
      diseases: formData.step3.length > 0 ? formData.step3.join(", ") : null,
      fitness_level: formData.step4 + 1,
    };
    try {
      const response = await axios.post("http://84.234.29.28:8000/api/tests/submit/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenSuccessModal(true);
    }
    catch (error) {
      setOpenErrorModal(true);
    }
  };

  const ContentOfStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 data={formData.step1} setData={(data) => setFormData(prev => ({ ...prev, step1: data }))} setIsFormValid={setIsFormValid}/>;
      case 1:
        return <Step2 data={formData.step2} setData={(data) => setFormData(prev => ({ ...prev, step2: data }))} setIsFormValid={setIsFormValid}/>;
      case 2:
        return <Step3 data={formData.step3} setData={(data) => setFormData(prev => ({ ...prev, step3: data }))} setIsFormValid={setIsFormValid}/>;
      case 3:
        return <Step4 data={formData.step4} setData={(data) => setFormData(prev => ({ ...prev, step4: data }))} setIsFormValid={setIsFormValid} />;
    }
  };


  return (
    <Box>
      <Navbar />
      <CssBaseline enableColorScheme />
      <Container maxWidth={activeStep >= 2 ? false : "sm"} sx={{ mt: 13, maxWidth: "800px" }}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <h2 style={{ textAlign: "center" }}>تست بدنسازی رایگان</h2>
            <h3 style={{ textAlign: "center", color: "gray" }}>{steps[activeStep]}</h3>

            <Stepper activeStep={activeStep} dir="ltr">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel slotProps={{stepIcon: {sx: {fontSize: "36px"}}}} />
                </Step>
              ))}
            </Stepper>

            <Divider sx={{ my: 5 }} />

            {ContentOfStep()}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5, mx: 5 }}>
              <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} disabled={!isFormValid} sx={{borderRadius: 50, width: 100}}>
                {activeStep === steps.length - 1 ? "تایید" : "مرحله بعد"}
              </Button>

              {activeStep > 0 && (
              <Button variant="outlined" onClick={handleBack} sx={{borderRadius: 50, width: 100}}>
                مرحله قبل
              </Button>
              )}
            </Box>

            <SuccessModal open={openSuccessModal} onClose={() => {setOpenSuccessModal(false); navigate("/test_result");}} successMessage="تست بدنسازی با موفقیت ارسال شد!" />
            <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="ارسال تست با خطا مواجه شد! لطفاً دوباره تلاش کنید." />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BodyBuildingTest;