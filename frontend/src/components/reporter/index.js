import { useEffect, useState } from "react";

// import HCaptcha from "@hcaptcha/react-hcaptcha";

// import { Marker, useMapEvents } from "react-leaflet";
import * as turf from "@turf/turf";
import { useHistory } from "react-router-dom";

import { BottomRow } from "../bottom-row";
import { useStateContext } from "../../providers/state-provider";
import { selectableArea } from "../../data/SelectableArea.js";
import { reporter } from "../../config/reporter";
import { CreateEditReportWrapper } from "./create-edit-report";

export function Reporter({ center }) {
  const { stateContext, setStateContext } = useStateContext();
  const { activeStep } = stateContext.reporter;
  const [validCoordinates, setValidCoordinates] = useState(true);
  const [postedID, setPostedID] = useState(-1);
  const history = useHistory();

  const checkIfCoordinatesAreValid = () => {
    let centerArray;

    if (center.lat && center.lng) {
      centerArray = [center.lng, center.lat];
    }

    if (
      center &&
      centerArray &&
      centerArray.length > 0 &&
      turf.booleanPointInPolygon(turf.point(centerArray), turf.polygon(selectableArea))
    ) {
      setValidCoordinates(true);
    } else {
      setValidCoordinates(false);
    }
  };

  useEffect(() => {
    checkIfCoordinatesAreValid();
    // eslint-disable-next-line
  }, [center]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (validCoordinates) {
        setStateContext({
          ...stateContext,
          reporter: {
            ...stateContext.reporter,
            activeStep: activeStep + 1,
            captchaSolved: false,
            userMarkerPosition: center,
          },
        });
      }
    } else {
      setStateContext({
        ...stateContext,
        reporter: {
          ...stateContext.reporter,
          activeStep: activeStep + 1,
          captchaSolved: false,
        },
      });
    }
  };

  const handleReset = () => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...reporter.default,
      },
    });
  };

  const handlePostFinished = () => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...reporter.default,
      },
    });
    // open new Report after posting
    if (postedID !== -1) {
      history.push({
        pathname: "melder",
        search: `?report=${postedID}`,
      });
    }
    // reset postedID
    setPostedID(-1);
  };

  const handlePostReportSuccess = ({ data }) => {
    setStateContext({
      ...stateContext,
      queryTrigger: stateContext.queryTrigger + 1,
      // selectedReport: data?.id ? data.id : null,
      reporter: {
        ...stateContext.reporter,
        activeStep: activeStep + 1,
        captchaSolved: false,
        userMarkerPosition: undefined,
      },
    });
    if (data && data.id) {
      setPostedID(data.id);
    }
  };

  return (
    <>
      {activeStep < 0 ? (
        /* Standardansicht ---------------------------------------------------------------------------------------- */
        <BottomRow handleNext={handleNext} />
      ) : (
        /** Meldung alegen ---------------------------------------------------------------------------------------- */
        <CreateEditReportWrapper
          handleNext={handleNext}
          handlePostFinished={handlePostFinished}
          handlePostReportSuccess={handlePostReportSuccess}
          handleReset={handleReset}
          activeStep={activeStep}
          reporter={reporter}
          validCoordinates={validCoordinates}
        />
      )}
    </>
  );
}
