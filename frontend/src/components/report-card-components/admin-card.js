import { useState } from "react";

import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { FullInfoCard } from "./full-info-card";
import { LoadingButton } from "../../elements/loading-button";
import { DeleteDialog } from "../reporter/dialogs";
import { useStateContext } from "../../providers/state-provider";
import { updateReport } from "../../clients/report-client";

export function AdminCard({ report, admins, handleChangeLocation, handleTriggerCenterMap }) {
  const { stateContext, setStateContext } = useStateContext();
  const [statusValue, setStatusValue] = useState(report.status);

  const [comment, setComment] = useState(report.comment);
  const [adminComment, setAdminComment] = useState(report.adminComment);

  const handleStatusRadioChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleEditClick = () => {
    handleChangeLocation(report.location.coordinates);
    handleTriggerCenterMap();
    setStateContext({
      ...stateContext,
      reporter: {
        idIfEdit: report.id,
        activeStep: 0,
        categoryValue: report.category,
        countyValue: report.county,
        descriptionValue: report.description,
        dateValue: new Date(report.date),
        mailValue: report.email,
        userMarkerPosition: {
          lat: report.location.coordinates.lat,
          lng: report.location.coordinates.lng,
        },
      },
    });
  };

  const lastChanger =
    report.lastModifiedBy && admins ? admins.filter((admin) => admin.id === report.lastModifiedBy)[0] : null;

  const handleReportStatusChangeSubmit = (event) => {
    event.preventDefault();
    return updateReport(stateContext.authToken, report.id, {
      status: statusValue,
      lastModifiedBy: stateContext.adminId,
      adminComment: adminComment,
    });
  };

  const handleReportCommentChangeSubmit = (event) => {
    event.preventDefault();
    return updateReport(stateContext.authToken, report.id, {
      comment: comment,
    });
  };

  // const handleEmailCopyClick = () => {
  //   if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
  //     navigator.clipboard.writeText(report.email).then(() => {
  //       snackActions.info("Die Email-Adresse '" + report.email + "' wurde in die Zwischenablage kopiert");
  //     });
  //   }
  // };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAdminCommentChange = (event) => {
    setAdminComment(event.target.value);
  };

  return (
    <>
      <FullInfoCard report={report} />
      {report.email?.length > 0 ? (
        <>
          <Divider />
          <Stack spacing={0.5} direction="row">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: "12px !important",
                mb: "4px !important",
                fontSize: "small",
              }}
            >
              {"Gemeldet von: " + report.email}
            </Typography>
            {/* alternative: copy e-mail-address in  */}
            {/* <IconButton aria-label="In Zwischenablage kopieren" onClick={handleEmailCopyClick}>
                <ContentCopyIcon fontSize="small" />
              </IconButton> */}
            <IconButton
              aria-label="In Zwischenablage kopieren"
              onClick={() => {
                window.location.href = "mailto:" + report.email;
              }}
            >
              <MailOutlineIcon />
            </IconButton>
          </Stack>
        </>
      ) : null}
      <Divider />
      <form>
        <FormControl sx={{ p: 1, width: "100%" }} variant="standard">
          {/* -----------------------------------------  Status ------------------------------------------------ */}
          <FormLabel id="report-status-radios">Status:</FormLabel>
          <RadioGroup
            aria-labelledby="report-status-radios"
            name="report-status"
            value={statusValue}
            onChange={handleStatusRadioChange}
          >
            <FormControlLabel value="pending" control={<Radio sx={{ pt: 0.5, pb: 0.5 }} />} label="Ausstehend" />
            <FormControlLabel value="active" control={<Radio sx={{ pt: 0.5, pb: 0.5 }} />} label="Sichtbar" />
            <FormControlLabel value="hidden" control={<Radio sx={{ pt: 0.5, pb: 0.5 }} />} label="Ausgeblendet" />
          </RadioGroup>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: "4px !important",
              mb: "4px !important",
              fontSize: "small",
            }}
          >
            {lastChanger
              ? "Zuletzt geändert von: " + lastChanger.username
              : "Diese Meldung wurde von keinem der existierenden Admins bearbeitet"}
          </Typography>
          <TextField
            label="Statusnachricht (für Admins)"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            multiline
            maxRows={4}
            size="small"
            value={adminComment}
            onChange={handleAdminCommentChange}
            inputProps={{ maxLength: 400 }}
            id="report-admin-comment"
          />
          <LoadingButton
            style={{ mt: 1 }}
            type="submit"
            fullWidth
            queryFun={handleReportStatusChangeSubmit}
            queryText="Status speichern"
          />
          <Divider sx={{ mt: 2 }} />
          {/* ----------------------------------------- Kommentar -----------------------------------------  */}
          <FormLabel id="report-comment" sx={{ mt: 2 }}>
            Kommentar:
          </FormLabel>
          <TextField
            label="Kommentar (für User)"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            multiline
            maxRows={4}
            size="small"
            value={comment}
            onChange={handleCommentChange}
            inputProps={{ maxLength: 400 }}
            id="report-comment"
          />
          <LoadingButton
            style={{ mt: 1 }}
            type="submit"
            fullWidth
            queryFun={handleReportCommentChangeSubmit}
            queryText="Kommentar speichern"
          />
        </FormControl>
      </form>

      <Divider />

      <Box sx={{ m: 1 }}>
        <Button
          size="small"
          fullWidth
          variant="contained"
          color="secondary"
          endIcon={<EditIcon />}
          onClick={handleEditClick}
        >
          <Typography variant="button" component="div">
            Bearbeiten
          </Typography>
        </Button>
      </Box>
      <Box sx={{ m: 1 }}>
        <DeleteDialog report={report} />
      </Box>
    </>
  );
}
