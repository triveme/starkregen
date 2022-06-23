import { useState } from "react";
import { useEffect } from "react";

import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

import { CATEGORIES } from "../constants";
import { FilterChip } from "../elements/filter-chip";
import { categories as categoriesConfig } from "../config/reporter";
import { Icon } from "./icon";
import { useStateContext } from "../providers/state-provider";
import { useQuery } from "../providers/query-params-provider";

export function BottomRow({ handleNext }) {
  const [filterOpen, setFilterOpen] = useState(false);
  let query = useQuery();
  const [reportCardOpen, setReportCardOpen] = useState(query.get("report") ? true : false);

  const { stateContext } = useStateContext();
  const wideEnough = useMediaQuery("(min-width:1450px)");
  const wideEnoughWithCard = useMediaQuery("(min-width:1700px)");

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  useEffect(() => {
    if (query.get("report")) {
      // clear query if id doesn't exist
      setReportCardOpen(true);
    } else {
      setReportCardOpen(false);
    }
    // eslint-disable-next-line
  }, [query.get("report")]);

  return (
    /** Filter Chips -------------------------------------------------------------------------------- */
    <Stack direction="column" spacing={1} alignItems="center">
      <Stack direction="column" spacing={1} alignItems="flex-start">
        {(!wideEnough || (reportCardOpen && !wideEnoughWithCard)) &&
        filterOpen &&
        stateContext.selectedCategories.includes(categoriesConfig.all)
          ? CATEGORIES.map((cat) => (
              <Box key={cat.name} onClick={closeFilter}>
                <FilterChip category={cat.name} categoryIcon={cat.icon} categoryDescription={cat.description} />
              </Box>
            ))
          : null}
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ pt: 1 }}>
        {(wideEnough && !reportCardOpen) || (wideEnoughWithCard && reportCardOpen) ? (
          <>
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.name}
                category={cat.name}
                categoryIcon={cat.icon}
                categoryDescription={cat.description}
              />
            ))}
          </>
        ) : (
          <>
            {stateContext.selectedCategories.includes(categoriesConfig.all) ? (
              <Grow in={true}>
                <Fab
                  color="secondary"
                  aria-label="Meldungen filtern"
                  sx={{ pointerEvents: "all", mr: "12px" }}
                  onClick={toggleFilter}
                >
                  <Icon icon="filter" props={{ fontSize: "medium" }} />
                </Fab>
              </Grow>
            ) : (
              <FilterChip
                category={stateContext.selectedCategories[0]}
                // TODO: Get this from a config once the categories are defined
                categoryIcon="storm"
              />
            )}
          </>
        )}
        {/* Add Button ---------------------------------------------------------------------- */}
        <Grow in={true}>
          <Fab
            color="primary"
            aria-label="Meldung hinzufügen"
            sx={{
              pointerEvents: "all",
              ml: "12px !important",
            }}
            onClick={handleNext}
          >
            <Icon icon="add" props={{ fontSize: "medium" }} />
          </Fab>
        </Grow>
      </Stack>
    </Stack>
  );
}
