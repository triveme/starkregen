import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function PendingCard() {
  return (
    <>
      <CardHeader title="Meldung wird überprüft" sx={{ p: 0, pb: 1 }} />
      <CardContent sx={{ p: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "0px !important", mb: "8px !important" }}>
          Diese Meldung wird noch überprüft, sobald der Landkreis sie freigegeben hat sind die Informationen
          ersichtlich.
        </Typography>
      </CardContent>
    </>
  );
}
