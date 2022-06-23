import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import useDesktop from "../../providers/use-desktop";
import sonstigesLight from "../../assets/images/categories/Cat_sonstiges_light.svg";
import sonstigesDark from "../../assets/images/categories/Cat_sonstiges_dark.svg";
import { ImageCard } from "../../components/info-components/image-card";

import { CATEGORIES } from "../../constants";

export function FaqContent() {
  const matchesDesktop = useDesktop();
  const theme = useTheme();

  const categories = [];

  CATEGORIES.forEach((category) => {
    categories.push({
      title: category.name,
      description: category.description,
      img:
        category.name === "Sonstiges"
          ? theme.palette.mode === "light"
            ? sonstigesLight
            : sonstigesDark
          : category.img,
    });
  });

  return (
    <div>
      <Grid container spacing={matchesDesktop ? 7 : 3}>
        <Grid item md={12} lg={12} xl={12}>
          <Typography marginBottom={0} variant="h3">
            Für welche Orte kann ich ein Ereignis melden?
          </Typography>
          <p>
            Wir bieten diesen Onlineservice für die angegebenen Kategorien im gesamten Gebiet des Landkreises Fulda an.
            Aus Datenschutzgründen bitten wir um Verständnis, dass wir keine Angaben zu Eigentumsverhältnissen von z.B.
            Grundstücken mitteilen können.
          </p>

          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Welche Erfahrungen von Ereignissen kann ich eingeben?
          </Typography>

          <p>Wir bieten aktuell 6 Kategorien an, welche die Folgen von Starkregenereignissen umfänglich abbilden:</p>
          <br />

          <div>
            <Grid container spacing={7}>
              {categories.map((category, index) => {
                return (
                  <Grid
                    item
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={`categories${index}`}
                  >
                    <ImageCard img={category.img} title={category.title} description={category.description} />
                  </Grid>
                );
              })}
            </Grid>
          </div>

          <br />
          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Welche Anliegen und Ereignisse kann ich in diesem Onlineangebot nicht eingeben?
          </Typography>

          <p>
            Zu allgemeinen Hinweisen, Meinungen, Beschwerden und Vorschläge können wir in diesem Onlineangebot leider
            nicht eingehen. Bitte melden Sie <strong>KEINE</strong> Notfälle und Hinweise auf Gefährdungen. In
            dringenden Notfällen bzw. einer akuten Gefährdung wenden Sie sich bitte sofort telefonisch direkt an die
            Polizei (110) bzw. Feuerwehr (112).
          </p>
          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Wie und wann wird meine Eingabe sichtbar?
          </Typography>

          <p>
            Ihr Eintrag wird durch die Untere Wasserbehörde des Landkreises Fulda bearbeitet und freigegeben, sodass
            ihre Meldung nach dieser Freigabe öffentlich einsehbar ist. Die Bearbeitung wird maximal 14 Tage in Anspruch
            nehmen.
          </p>
          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Was bedeutet der Bearbeitungsstand?
          </Typography>

          <p>
            <strong>Ausstehend:</strong> Ihre Meldung wurde noch nicht in die Bearbeitung aufgenommen. <br />
            <strong>Geprüft/ Sichtbar</strong> Ihre Meldung wurde von der Behörde geprüft und bearbeitet. Sie und andere
            Nutzer und Nutzerinnen können die Meldung nun öffentlich einsehen.
          </p>
          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Ist meine E-Mailadresse öffentlich sichtbar?
          </Typography>

          <p>
            Nein, wenn Sie Ihre E-Mailadresse in dem Melde-Steckbrief hinterlegt haben, sind diese Informationen nicht
            öffentlich einsehbar. Bitte beachten Sie, dass jedoch alle Angaben, die Sie im Textfeld getätigt haben, nach
            einer Überprüfung veröffentlicht werden.
          </p>
          <br />
          <br />

          <Typography marginBottom={0} variant="h3">
            Gibt es die Seite Starkregen-Fulda.de als App oder mobile Anwendung?
          </Typography>

          <p>
            Dieses Onlineangebot ist für mobile Endgeräte optimiert und mit dem Internetbrowser direkt nutzbar
            (sogenannte Browser-App).
          </p>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}
