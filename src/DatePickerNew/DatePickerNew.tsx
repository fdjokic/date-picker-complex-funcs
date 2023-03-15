import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { DatePickerNewFooter } from "./DatePickerNewFooter";
import { Months } from "./Months";
import { DatekPickerNewHeaderStyles, DatePickerWrapper } from "./Styles";

export interface Modifier {
  disabled?: boolean;
  className?: string;
  tooltipText?: string;
}

// export type SelectionMode =
//   | "daily"
//   | "weekly"
//   | "monthly"
//   | "quarterly"
//   | "custom-range";

export type DateValue = Moment | { from: Moment; to: Moment };

export interface DatePickerNewProps {
  selectionMode: string;
  dateValue: DateValue | null;
  weekDayStarter: number;
  setDateValue: any;
  dateModifier?: (date: Moment) => Modifier;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DatePickerNew = ({
  selectionMode,
  setDateValue,
  dateValue,
  weekDayStarter,
  dateModifier,
  setOpen,
}: DatePickerNewProps) => {
  const [calendar, setCalendar] = useState<Moment[][]>([]);
  const [value, setValue] = useState<Moment>(moment().utc());
  const [lastHovered, setLastHovered] = useState<Moment | null>(null);
  const [yearHeader, setYearHeader] = useState<boolean>(false);
  const [activeMonth, setActiveMonth] = useState<
    number | number[] | undefined | null
  >(null);

  // for custom range fire onMouseOver event
  const [clicked, setClicked] = useState<number>(0);
  // adjusts unnecessary weeks added & changes week start

  // rendering calendar - loop weeks
  useEffect(() => {
    const weekType = weekDayStarter === 1 ? "isoWeek" : "week";

    const startDay = value.clone().startOf("month").startOf(weekType);

    const endDay = value.clone().endOf("month").endOf(weekType);

    const diffWeeks = endDay.diff(startDay, "weeks");

    if (diffWeeks === 3) {
      startDay.subtract(2, "week");
    } else if (diffWeeks < 5) {
      startDay.subtract(1, "week");
    }
    const arr: Moment[][] = [];
    const day = startDay.clone().subtract(1, "day");

    while (day.isBefore(endDay, "day")) {
      arr.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    setCalendar(arr);
  }, [value, weekDayStarter]);
  // end of rendering calendar

  // styling funcs
  const isSame = (day: any) => {
    return day.isSame(dateValue, "day");
  };

  const isToday = (day: any) => {
    return day.isSame(new Date(), "day");
  };

  const isBefore = (day: any) => {
    return day.isBefore(new Date(), "day");
  };
  // end of styling funcs

  // rendering styles
  const dayStyles = (day: any) => {
    if (selectionMode === "weekly" || selectionMode === "custom-range") {
      if (clicked === 1 && lastHovered && dateValue) {
        if (day <= lastHovered && day >= dateValue.from) {
          return "hovered";
        }
      }
      if (clicked === 2 && dateValue) {
        if (day <= dateValue.to && day >= dateValue.from) {
          return "selected";
        }
      }
      // colorize week days
      if (dateValue && day <= dateValue.to && day >= dateValue.from) {
        return "selected";
      }
    }
    if (selectionMode === "daily") {
      if (isSame(day)) return "selected";
    }

    if (day.weekday() === 6 || day.weekday() === 0) {
      return "weekday";
    }
    if (isBefore(day)) return "before";
    if (isToday(day)) return "today";

    return "";
  };
  // end of rendering styles

  // handleChange
  const handleChange = (params: any) => {
    switch (selectionMode) {
      case "daily":
        setDateValue(params);
        break;
      case "weekly":
        setDateValue({
          from: params[0]._d,
          to: params[params.length - 1]._d,
        });
        break;
      case "custom-range":
        setClicked((prev) => (prev += 1));
        if (!clicked) {
          // check this line
          setDateValue({ from: params });
        }
        if (clicked === 1) {
          // check if TO is set in the past
          if (dateValue && dateValue.from > params) {
            handleClear();
            return;
          }
          setDateValue((prev: DateValue) => {
            const copy = { ...prev };

            copy.to = params;
            setClicked(0);
            setLastHovered(null);
            return copy;
          });
        }
        break;

      default:
        break;
    }
  };

  const changeHeader = () => {
    if (yearHeader) return value.format("YYYY");
    return value.format("MMMM");
  };

  const handlePrevHeader = () => {
    if (yearHeader) {
      setValue(value.clone().subtract(1, "year"));
      return;
    }
    setValue(value.clone().subtract(1, "month"));
  };

  const handleNextHeader = () => {
    if (yearHeader) {
      setValue(value.clone().add(1, "year"));
      return;
    }
    setValue(value.clone().add(1, "month"));
  };

  const handleClear = () => {
    setValue(moment(Date()).utc());
    setDateValue(null);
    setActiveMonth(null);
    setYearHeader(false);
    setClicked(0);
    setLastHovered(null);
  };

  return (
    <>
      <DatePickerWrapper tabIndex={1}>
        <DatekPickerNewHeaderStyles>
          <button onClick={() => handlePrevHeader()} tabIndex={1}>
            prev
          </button>

          <button tabIndex={1} onClick={() => setYearHeader(!yearHeader)}>
            {changeHeader()}
          </button>
          <button onClick={() => handleNextHeader()} tabIndex={1}>
            next
          </button>
        </DatekPickerNewHeaderStyles>
        {!["monthly", "quarterly"].includes(selectionMode) ? (
          <Calendar
            weekDayStarter={weekDayStarter}
            value={value}
            selectionMode={selectionMode}
            calendar={calendar}
            dayStyles={dayStyles}
            handleChange={handleChange}
            clicked={clicked}
            setLastHovered={setLastHovered}
            dateModifier={dateModifier}
          />
        ) : (
          <Months
            active={activeMonth}
            setActive={setActiveMonth}
            value={value}
            setValue={setValue}
            setDateValue={setDateValue}
            selectionMode={selectionMode}
          />
        )}
        <DatePickerNewFooter setOpen={setOpen} handleClear={handleClear} />
      </DatePickerWrapper>
    </>
  );
};
