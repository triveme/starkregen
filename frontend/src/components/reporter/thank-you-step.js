import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

import { reporter } from "../../config/reporter";
import { MarkerPin } from "../../elements/marker-pin";

export function ThankYouStep({ handleReset, onPostFinished }) {
  return (
    <Box
      square
      sx={{
        pt: 3,
        pl: 3,
        pr: 3,
        pb: 1,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        {reporter.finalStep.thanks}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
        {reporter.finalStep.inputValidation}
      </Typography>
      <Box display="flex" justifyContent="center">
        <MarkerPin report={{ status: "pending" }} onClick={null} />
      </Box>
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        {reporter.finalStep.emailFeedback}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {reporter.finalStep.questions}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {reporter.finalStep.mail}
      </Typography>
      <Button onClick={onPostFinished} sx={{ mt: 1, mr: 1 }}>
        <Typography variant="button" component="div">
          {reporter.close}
        </Typography>
      </Button>
    </Box>
  );
}
