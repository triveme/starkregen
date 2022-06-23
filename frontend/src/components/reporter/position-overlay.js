import * as React from "react";
import { useState } from "react";

import { Grow } from "@mui/material";
import { Fab } from "@mui/material";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

import { Icon } from "../icon";
import { reporter } from "../../config/reporter";
import useWindowDimensions from "../../providers/window-dimensions-provider";

export function PositionOverlay({ validCoordinates, handleNext, handleReset }) {
  const [open, setOpen] = useState(true);
  const { width } = useWindowDimensions();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={reporter.steps[0].descriptionMarker}
        autoHideDuration={4000}
        key={"Snackbar-key"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 2, position: "absolute" }}
      />
      <Snackbar
        open={!validCoordinates}
        key={"warning"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 2, position: "absolute" }}
      >
        <Alert variant="filled" severity="warning">
          {reporter.steps[0].alertText}
        </Alert>
      </Snackbar>
      <Grow in={true}>
        <Fab
          disabled={!validCoordinates}
          color="error"
          aria-label="Abbrechen"
          sx={{
            pointerEvents: "all",
            ml: "12px !important",
            position: "relative",
            right: `${width * 0.05}px`,
          }}
          onClick={handleReset}
        >
          <Icon icon="cancel" props={{ fontSize: "medium" }} />
        </Fab>
      </Grow>
      <Grow in={true}>
        <Fab
          disabled={!validCoordinates}
          color="primary"
          aria-label="Position bestätigen"
          sx={{
            pointerEvents: "all",
            ml: "12px !important",
            position: "relative",
            left: `${width * 0.05}px`,
          }}
          onClick={handleNext}
        >
          <Icon icon="accept" props={{ fontSize: "medium" }} />
        </Fab>
      </Grow>
    </Box>
  );
}
