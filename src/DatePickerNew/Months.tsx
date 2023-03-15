import moment, { Moment } from "moment";
import React from "react";
import { DateValue } from "./DatePickerNew";
import {
  DatekPickerNewMonthsWrapper,
  DatePickerNewSingleMonth,
} from "./Styles";

interface MonthsProps {
  setValue: React.Dispatch<React.SetStateAction<Moment>>;
  value: Moment;
  setDateValue: React.Dispatch<React.SetStateAction<DateValue>>;
  selectionMode: string;
  setActive: React.Dispatch<
    React.SetStateAction<number | number[] | undefined | null>
  >;
  active: number | number[] | undefined | null;
}

export const Months = ({
  setValue,
  value,
  setDateValue,
  selectionMode,
  setActive,
  active,
}: MonthsProps) => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = moment().format("MMM");

  const getDateRange = (value: number, position: "start" | "end") => {
    let dateObject: Moment = moment().utc();
    if (position === "start") {
      dateObject = dateObject.month(value).startOf("month");

      return dateObject;
    }
    dateObject = dateObject.month(value).endOf("month");

    return dateObject;
  };

  const changeMonth = (monthIndex: number) => {
    if (selectionMode === "monthly") {
      setValue(value.clone().set("month", monthIndex));
      // adjust year changes
      setDateValue({
        from: getDateRange(monthIndex, "start"),
        to: getDateRange(monthIndex, "end"),
      });

      setActive(monthIndex);
      return;
    }

    // creating matrix for row and columns of months [[Jan, Feb, Mar],[Apr, May, Jun]...]
    const numRows = 4;
    const numCols = 3;
    let arr: number[][] = [];

    for (let i: number = 0; i < numRows * numCols; i += numCols) {
      arr.push(
        Array(numCols)
          .fill(0)
          .map((_, j) => i + j)
      );
    }

    let newArr: number[][] | number[] | undefined = [...arr];

    // find **selected monthIndex** is within numRow indexed array [0, 1, 2] pseudo: [Jan, Feb, Mart]
    newArr = newArr.find((i: number[]) => i.includes(monthIndex));
    setActive(newArr);

    // from a index row array get value of first month and last month pseudo: {from: Jan 1, to: Mar 31}
    if (Array.isArray(newArr)) {
      setDateValue({
        from: getDateRange(newArr?.[0], "start"),
        to: getDateRange(newArr?.[newArr?.length - 1], "end"),
      });
    }
  };

  return (
    <DatekPickerNewMonthsWrapper>
      {months.map((i, index: number) => {
        return (
          <DatePickerNewSingleMonth
            tabIndex={1}
            thisMonth={currentMonth === i}
            key={index}
            onClick={() => {
              changeMonth(index);
            }}
            active={
              Array.isArray(active) ? active.includes(index) : active === index
            }
          >
            {i}
          </DatePickerNewSingleMonth>
        );
      })}
    </DatekPickerNewMonthsWrapper>
  );
};
