import { Source, Layer } from "react-map-gl";

import municipalBoundariesGeoJson from "../data/Gemeindegrenzen_LatLong.geojson";
import colors from "../theme/colors";

const layerStyle = {
  id: "municipal-boundaries-lines",
  type: "line",
  paint: {
    "line-color": "#98a4b5",
    "line-width": 1,
  },
};

const layerStyleSatellite = {
  id: "municipal-boundaries-lines",
  type: "line",
  paint: {
    "line-color": colors.lightGrey,
    "line-width": 1.5,
  },
};

export function MunicipalBoundaries({ satellite }) {
  return (
    <Source id="municipal-boundaries" type="geojson" data={municipalBoundariesGeoJson}>
      <Layer {...(satellite ? layerStyleSatellite : layerStyle)} />
    </Source>
  );
}
