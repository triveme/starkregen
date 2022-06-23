import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

import starkregenFuldaLogo from "../../assets/images/logos/starkregen-fulda-hor.svg";
import starkregenFuldaLogoPrimary from "../../assets/images/logos/starkregen-fulda-hor-primary.svg";

export function InfoWelcomeDialog({ openWelcomeText, handleCloseWelcomeText }) {
  const theme = useTheme();

  return (
    <Dialog maxWidth="xs" open={openWelcomeText} onClose={handleCloseWelcomeText}>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "columns",
          m: 2,
        }}
      >
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mr: 2 }}>
            <img
              src={theme.palette.mode === "light" ? starkregenFuldaLogoPrimary : starkregenFuldaLogo}
              style={{
                width: "200px",
              }}
              alt="Starkregen-Fulda Logo"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h5">Herzlich Willkommen auf der Seite Starkregen-Fulda.de!</Typography>
            <p>
              Sie erinnern sich an ein vergangenes Starkregenereignis und dessen Folgen? Dann teilen Sie auf dieser
              Seite Ihre Erfahrungen und unterstützen Sie uns dabei, starkregengefährdete Gebiete zu identifizieren!{" "}
              <br /> <br />
              <strong>Hinweis:</strong> Bitte melden Sie keine akuten Notfälle oder Gefährdungen. In derartigen Fällen
              ist die Polizei (110) bzw. die Feuerwehr (112) Ihr Ansprechpartner.
            </p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button onClick={handleCloseWelcomeText} variant="contained">
          Schliessen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
