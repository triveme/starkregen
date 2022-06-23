import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Stack from "@mui/material/Stack";
// import Alert from "@mui/material/Alert";

// import { snackActions } from "../utils/snack-bar-utils";

import { useStateContext } from "../providers/state-provider";
import { useColorModeContext } from "../providers/theme-provider";

import colors from "../theme/colors";
import { PendingCard } from "./report-card-components/pending-card";
import { FullInfoCard } from "./report-card-components/full-info-card";
import { AdminCard } from "./report-card-components/admin-card";

export function ReportCard({ report, admins, handleMarkerPopupClose, handleChangeLocation, handleTriggerCenterMap }) {
  const { stateContext } = useStateContext();
  const { colorMode } = useColorModeContext();

  return (
    <Box
      sx={{
        p: 2,
        overflowY: "scroll",
        height: "100%",
        backgroundColor: colorMode === "dark" ? colors.drawerDark : colors.backgroundLight,
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{
          height: "100%",
          borderRadius: "10px",
          p: "20px",
          backgroundColor: colorMode === "dark" ? colors.paperDark : colors.drawerLight,
        }}
      >
        {stateContext.authToken ? (
          <AdminCard
            admins={admins}
            handleChangeLocation={handleChangeLocation}
            handleTriggerCenterMap={handleTriggerCenterMap}
            report={report}
          />
        ) : report.status === "pending" ? (
          <PendingCard />
        ) : (
          <FullInfoCard report={report} />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            alignItems: "flex-end",
          }}
        >
          <Button onClick={handleMarkerPopupClose} color="secondary">
            <Typography variant="button" component="div" color="secondary">
              Schliessen
            </Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
