import React from "react";
import { DatePickerNewWeekDaysStyles } from "./Styles";

interface DatePickerNewHeaderProps {
  weekDayStarter: number;
  value: any;
}

export const DatePickerNewHeader = ({
  weekDayStarter,
  value,
}: DatePickerNewHeaderProps) => {
  // header day names change
  const arrangeDayNames = (weekDayStarter: number) => {
    const dayNames = [...value._locale._weekdaysShort];
    let newDayNames = [...dayNames];
    newDayNames = newDayNames.splice(weekDayStarter).concat(dayNames);

    const uniqueArr = newDayNames.filter(
      (item, index) => newDayNames.indexOf(item) === index
    );

    return uniqueArr;
  };

  return (
    <>
      <DatePickerNewWeekDaysStyles>
        {arrangeDayNames(weekDayStarter)?.map((day, idx) => (
          <div key={idx}>{day[0]}</div>
        ))}
      </DatePickerNewWeekDaysStyles>
    </>
  );
};
