import { useState } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import { useStateContext } from "../../providers/state-provider";
import { useReports } from "../../clients/report-client";
import { reporter } from "../../config/reporter";
import useDesktop from "../../providers/use-desktop";
import { SelectImageArea } from "./select-image-area";

export function DataStep({ removedImages, setRemovedImages }) {
  const { stateContext, setStateContext } = useStateContext();
  const { categoryValue, dateValue, descriptionValue, mailValue, countyValue } = stateContext.reporter;

  const { reports } = useReports(stateContext.authToken, stateContext.queryTrigger);

  const report = reports?.find((r) => r.id === stateContext.reporter.idIfEdit);

  const [categorySelectOpen, setCategorySelectOpen] = useState(false);

  const [countySelectOpen, setCountySelectOpen] = useState(false);

  const matchesDesktop = useDesktop();

  const step = reporter.steps[1];

  const handleDateChange = (newDate) => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        dateValue: newDate,
      },
    });
  };

  const handleDescriptionValueChange = (event) => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        descriptionValue: event.target.value,
      },
    });
  };

  const handleCategoryChange = (event) => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        categoryValue: event.target.value,
      },
    });
  };

  const handleCountyChange = (event) => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        countyValue: event.target.value,
      },
    });
  };

  const handleMailValueChange = (event) => {
    setStateContext({
      ...stateContext,
      reporter: {
        ...stateContext.reporter,
        mailValue: event.target.value,
      },
    });
  };

  const handleCategorySelectOpen = () => {
    setCategorySelectOpen(true);
  };

  const handleCountySelectOpen = () => {
    setCountySelectOpen(true);
  };

  const handleCategorySelectClose = (e) => {
    e.stopPropagation();
    setCategorySelectOpen(false);
  };

  const handleCountySelectClose = (e) => {
    e.stopPropagation();
    setCountySelectOpen(false);
  };

  return (
    <>
      <FormControl fullWidth sx={{ mt: 1, mb: 1 }} onClick={handleCategorySelectOpen} required>
        <InputLabel id="report-category-input-label">{step.category}</InputLabel>
        <Select
          labelId="report-category-input-label"
          id="report-category-input"
          value={categoryValue}
          label={step.category}
          onChange={handleCategoryChange}
          size="small"
          open={categorySelectOpen}
          onClose={handleCategorySelectClose}
        >
          <MenuItem key={"category-" + step.categories.default} value={step.categories.default}>
            {step.categories.default}
          </MenuItem>
          <Divider />
          {step.categories.others.map((category) => (
            <MenuItem key={"category-" + category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 1, mb: 1 }} onClick={handleCountySelectOpen} required>
        <InputLabel id="report-county-input-label">{step.county}</InputLabel>
        <Select
          labelId="report-county-input-label"
          id="report-county-input"
          value={countyValue}
          label={step.county}
          onChange={handleCountyChange}
          size="small"
          open={countySelectOpen}
          onClose={handleCountySelectClose}
        >
          <MenuItem key={"county-" + step.counties.default} value={step.counties.default}>
            {step.counties.default}
          </MenuItem>
          <Divider />
          {step.counties.others.map((county) => (
            <MenuItem key={"county-" + county} value={county}>
              {county}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="report-description-textfield"
        label={step.description}
        required
        fullWidth
        size="small"
        multiline
        placeholder={step.descriptionPlaceholder}
        maxRows={4}
        minRows={2}
        value={descriptionValue}
        onChange={handleDescriptionValueChange}
        inputProps={{ maxLength: step.descriptionMaxChars }}
        sx={{ mt: 1, mb: 1 }}
      />
      {matchesDesktop ? (
        <DesktopDatePicker
          label={reporter.steps[1].date}
          inputFormat="DD/MM/YYYY"
          value={dateValue}
          onChange={handleDateChange}
          disableFuture
          renderInput={(params) => <TextField size="small" fullWidth sx={{ mt: 1, mb: 1 }} {...params} />}
        />
      ) : (
        <MobileDatePicker
          disableFuture
          label={reporter.steps[1].date}
          inputFormat="DD/MM/YYYY"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField size="small" fullWidth sx={{ mt: 1, mb: 1 }} {...params} />}
        />
      )}
      <SelectImageArea report={report} removedImages={removedImages} setRemovedImages={setRemovedImages} />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {stateContext.reporter.idIfEdit ? step.feedbackEdit : step.feedback}
      </Typography>
      <TextField
        id="report-mail-textfield"
        type="email"
        label={step.mail}
        fullWidth
        size="small"
        value={mailValue}
        onChange={handleMailValueChange}
        sx={{ mt: 1, mb: 2 }}
      />
    </>
  );
}
