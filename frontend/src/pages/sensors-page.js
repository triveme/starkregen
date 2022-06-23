import { Box, Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";

import SensorMap from "../assets/images/sensors/Sensorstandorte_Eichenzell_20220610_hoch.png";
import SensorMapHorizontal from "../assets/images/sensors/Sensorstandorte_Eichenzell_20220610_quer.png";
import { InfoWidget } from "../components/info-components/info-widget";
import { ScrollContainer } from "../elements/scroll-container";
import useWindowDimensions from "../providers/window-dimensions-provider";

export function SensorsPage() {
  const { width, height } = useWindowDimensions();
  const difference = width - height;

  return (
    <ScrollContainer>
      <InfoWidget title="Messnetz" icon={<SensorsIcon style={{ marginRight: 10 }} />}>
        <Typography marginBottom={0} variant="h3">
          Messnetzaufbau - Pilotkommune Eichenzell
        </Typography>
        <p>
          Sie sehen in dieser Rubrik den Fortschritt des Messnetzaufbaus für die Pilotkommune Eichenzell. Anhand einer
          Vielzahl von lokalen Geoinformationen und daraus resultierenden Karten, wurden erste Pegelstandorte
          (hellblauer Punkt) und Standorte für Niederschlagsmessstationen (roter Punkt) gemeinsam mit der Gemeinde
          Eichenzell sowie Akteuren aus der Siedlungswasserwirt-schaft, der Informationstechnik und Rettungskräften
          eruiert. Sie sehen in dieser Karte auch die Pegelstandorte des Hessischen Landesamtes (blauer Punkt), die
          sowohl innerhalb wie auch angrenzend an die Gemeinde Eichenzell bereits existieren und deren Daten im Rahmen
          des Projektes „eRisikomanagement – Starkregenfrühalarmsystem“ integriert werden sollen. Bei der
          Standortauswahl der Gewässerpegel sehen Sie, dass speziell die kleineren Gewässer in den Fokus gerückt sind
          und dass hier Hot-Spot-Bereiche ausgewählt wurden, anhand derer sich frühzeitig Veränderungen in der
          Wasserspiegellage zeigen, die zu einer Flutwelle in den unterhalb gelegenen Ortslagen führen können.
        </p>
        <br />

        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            overFlow: "auto",
          }}
        >
          <img
            src={difference > 250 ? SensorMapHorizontal : SensorMap}
            width={"100%"}
            alt="Sensor-Map"
            sx={{ overFlow: "auto" }}
          />
        </Box>
      </InfoWidget>
    </ScrollContainer>
  );
}
