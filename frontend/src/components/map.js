import { useState, useRef, useEffect } from "react";

import MapGL from "react-map-gl";

import { useHistory } from "react-router-dom";

import map from "../config/map";
import { useColorModeContext } from "../providers/theme-provider";
import { MunicipalBoundaries } from "./municipal-boundaries";

export function Map({ children, editLocation, setCenter, satellite, triggerCenterMap }) {
  const { colorMode } = useColorModeContext();
  const mapRef = useRef();
  const history = useHistory();

  const [viewState, setViewState] = useState({
    latitude: map.center.lat,
    longitude: map.center.lng,
    zoom: map.zoom,
  });

  /** center map on pin, when admin wants to edit report */
  useEffect(() => {
    if (editLocation.lat && editLocation.lng) {
      setViewState({
        longitude: editLocation.lng,
        latitude: editLocation.lat,
        zoom: 14.95,
      });
      setCenter({ lng: editLocation.lng, lat: editLocation.lat });
    }
    // eslint-disable-next-line
  }, [triggerCenterMap]);

  const handleMapClick = (e) => {
    if (e.originalEvent?.target?.className === "mapboxgl-canvas") {
      // setStateContext({
      //   ...stateContext,
      //   selectedReport: null,
      // });
      history.push({
        search: ``,
      });
    }
  };

  const handleMoveEnd = () => {
    if (mapRef.current) {
      setCenter(mapRef.current.getCenter());
    }
  };

  // // flies to marker location on click
  // const flyToTarget = stateContext.flyToTarget;
  // if (flyToTarget) {
  //   if (mapRef.current) {
  //     mapRef.current.easeTo({
  //       center: flyToTarget.center,
  //       zoom: flyToTarget.zoom,
  //     });

  //     mapRef.current.on("moveend", () => {
  //       setStateContext({
  //         ...stateContext,
  //         flyToTarget: null,
  //       });
  //     });
  //   }
  // }

  return (
    <MapGL
      {...viewState}
      // reuseMaps={true}
      maxBounds={map.outerBounds}
      minZoom={map.zoom}
      ref={mapRef}
      dragRotate={false}
      width="100%"
      height="100%"
      mapStyle={
        satellite
          ? "mapbox://styles/mapbox/satellite-v9"
          : colorMode === "dark"
          ? "mapbox://styles/mapbox/dark-v10"
          : "mapbox://styles/mapbox/streets-v11"
      }
      onMove={(e) => setViewState(e.viewState)}
      onMoveEnd={handleMoveEnd}
      onClick={handleMapClick}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <MunicipalBoundaries satellite={satellite} />
      {children}
    </MapGL>
  );
}
