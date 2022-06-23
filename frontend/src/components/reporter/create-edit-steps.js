import { Stepper, Step, StepLabel, StepContent, Alert, Typography, Box, Button } from "@mui/material";

import { DataStep } from "./data-step";
import { LoadingAndCancelButtons } from "../../elements/loading-button";
import { reporter } from "../../config/reporter";
import { useStateContext } from "../../providers/state-provider";
import { createReport, updateReport } from "../../clients/report-client";

export function CreateEditReport({
  validCoordinates,
  handleNext,
  handleReset,
  handlePostReportSuccess,
  removedImages,
  setRemovedImages,
}) {
  const { stateContext, setStateContext } = useStateContext();
  const { activeStep, categoryValue, dateValue, descriptionValue, mailValue, images, userMarkerPosition, countyValue } =
    stateContext.reporter;

  const handlePostReportClick = () => {
    // TODO: Send captcha to backend to verify requests
    const formData = new FormData();
    formData.append("lat", userMarkerPosition.lat);
    formData.append("lng", userMarkerPosition.lng);
    formData.append("category", categoryValue);
    formData.append("county", countyValue);
    formData.append("description", descriptionValue);
    formData.append("date", dateValue);
    formData.append("email", mailValue);
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append(`file`, image);
      });
    }
    return createReport(formData);
  };

  const handleUpdateReportClick = () => {
    // TODO: Send captcha to backend to verify request
    const formData = new FormData();
    formData.append("lat", userMarkerPosition.lat);
    formData.append("lng", userMarkerPosition.lng);
    formData.append("category", categoryValue);
    formData.append("county", countyValue);
    formData.append("description", descriptionValue);
    formData.append("date", dateValue);
    formData.append("email", mailValue);
    formData.append("lastModifiedBy", stateContext.adminId);
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append(`file`, image);
      });
    }
    if (removedImages && removedImages.length > 0) {
      formData.append("removedImage", JSON.stringify(removedImages));
    }
    return updateReport(stateContext.authToken, stateContext.reporter.idIfEdit, formData);
  };

  const handleUpdateReportSuccess = ({ data }) => {
    setStateContext({
      ...stateContext,
      queryTrigger: stateContext.queryTrigger + 1,
      selectedReport: data?.id ? data.id : null,
      reporter: {
        ...reporter.default,
      },
    });
  };

  const handleBack = () => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        activeStep: activeStep - 1,
        captchaSolved: false,
      },
    });
  };

  // const handleCaptchaSolve = (token, ekey) => {
  //   setStateContext({
  //     ...stateContext,
  //     reporter: {
  //       ...stateContext.reporter,
  //       captchaSolved: token,
  //     },
  //   });
  // };

  return (
    <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: "100%", paddingX: 1 }}>
      {reporter.steps.map((step, index) => (
        <Step
          key={step.label}
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            {index === 0 ? (
              <>
                {!validCoordinates ? (
                  <Alert sx={{ pb: 0, pt: 0, mb: 1 }} severity="warning" variant="outlined">
                    {step.alertText}
                  </Alert>
                ) : null}
                <Typography component="div" variant="body2" sx={{ mb: 1 }}>
                  {step.descriptionMarker}
                </Typography>
              </>
            ) : index === 1 ? (
              <DataStep removedImages={removedImages} setRemovedImages={setRemovedImages} />
            ) : index === 2 ? (
              <>
                {/* <Box>
                                                        <HCaptcha
                                                            size={matchesDesktop ? "normal" : "compact"}
                                                            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                                            onVerify={(token, ekey) => handleCaptchaSolve(token, ekey)}
                                                        />
                                                    </Box> */}
                <Typography component="div" variant="caption" sx={{ mb: 1 }}>
                  {stateContext.reporter.idIfEdit ? step.acceptEdit : step.accept}
                </Typography>
              </>
            ) : null}
            <Box sx={{ mb: 1.5 }}>
              {index === reporter.steps.length - 1 ? (
                !stateContext.reporter.idIfEdit ? (
                  <LoadingAndCancelButtons
                    queryFun={handlePostReportClick}
                    cancelFun={handleBack}
                    queryCompleteFun={handlePostReportSuccess}
                    queryText={reporter.send}
                    cancelText={reporter.back}
                    style={{ mt: 1, mr: 1 }}
                  />
                ) : (
                  <LoadingAndCancelButtons
                    queryFun={handleUpdateReportClick}
                    cancelFun={handleBack}
                    queryCompleteFun={handleUpdateReportSuccess}
                    queryText={reporter.edit}
                    cancelText={reporter.back}
                    style={{ mt: 1, mr: 1 }}
                  />
                )
              ) : (
                <>
                  <Button
                    variant="contained"
                    disabled={
                      (index === 0 && !validCoordinates) || (index === 1 && descriptionValue === "")
                      // TODO: Reenable
                      // || (index === 2 && !captchaSolved)
                    }
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    <Typography variant="button" component="div">
                      {reporter.continue}
                    </Typography>
                  </Button>
                  <Button onClick={index === 0 ? handleReset : handleBack} sx={{ mt: 1, mr: 1 }} color="secondary">
                    <Typography variant="button" component="div" color="secondary">
                      {index === 0 ? reporter.cancel : reporter.back}
                    </Typography>
                  </Button>
                </>
              )}
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
