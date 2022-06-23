import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

import colors from "../../theme/colors";
import { WidgetCard } from "../../elements/widget-card";
import useDesktop from "../../providers/use-desktop";

export function InfoWidget(props) {
  const matchesDesktop = useDesktop();
  const theme = useTheme();
  const { title, icon, children } = props;

  return (
    <WidgetCard>
      <Box>
        <Typography variant="h2" noWrap marginBottom={2}>
          <Box display="flex" alignItems="center">
            {icon}
            {title}
          </Box>
        </Typography>
      </Box>
      <Paper
        style={{
          height: "100%",
          padding: 20,
          paddingRight: matchesDesktop ? 40 : 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 5,
          backgroundColor: theme.palette.mode === "light" ? colors.white : colors.backgroundDark,
        }}
        elevation={0}
      >
        {children}
      </Paper>
    </WidgetCard>
  );
}
