import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { Redirect } from "react-router-dom";

import { useStateContext } from "../providers/state-provider";

import { useAdmins } from "../clients/admin-client";

import {
  AddDialog,
  DeleteDialog,
  EditDialog,
} from "../components/administration/dialogs";

export function AdminPage() {
  const { stateContext } = useStateContext();

  const { admins } = useAdmins(
    stateContext.authToken,
    stateContext.queryTrigger
  );

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      {stateContext.authToken ? (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom component="div">
              Account Verwaltung
            </Typography>
            <List>
              {admins !== undefined ? (
                admins.map((admin) => (
                  <Box key={admin.id + "-box"}>
                    <Divider />
                    <ListItem>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          sm={12}
                          md={6}
                          flexGrow={1}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography
                            variant="body1"
                            fontWeight={admin.id === 1 ? "bold" : "normal"}
                          >
                            {admin.username}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <Box
                            sx={{
                              flexWrap: "wrap",
                              mt: "-8px !important",
                              mr: "-8px !important",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <EditDialog admin={admin} />
                            <DeleteDialog admin={admin} />
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Box>
                ))
              ) : (
                <Box key="spooky-box">
                  <Divider />
                  <Skeleton height={46.75} sx={{ mx: 2 }} />
                </Box>
              )}
              <Divider />
            </List>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <AddDialog />
          </CardActions>
        </Card>
      ) : (
        <Redirect to="/" />
      )}
    </Box>
  );
}
