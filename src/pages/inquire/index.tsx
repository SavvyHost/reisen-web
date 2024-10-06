import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import CitySelection from "@/components/molecules/inquiredetails/CitySelection";
import TimeDetails from "@/components/molecules/inquiredetails/TimeDetails";
import TravelDetails from "@/components/molecules/inquiredetails/TravelDetails";

const TravelStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // Required
    email: "", // Required
    nationality: "", // Required
    phone: "", // Required
    adults: 2, // Optional
    children: 0, // Optional
    infants: 0, // Optional
    budget: "", // Required
    flightOffer: false, // Optional
    additionalInfo: "", // Optional
    city: "", // If you need this for the form
    cityDetails: {}, // If you need this for the form
    travelDetails: {}, // If you need this for the form
  });

  const steps = ["Choose City", "City Details", "Travel Details"];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (stepData: any) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CitySelection formData={formData} onChange={handleFormChange} />
        );
      case 1:
        return <TimeDetails formData={formData} onChange={handleFormChange} />;
      case 2:
        return (
          <TravelDetails formData={formData} onChange={handleFormChange} />
        );
      default:
        return "Done";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-8">
        {isDone ? (
          <div className="text-center text-2xl font-bold">Done!</div>
        ) : (
          getStepContent(activeStep)
        )}
      </div>
      <div className="mt-4 lg:px-96 flex justify-between">
        <Button disabled={activeStep === 0 || isDone} onClick={handleBack}>
          Back
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-400"
          variant="contained"
          onClick={handleNext}
          disabled={isDone}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default TravelStepper;
