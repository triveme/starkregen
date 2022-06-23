import { useEffect, useState } from "react";

import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { Map } from "../components/map";
import { Reporter } from "../components/reporter";
import map from "../config/map";
import { useAdmins } from "../clients/admin-client";
import { useReports } from "../clients/report-client";
import { useStateContext } from "../providers/state-provider";
import { categories } from "../config/reporter";
import { ReportCard } from "../components/report-card";
import { MarkerPin } from "../elements/marker-pin";
import useDesktop from "../providers/use-desktop";
import { MapTerrainToggleButton } from "../elements/map-terrain-toggle-button";
import { useQuery } from "../providers/query-params-provider";

const cardStylingDesktop = {
  width: 250,
  height: "100%",
  minWidth: 408,
  borderRadius: 0,
  right: 0,
  alignSelf: "flex-end",
  zIndex: 1100,
  pointerEvents: "auto",
};

const cardStylingMobile = {
  minWidth: "100%",
  height: "100%",
  borderRadius: 0,
  position: "absolute",
  zIndex: 1100,
  pointerEvents: "auto",
};

export function ReportPage() {
  const { stateContext, setStateContext } = useStateContext();
  const { activeStep, userMarkerPosition } = stateContext.reporter;
  const [editLocation, setEditLocation] = useState({ lat: "", lng: "" });
  const [center, setCenter] = useState(map.center);
  const [triggerCenterMap, setTriggerCenterMap] = useState(true);

  const [satellite, setSatellite] = useState(false);

  const [firstInit, setFirtstInit] = useState(false);

  const history = useHistory();
  let query = useQuery();

  const matchesDesktop = useDesktop();

  const handleTriggerCenterMap = () => {
    setTriggerCenterMap((prevState) => !prevState);
  };

  function sortByLat(reportsToSort) {
    return reportsToSort.sort((a, b) => {
      if (a.location.coordinates.lat > b.location.coordinates.lat) {
        return -1;
      }
      if (a.location.coordinates.lat < b.location.coordinates.lat) {
        return 1;
      }
      return 0;
    });
  }

  const { admins } = useAdmins(stateContext.authToken, stateContext.queryTrigger);

  let { reports } = useReports(stateContext.authToken, stateContext.queryTrigger);

  const handleMapChange = () => {
    setSatellite(!satellite);
  };

  useEffect(() => {
    if (reports) {
      if (query.get("report")) {
        // clear query if id doesn't exist
        if (!getReportById(parseInt(query.get("report")))) {
          history.push({
            search: ``,
          });
          // set selected Report
        } else {
          setStateContext({
            ...stateContext,
            selectedReport: parseInt(query.get("report")),
          });
        }
      } else {
        setStateContext({
          ...stateContext,
          selectedReport: null,
        });
      }
    }
    // eslint-disable-next-line
  }, [query.get("report"), firstInit]);

  useEffect(() => {
    if (typeof reports !== "undefined") {
      setFirtstInit(true);
    }
  }, [reports]);

  // this is needed for the reports to overlap correctly
  if (reports) {
    reports = sortByLat(reports);
  }

  const filteredReports = reports
    ? stateContext.selectedCategories.includes(categories.all)
      ? reports
      : reports.filter((report) => report.category && stateContext.selectedCategories.includes(report.category))
    : [];

  const handleMarkerClick = (report) => {
    history.push({
      pathname: "melder",
      search: `?report=${report.id}`,
    });
    // setStateContext({
    //   ...stateContext,
    //   selectedReport: report.id,
    //   // flyToTarget: {
    //   //   center: report.location.coordinates,
    //   //   zoom: 11,
    //   // },
    // });
  };

  const handleMarkerPopupClose = () => {
    history.push({
      search: ``,
    });
    setStateContext({
      ...stateContext,
      selectedReport: null,
    });
  };

  function getReportById(id) {
    return reports?.filter((report) => report.id === id)[0];
  }

  let userPositionMarkerPin = null;

  if (activeStep === 0) {
    userPositionMarkerPin = (
      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
      >
        <MarkerPin report={{ status: "new" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        {userPositionMarkerPin}
        <Map
          satellite={satellite}
          editLocation={editLocation}
          setCenter={setCenter}
          triggerCenterMap={triggerCenterMap}
        >
          {filteredReports !== undefined
            ? filteredReports.map((report) =>
                // This condition hides the original marker while the report is being edited
                !stateContext.reporter.idIfEdit || stateContext.reporter.idIfEdit !== report.id ? (
                  <Marker
                    key={report.id}
                    longitude={report.location.coordinates.lng}
                    latitude={report.location.coordinates.lat}
                    anchor="bottom"
                  >
                    <MarkerPin report={report} onClick={() => handleMarkerClick(report)} />
                  </Marker>
                ) : null,
              )
            : null}{" "}
          {userMarkerPosition !== undefined && activeStep !== 0 ? (
            <Marker longitude={userMarkerPosition.lng} latitude={userMarkerPosition.lat} anchor="bottom">
              <MarkerPin report={{ status: "new" }} />
            </Marker>
          ) : null}
          <MapTerrainToggleButton sx={{ position: "absolute" }} onMapChange={handleMapChange} satellite={satellite} />
        </Map>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              maxWidth: activeStep === 0 ? "100%" : "95vw",
              cursor: "default",
              pointerEvents: "none",
              mb: 4,
            }}
          >
            <Reporter
              sx={{
                justifyContent: "end",
              }}
              center={center}
            />
          </Box>
        </Box>
        {getReportById(stateContext.selectedReport) && stateContext.reporter.activeStep === -1 ? (
          <Card sx={matchesDesktop ? cardStylingDesktop : cardStylingMobile}>
            <ReportCard
              key={stateContext.selectedReport}
              report={getReportById(stateContext.selectedReport)}
              admins={admins}
              handleMarkerPopupClose={handleMarkerPopupClose}
              handleChangeLocation={setEditLocation}
              handleTriggerCenterMap={handleTriggerCenterMap}
            />
          </Card>
        ) : null}
      </Box>
    </Box>
  );
}
