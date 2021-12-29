import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";

const DateTimeInput = ({ label = "DateTimePicker", disabled = false }) => {
  const [value, setValue] = React.useState(moment().add(1, "hours"));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        disabled={disabled}
        onChange={(newValue) => {
          const minTime = moment().add(1, "hours");
          if (minTime.isAfter(newValue)) {
            return setValue(moment().add(1, "hours"));
          }
          setValue(newValue);
        }}
        disablePast
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
