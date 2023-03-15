import { Moment } from "moment";
import { DateValue, Modifier } from "./DatePickerNew";
import { DatePickerNewHeader } from "./DatePickerNewHeader";
import {
  CalendarStyles,
  DatePickerNewSingleDayStyles,
  DatePickerNewWeekRangeStyles,
} from "./Styles";

interface CalendarProps {
  handleChange: (params: any) => void;
  selectionMode: string;
  dayStyles: (day: Moment) => string;
  clicked: number | null;
  weekDayStarter: number;
  value: Moment;
  setLastHovered: (day: Moment) => void;
  calendar: Moment[][];
  dateModifier?: (day: Moment) => Modifier;
}

const defaultModifier = () => ({});
export const Calendar = ({
  selectionMode,
  calendar,
  dayStyles,
  handleChange,
  clicked,
  setLastHovered,
  weekDayStarter,
  value,
  dateModifier = defaultModifier,
}: CalendarProps) => {
  return (
    <CalendarStyles>
      <DatePickerNewHeader weekDayStarter={weekDayStarter} value={value} />
      {calendar.map((week, idx) => (
        /*@TODO replace index for list key */
        <DatePickerNewWeekRangeStyles key={idx}>
          {week.map((day: Moment, idx: number) => {
            return (
              <DatePickerNewSingleDayStyles
                tabIndex={1}
                onMouseOver={() => clicked === 1 && setLastHovered(day)}
                key={idx}
                className={dayStyles(day)}
                onClick={() =>
                  handleChange(selectionMode === "weekly" ? week : day)
                }
              >
                {day.format("D").toString()}
              </DatePickerNewSingleDayStyles>
            );
          })}
        </DatePickerNewWeekRangeStyles>
      ))}
    </CalendarStyles>
  );
};
