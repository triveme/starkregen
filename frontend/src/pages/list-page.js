import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import StatusChip from "../elements/status-chip";
import { useStateContext } from "../providers/state-provider";
import { useReports } from "../clients/report-client";
import { useAdmins } from "../clients/admin-client";
import { CustomToolbar } from "../components/custom-toolbar";

const dataGridStyling = {
  "& .MuiDataGrid-renderingZone": {
    maxHeight: "100px !important",
  },
  "& .MuiDataGrid-cell": {
    lineHeight: "unset !important",
    maxHeight: "100px !important",
    whiteSpace: "normal",
    display: "-webkit-box",
  },
  "& .MuiDataGrid-row": {
    maxHeight: "100px !important",
  },
};

const getDisplayedText = (input) => {
  return input ? input : "-";
};

const getRounded = (number) => {
  return Math.round((Number(number) + Number.EPSILON) * 100000) / 100000;
};

const getDateAndTime = (dateString) => {
  const date = new Date(dateString);
  return date && date.getDate()
    ? date.toLocaleDateString("de-DE") +
        ", " +
        date.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
    : null;
};

const getDate = (dateString) => {
  const date = new Date(dateString);
  return date && date.getDate() ? date.toLocaleDateString("de-DE") : null;
};

let rows = [];

const getLastChangerName = (report, admins) => {
  return report.lastModifiedBy && admins
    ? admins.filter((admin) => admin.id === report.lastModifiedBy)[0].username
    : null;
};

export function ListPage() {
  const { stateContext } = useStateContext();
  const { authToken } = stateContext;
  const { admins } = useAdmins(stateContext.authToken, stateContext.queryTrigger);
  let { reports } = useReports(stateContext.authToken, stateContext.queryTrigger);
  const history = useHistory();

  const handleCellClick = (params, event) => {
    if (params.id) {
      history.push({
        pathname: "melder",
        search: `?report=${params.id}`,
      });
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "location", headerName: "Position", flex: 2 },
    { field: "county", headerName: "Gemeinde", flex: 3 },
    { field: "category", headerName: "Kategorie", flex: 3 },
    {
      field: "description",
      headerName: "Beschreibung",
      flex: 6,
    },
    {
      field: "date",
      headerName: "Datum",
      flex: 2,
    },
    {
      field: "img",
      headerName: "Bild",
      flex: 2,
      renderCell: (params) => {
        return params.value && params.value.length > 0 ? (
          <Box sx={{ display: "flex", justifyContent: "left", maxHeight: "90%" }}>
            <img
              style={{ maxHeight: "100px", maxWidth: "100%", opacity: 1, borderRadius: 5, objectFit: "cover" }}
              src={process.env.REACT_APP_BASE_URL + params.value[0]}
              alt="Meldungsbild"
            />
          </Box>
        ) : null;
      },
    },

    {
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params) => {
        return <StatusChip label={params.value} />;
      },
    },
    {
      field: "comment",
      headerName: "Kommentar",
      flex: 2,
    },
  ];

  const adminColumns = [
    {
      field: "email",
      headerName: "Email",
      flex: 3,
    },
    {
      field: "lastModifiedBy",
      headerName: "Bearbeiter",
      flex: 2,
    },
    {
      field: "createdAt",
      headerName: "Erstellt am",
      flex: 2,
    },
    {
      field: "updatedAt",
      headerName: "Bearbeitet am",
      flex: 2,
    },
    {
      field: "adminComment",
      headerName: "Statusmeldung",
      flex: 2,
    },
  ];

  rows =
    reports && reports.length > 0
      ? reports.map((report) => {
          return {
            id: report.id,
            location: getRounded(report.location.coordinates.lat) + ", " + getRounded(report.location.coordinates.lng),
            county: getDisplayedText(report.county),
            category: report.category,
            comment: getDisplayedText(report.comment),
            adminComment: getDisplayedText(report.adminComment),
            description: getDisplayedText(report.description),
            date: getDisplayedText(getDate(report.date)),
            email: getDisplayedText(report.email),
            img: report.imgPath,
            status: report.status,
            lastModifiedBy: getDisplayedText(getLastChangerName(report, admins)),
            createdAt: getDisplayedText(getDateAndTime(report.createdAt)),
            updatedAt: getDisplayedText(getDateAndTime(report.updatedAt)),
          };
        })
      : rows;

  const dataGrid = (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[...columns, ...adminColumns]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={dataGridStyling}
        components={{ Toolbar: CustomToolbar }}
        onCellClick={handleCellClick}
      />
    </div>
  );

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      {authToken ? (
        <>
          <Typography sx={{ paddingBottom: 3 }} variant="h5">
            Meldungen
          </Typography>
          {dataGrid}
        </>
      ) : (
        <Redirect to="/" />
      )}
    </Box>
  );
}
