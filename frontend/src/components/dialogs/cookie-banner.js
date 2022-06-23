import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";

export function CookieBanner({ open, handleClose }) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        Auf unserer Website kommen ausschließlich technisch notwendige Cookies zum Einsatz. Die Nutzung von technisch
        notwendigen Cookies auf unserer Website ist ohne Einwilligung möglich und zulässig. Aus diesem Grund können
        technisch notwendige Cookies auch nicht einzeln de- bzw. aktiviert werden.
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button onClick={handleClose} variant="contained">
          Verstanden
        </Button>
      </DialogActions>
    </Dialog>
  );
}
