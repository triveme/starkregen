import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { LoadingAndCancelButtons } from "../../elements/loading-button";

import { useStateContext } from "../../providers/state-provider";

import { createAdmin, updateAdmin, deleteAdmin } from "../../clients/admin-client";

export function AddDialog() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleAdminCreationClick = () => {
    return createAdmin(stateContext.authToken, {
      username: username,
      password: password,
    });
  };

  return (
    <>
      <Button size="small" endIcon={<PersonAddIcon />} onClick={handleClickOpen}>
        {" "}
        <Typography variant="button" component="div">
          Hinzufügen
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="admin-edit-title">
        <DialogTitle id="admin-edit-title">Admin Hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="username"
            label="Neuer Nutzername"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password"
            label="Neues Passwort"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingAndCancelButtons
            queryFun={handleAdminCreationClick}
            cancelFun={handleClose}
            queryCompleteFun={handleQueryComplete}
            queryText="Speichern"
            cancelText="Abbrechen"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export function EditDialog({ admin }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState("");

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

  const handleAdminEditClick = () => {
    return updateAdmin(stateContext.authToken, admin.id, {
      username: username,
      password: password,
    });
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        endIcon={<EditIcon />}
        onClick={handleClickOpen}
        sx={{ mt: "8px !important", mr: "8px !important" }}
      >
        {" "}
        <Typography variant="button" component="div">
          Bearbeiten
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="admin-edit-title">
        <DialogTitle id="admin-edit-title">Admin Bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="username"
            label="Neuer Nutzername"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password"
            label="Neues Passwort"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingAndCancelButtons
            queryFun={handleAdminEditClick}
            cancelFun={handleClose}
            queryCompleteFun={handleQueryComplete}
            queryText="Speichern"
            cancelText="Abbrechen"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export function DeleteDialog({ admin }) {
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
    return deleteAdmin(stateContext.authToken, admin.id);
  };

  return (
    <>
      <Button
        disabled={admin.id === 1}
        size="small"
        variant="contained"
        color="error"
        endIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        sx={{ mt: "8px !important", mr: "8px !important" }}
      >
        <Typography variant="button" component="div">
          Löschen
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="admin-edit-title">
        <DialogTitle id="admin-edit-title">Admin Löschen</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Soll der Administrator{" "}
            <Box component="span" fontWeight="bold">
              {admin.username}
            </Box>{" "}
            wirklich permanent gelöscht werden?
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
