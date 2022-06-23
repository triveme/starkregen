import { Grid, Typography } from "@mui/material";

import useDesktop from "../../providers/use-desktop";
import useMediumWidth from "../../providers/use-medium-width";
import { FlowChart } from "../../components/info-components/flow-chart";

export function InfoContent() {
  const matchesDesktop = useDesktop();
  const isMediumWidth = useMediumWidth();

  return (
    <div>
      <Grid container spacing={matchesDesktop ? 7 : 3}>
        <Grid item md={12} lg={12} xl={12}>
          <Typography marginBottom={0} variant="h3">
            Was ist das Ziel von der Seite Starkregen-Fulda.de?
          </Typography>
          <p>
            Im Rahmen des Landkreis-Projektes „eRisikomanagement - Starkregenfrühalarmsystem“, bei dem ein neues
            Messnetz von Umweltsensoren (Pegeln am Gewässer, Kanalmesser, Niederschlagsmessstationen) in den Jahren 2022
            und 2023 aufgebaut und die Echtzeitdaten für ein Frühalarmsystem verwendet werden sollen, wird mithilfe von
            Starkregen-Fulda.de eine vorgeschaltete Beteiligungsmöglichkeit für die Bürgerinnen und Bürger des
            Landkreises Fulda angeboten. Hier haben Sie die Möglichkeit Ihre Erfahrungen mit vergangenen
            Starkregenereignissen und dessen Folgen einzutragen und zu teilen. Füllen Sie dazu nach Auswahl der
            Örtlichkeit den sich automatisch öffnenden Steckbrief aus und bestätigen Sie Ihre Eingabe. Nach einer
            Freigabe der Daten durch die Untere Wasserbehörde des Landkreises Fulda u. a. in Rücksprache mit den Städten
            und Gemeinden, sind die nichtpersonenbezogenen Daten für alle Nutzer und Nutzerinnen einsehbar. Das Gebiet,
            in dem Meldungen abgegeben werden können, umfasst den gesamten Landkreis Fulda sowie benachbarte
            Gewässereinzugsgebiete, die über die Kreisgrenzen hinausgehen.
          </p>

          <p>Viele Augen sehen mehr!</p>

          <p>
            Mit Ihrer Hilfe können wir unterschiedlichste Erfahrungen mit Starkregen und den daraus resultierenden
            Folgen unbürokratisch und zügig aufnehmen. Dies hilft uns, eine große Sammlung an Starkregenereignissen zu
            erhalten und gezielt Standorte für die Umweltsensoren zu bestimmen, um zukünftig genaue Warnungen und
            Alarmierungen bei Starkregen zu gewährleisten. Sie helfen also mit Ihrer Meldung aktiv an der Umsetzung des
            Landkreisprojektes mit! An dieser Stelle schon einmal unseren herzlichsten Dank!
          </p>

          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Verbindung von Starkregen-Fulda.de zum Starkregenfrühalarmsystem des Landkreises
          </Typography>

          <p>
            Um eine effiziente Verteilung der Umweltsensoren vorzunehmen, wollen wir Sie mit Ihren Erfahrungen
            vergangener Ereignisse in das Projekt „eRisikomanagement - Starkregenfrühalarmsystem“ des Landkreises Fulda
            einbinden. Die von Starkregen-Fulda.de gewonnenen Informationen werden aufgenommen und u. a. bei der finalen
            Positionierung der Sensoren als Unterstützung verwendet. Durch Ihre Meldung helfen Sie also mit, ein
            flächendeckendes Netz aus Sensoren zu erstellen, welches als Grundlage für das Starkregenfrühalarmsystem
            dient.
          </p>
          <br />
          <FlowChart
            texts={[
              "Ereignis eingeben",
              "Ihre Meldung wird durch die Wasserbehörde geprüft",
              "Die freigegebene Meldung wird öffentlich einsehbar",
              "Einflussnahme auf die Position der Umweltsensoren",
            ]}
            vertical={!isMediumWidth}
          />
          <br />

          <p>Teilen Sie Ihre Erfahrungen!</p>
        </Grid>
      </Grid>
    </div>
  );
}
