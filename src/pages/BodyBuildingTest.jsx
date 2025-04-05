import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Card, CardContent, Container, Box, Divider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Step1 from "../components/BodyBuildingTest/Step1";
import Step2 from "../components/BodyBuildingTest/Step2";
import Step3 from "../components/BodyBuildingTest/Step3";

const steps = ["مشخصات اولیه", "هدفت چیه؟", "کدوم بیماری را داری؟", "آمادگی جسمانیت الان در چه سطحیه؟"];

const BodyBuildingTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNext = () => {
    if (activeStep < steps.length - 1)
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0)
      setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    alert("فرم با موفقیت ثبت شد!");
  };

  const ContentOfStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 setIsFormValid={setIsFormValid} />;
      case 1:
        return <Step2 setIsFormValid={setIsFormValid} />;
      case 2:
        return <Step3 />;
      default:
        return <p>محتوای این مرحله هنوز اضافه نشده</p>;
    }
  };

  return (
    <Container maxWidth={activeStep === 2 ? false : "sm"} sx={{ mt: 5, maxWidth: "800px" }}>
      <CssBaseline enableColorScheme />
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>تست بدنسازی رایگان</h2>
          <p style={{ textAlign: "center", color: "gray" }}>{steps[activeStep]}</p>

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
        </CardContent>
      </Card>
    </Container>
  );
};

export default BodyBuildingTest;