import { useState } from "react";
import ReactDatePicker from "react-date-picker";

const DatePicker = () => {
  const [value, onChange] = useState(new Date());
  return (
    <ReactDatePicker
      onChange={onChange}
      value={value}
      format="dd-MM-yyyy"
      clearIcon={null}
      calendarIcon={null}
      locale="en-US"
      className="custom-date-picker"
      maxDetail="year"
    />
  );
};

export default DatePicker;
