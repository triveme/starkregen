import { Suspense, lazy } from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import PolicyIcon from "@mui/icons-material/Policy";
import InfoIcon from "@mui/icons-material/Info";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Cookies from "universal-cookie";

import { StateProvider } from "./providers/state-provider";
import { QueryProvider } from "./providers/query-provider";
import useDesktop from "./providers/use-desktop";
import { SnackbarUtilsConfigurator } from "./utils/snack-bar-utils";

import { MenuBar } from "./components/menu-bar";
import { ImpressumContent } from "./pages/content/impressum-content";
import { PrivacyPolicyContent } from "./pages/content/privacy-policy-content";
import { InfoWidget } from "./components/info-components/info-widget";
import { ScrollContainer } from "./elements/scroll-container";
import { SensorsPage } from "./pages/sensors-page";
import { CookieBanner } from "./components/dialogs/cookie-banner";
import { InfoWelcomeDialog } from "./components/dialogs/info-welcome-dialog";
import "./App.css";
import drawer from "./config/drawer";

const LoginPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/login-page").then((module) => ({
    default: module.LoginPage,
  })),
);
const ReportPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/report-page").then((module) => ({
    default: module.ReportPage,
  })),
);
const InfoPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/info-page").then((module) => ({
    default: module.InfoPage,
  })),
);
const AdminPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/admin-page").then((module) => ({
    default: module.AdminPage,
  })),
);

const ListPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/list-page").then((module) => ({
    default: module.ListPage,
  })),
);

function ContentPage(url) {
  switch (url.url) {
    case "/melder":
      return <ReportPage />;
    case "/info":
      return <InfoPage />;
    case "/admin":
      return <AdminPage />;
    case "/meldungen":
      return <ListPage />;
    case "/messnetz":
      return <SensorsPage />;
    default:
      return <Redirect to={drawer.default} />;
  }
}

function App() {
  const matchesDesktop = useDesktop();
  const [open, setOpen] = useState(true);
  const [openWelcomeText, setOpenWelcomeText] = useState(false);
  const cookies = new Cookies();

  const handleClose = () => {
    setOpen(false);
    cookies.set("acceptCookies", "yes", { path: "/", secure: true, sameSite: "lax" });
    handleOpenWelcomeText();
  };

  const handleOpenWelcomeText = () => {
    setOpenWelcomeText(true);
  };

  const handleCloseWelcomeText = () => {
    setOpenWelcomeText(false);
  };

  return (
    <Suspense fallback="lädt...">
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <SnackbarUtilsConfigurator />
        <StateProvider>
          <LocalizationProvider dateAdapter={DateAdapter} locale="de">
            <QueryProvider>
              <Box sx={{ display: "flex", height: "100%" }}>
                <CssBaseline />
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/login">
                      <LoginPage />
                    </Route>
                    <Route path="*">
                      <MenuBar />
                      <Box
                        component="main"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        {cookies.get("acceptCookies") ? null : <CookieBanner open={open} handleClose={handleClose} />}
                        <InfoWelcomeDialog
                          openWelcomeText={openWelcomeText}
                          handleCloseWelcomeText={handleCloseWelcomeText}
                        />
                        {matchesDesktop ? null : <Toolbar />}
                        <Suspense fallback={null}>
                          <Switch>
                            {drawer.content.map((page) => (
                              <Route key={"route-" + page.url} exact path={page.url}>
                                <Box sx={{ flexGrow: 1 }}>
                                  <ContentPage url={page.url} />
                                </Box>
                              </Route>
                            ))}
                            <Route path="/impressum">
                              <ScrollContainer>
                                <Box sx={{ flexGrow: 1 }}>
                                  <InfoWidget title="Impressum" icon={<InfoIcon style={{ marginRight: 10 }} />}>
                                    <ImpressumContent />
                                  </InfoWidget>
                                </Box>
                              </ScrollContainer>
                            </Route>

                            <Route path="/datenschutzerklaerung">
                              <ScrollContainer>
                                <Box sx={{ flexGrow: 1 }}>
                                  <InfoWidget
                                    title="Datenschutzinformation gemäß Art. 13 DS-GVO"
                                    icon={<PolicyIcon style={{ marginRight: 10 }} />}
                                  >
                                    <PrivacyPolicyContent />
                                  </InfoWidget>
                                </Box>
                              </ScrollContainer>
                            </Route>

                            <Route path="*">
                              <Redirect to={drawer.default} />
                            </Route>
                          </Switch>
                        </Suspense>
                      </Box>
                    </Route>
                  </Switch>
                </BrowserRouter>
              </Box>
            </QueryProvider>
          </LocalizationProvider>
        </StateProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
