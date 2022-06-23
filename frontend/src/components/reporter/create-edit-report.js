import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";

import { ThankYouStep } from "./thank-you-step";
import { CreateEditReport } from "./create-edit-steps";
import { PositionOverlay } from "./position-overlay";

export function CreateEditReportWrapper({
  validCoordinates,
  handleNext,
  handleReset,
  handlePostReportSuccess,
  activeStep,
  reporter,
  handlePostFinished,
}) {
  const [removedImages, setRemovedImages] = useState([]);

  return (
    <>
      {activeStep === 0 ? (
        <PositionOverlay validCoordinates={validCoordinates} handleNext={handleNext} handleReset={handleReset} />
      ) : (
        <Grow in={activeStep > -1}>
          <Card elevation={5} sx={{ pointerEvents: "all" }}>
            <Box component="form" sx={{ p: 1, maxWidth: 400, width: "95vw" }}>
              <Stack direction="row" spacing={1.5}>
                {activeStep !== reporter.steps.length ? (
                  <CreateEditReport
                    validCoordinates={validCoordinates}
                    handleNext={handleNext}
                    handleReset={handleReset}
                    handlePostReportSuccess={handlePostReportSuccess}
                    removedImages={removedImages}
                    setRemovedImages={setRemovedImages}
                  />
                ) : (
                  <ThankYouStep handleReset={handleReset} onPostFinished={handlePostFinished} />
                )}
              </Stack>
            </Box>
          </Card>
        </Grow>
      )}
    </>
  );
}
