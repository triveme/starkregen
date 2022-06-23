import { useState } from "react";

import Button from "@mui/material/Button";
import { LoadingAndCancelButtons } from "../../elements/loading-button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import { useStateContext } from "../../providers/state-provider";

import { deleteReport } from "../../clients/report-client";

export function DeleteDialog({ report }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { stateContext, setStateContext } = useStateContext();

  const handleQueryComplete = () => {
    handleClose();
    setStateContext({
      ...stateContext,
      queryTrigger: stateContext.queryTrigger + 1,
    });
  };

  const handleAdminDeleteClick = () => {
    return deleteReport(stateContext.authToken, report.id);
  };

  return (
    <>
      <Button
        size="small"
        fullWidth
        variant="contained"
        color="error"
        endIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        <Typography variant="button" component="div">
          Löschen
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="report-edit-title"
      >
        <DialogTitle id="report-edit-title">Meldung Löschen</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Soll diese Meldung wirklich permanent gelöscht werden?
          </Typography>
        </DialogContent>
        <DialogActions>
          <LoadingAndCancelButtons
            queryFun={handleAdminDeleteClick}
            cancelFun={handleClose}
            queryCompleteFun={handleQueryComplete}
            queryText="Löschen"
            cancelText="Abbrechen"
            queryColor="error"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
