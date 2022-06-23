import { useState } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import jwt_decode from "jwt-decode";

import loginBackground from "../assets/images/loginBackground.png";
import logoLandkreisFd from "../assets/images/logos/logoLandkreisFd.svg";
import starkregenFuldaLogo from "../assets/images/logos/starkregen-fulda-vert.svg";
import colors from "../theme/colors";
import { useStateContext } from "../providers/state-provider";
import { LoadingButton } from "../elements/loading-button";
import { signin } from "../clients/auth-client";
import useDesktop from "../providers/use-desktop";
import { getDesignTokens } from "../theme/theme";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const matchesDesktop = useDesktop();
  const darkTheme = createTheme(getDesignTokens("dark"));

  let history = useHistory();
  const { stateContext, setStateContext } = useStateContext();

  const handleLoginSubmit = () => {
    return signin({
      username: username,
      password: password,
    });
  };

  const handleLoginSuccess = (res) => {
    sessionStorage.setItem("authToken", res.data.accessToken);
    setStateContext({
      ...stateContext,
      authToken: res.data.accessToken,
      adminId: jwt_decode(res.data.accessToken).id,
    });
    console.log("Logged in as admin");
    history.replace("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pr: 0,
        pl: 0,
      }}
    >
      <Container
        component="main"
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "primary.main" : "background.paper",
          height: "100%",
          width: "609px",
          flexDirection: "column",
          display: "flex",
          p: 0,
          "&.MuiContainer-maxWidthLg": {
            p: 0,
          },
          overflow: "auto",
        }}
      >
        <MuiThemeProvider theme={darkTheme}>
          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              ml: matchesDesktop ? 15 : 10,
              mr: matchesDesktop ? 15 : 10,
              flex: 3,
            }}
          >
            <img
              src={starkregenFuldaLogo}
              style={{
                width: "164px",
              }}
              sx={{ color: "white" }}
              alt="Starkregen-Fulda Logo"
            />
            {!matchesDesktop ? null : (
              <Typography
                component="h1"
                variant="body1"
                sx={{
                  backgroundColor: theme.palette.mode === "light" ? "primary.main" : "background.paper",
                  color: "white",
                }}
              >
                Wilkommen zurück! Schön, dass du da bist!
              </Typography>
            )}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="username"
                label="Nutzername"
                name="username"
                autoComplete="current-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="standard"
                color="text"
              />
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                color="text"
              />
              <LoadingButton
                type="submit"
                size="large"
                fullWidth
                style={{
                  mt: 10,
                  mb: 2,
                  backgroundColor: "white",
                  color: theme.palette.mode === "light" ? "primary.main" : "background.paper",
                }}
                queryFun={handleLoginSubmit}
                queryCompleteFun={handleLoginSuccess}
                queryText="Anmelden"
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                backgroundColor: "white",
                minWidth: "100%",
                display: "flex",
                height: matchesDesktop ? "187px" : "90px",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
              }}
            >
              <a href="https://www.landkreis-fulda.de/start">
                <img
                  src={logoLandkreisFd}
                  style={{
                    width: matchesDesktop ? "316px" : "150px",
                  }}
                  alt="Logo Landkreis Fulda"
                />
              </a>
            </Box>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 3, mt: 2 }}>
              <Grid item xs={12} md={3} margin={0}>
                <Link
                  to="/impressum"
                  style={{
                    color: colors.white,
                    // textDecoration: "none",
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
                    color: colors.white,
                    // textDecoration: "none",
                    fontSize: 12,
                  }}
                >
                  <Box display="flex" justifyContent={"center"}>
                    Datenschutzerklärung
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </MuiThemeProvider>
      </Container>
    </Box>
  );
}
