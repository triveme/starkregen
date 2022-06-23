import { useState } from "react";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";

import useDesktop from "../../providers/use-desktop";
import { useStateContext } from "../../providers/state-provider";

export function FullInfoCard({ report }) {
  const matchesDesktop = useDesktop();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const { stateContext } = useStateContext();

  const handleImageDialogOpen = (index) => {
    setOpenedImageIndex(index);
    setImageDialogOpen(true);
  };

  const handleImageDialogClose = () => setImageDialogOpen(false);

  const reportDate = report.date ? new Date(report.date) : null;
  const reportDateString = reportDate ? reportDate.toLocaleDateString("de-DE") : null;

  return (
    <>
      <CardHeader title={report.category} subheader={reportDateString} sx={{ p: 0, pb: 1 }} />
      <Typography>Gemeinde: {report.county}</Typography>
      {report.imgPath && report.imgPath.length > 0
        ? report.imgPath.map((path, index) => {
            return (
              <Box display="flex" justifyContent="center" key={`Meldungsbild${index}`}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    cursor: "pointer",
                  }}
                  image={process.env.REACT_APP_BASE_URL + path}
                  alt={report.id + "-meldungsbild"}
                  onClick={() => {
                    handleImageDialogOpen(index);
                  }}
                />
              </Box>
            );
          })
        : null}
      <CardContent sx={{ p: 0, mt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "0px !important", mb: "8px !important" }}>
          {report.description}
        </Typography>
        {/* {report.id % 3 === 0 ? (
            <Alert severity="success">Das Problem wurde behoben</Alert>
          ) : report.id % 3 === 1 ? (
            <Alert severity="warning">
              Das Problem ist bekannt und wird schnellstmöglich bearbeitet
            </Alert>
          ) : report.id % 3 === 2 ? (
            <Alert severity="info">Das Problem wird behoben</Alert>
          ) : null} */}
      </CardContent>
      {report.imgPath && report.imgPath.length > 0 && report.imgPath.length > openedImageIndex ? (
        <Dialog
          fullScreen={matchesDesktop === false}
          maxWidth="xl"
          open={imageDialogOpen}
          onClose={handleImageDialogClose}
        >
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={process.env.REACT_APP_BASE_URL + report.imgPath[openedImageIndex]}
              alt={report.id + "-meldungsbild-groß"}
            />
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleImageDialogClose}>Schliessen</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {!stateContext.authToken && report.comment ? (
        <Card sx={{ mt: 5 }}>
          <CardHeader subheader="Kommentar" />
          <CardContent sx={{ p: 0, m: 2, mt: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: "0px !important", mb: "8px !important", fontStyle: "italic" }}
            >
              {report.comment}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
