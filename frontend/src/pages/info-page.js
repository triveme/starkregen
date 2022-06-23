import { InfoWidget } from "../components/info-components/info-widget";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { InfoContent } from "./content/info-content";
import { FaqContent } from "./content/faq-content";
import colors from "../theme/colors";

import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import { ScrollContainer } from "../elements/scroll-container";
import { useTheme } from "@emotion/react";

export function InfoPage() {
  const theme = useTheme();

  return (
    <ScrollContainer>
      <InfoWidget title="Informationen" icon={<InfoIcon style={{ marginRight: 10 }} />}>
        <InfoContent />
      </InfoWidget>
      <InfoWidget title="FAQ" icon={<HelpIcon style={{ marginRight: 10 }} />}>
        <FaqContent />
      </InfoWidget>

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={12} md={3} margin={0}>
          <Link
            to="/impressum"
            style={{
              color: theme.palette.mode === "light" ? colors.backgroundDark : colors.white,
              fontSize: 12,
            }}
          >
            <Box display="flex" justifyContent={"center"}>
              Impressum
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={3} margin={0}>
          <Link
            to="/datenschutzerklaerung"
            style={{
              color: theme.palette.mode === "light" ? colors.backgroundDark : colors.white,
              fontSize: 12,
            }}
          >
            <Box display="flex" justifyContent={"center"}>
              Datenschutzerklärung
            </Box>
          </Link>
        </Grid>
      </Grid>
    </ScrollContainer>
  );
}
