import moment from "moment";
import { useState } from "react";
import { DatePickerNew } from "./DatePickerNew/DatePickerNew";
import "./App.css";

function App() {
  const [value, setValue] = useState(moment.utc());
  // types (weekly,daily,yearly....)
  const [type, setType] = useState("daily");
  // week day starter Monday (1)
  const [weekDayStarter, setWeekDayStarter] = useState(1);
  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <select
        onChange={(e) => {
          setType(e.target.value);
          // on rerender gets def value
          setValue(moment.utc());
        }}
      >
        <option value={"daily"}>Daily</option>
        <option value={"weekly"}>Weekly</option>
        <option value={"custom-range"}>Custom range</option>
        <option value={"monthly"}>Monthly</option>
        <option value={"quarterly"}>Quarterly</option>
      </select>
      {/* set header starting date */}
      <select
        onChange={(e) => {
          setWeekDayStarter(parseInt(e.target.value));
        }}
        value={weekDayStarter}
      >
        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
        <option value={7}>Sunday</option>
      </select>
      <h1>{JSON.stringify(value)}</h1>
      <button onClick={() => setOpen(true)}>OPEN</button>

      {open && (
        <DatePickerNew
          selectionMode={type}
          dateValue={value}
          setDateValue={setValue}
          weekDayStarter={weekDayStarter}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default App;
