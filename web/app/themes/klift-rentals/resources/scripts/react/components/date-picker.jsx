import { useState } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ReactDatePicker from "react-date-picker";

const DatePicker = ({format = "MM-dd-yyyy"}) => {
  const [value, onChange] = useState(new Date());
  return (
    <ReactDatePicker
    onChange={onChange}
    value={value}
    format={format}
    clearIcon={null}
    calendarIcon={null}
    locale="en-US"
    dayPlaceholder={new Date().getDate()}
    yearPlaceholder={new Date().getFullYear()}
    monthPlaceholder={
      new Date().getMonth() < 10
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
    }
    minDate={new Date(1971, 0, 1)}
    maxDate={new Date(2030, 11, 31)}
  /> 
  );
};

export default DatePicker;
