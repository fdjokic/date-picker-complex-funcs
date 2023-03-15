import styled from "styled-components";
//@TODO do weekend colors
export const DatePickerWrapper = styled.div`
  /* min-height: 322px; */
  background-color: white;
  border-radius: 5px;
  border: 1px solid purple;
  box-shadow: 0 7px 16px -5px rgba(132, 132, 132, 0.35);
  display: flex;
  flex-direction: column;
  height: 322px;
  width: 254px;

  .day {
    align-items: center;
    background-color: white;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    font-size: 14px;
    height: 26px;
    justify-content: center;
    margin: 0;
    position: relative;
    width: 26px;
    z-index: 1;
  }
  .weekday {
    color: green;
  }
  .selected {
    background-color: purple;
    color: white;
  }
  .before {
    color: gray;
  }
  .today {
    color: blue;
    position: relative;
    ::after {
      background: black;
      border-radius: 100%;
      bottom: 0;
      content: "";
      height: 4px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 4px;
    }
  }

  .hovered {
    background-color: orange;
    color: white;
    font-weight: 600;
  }
  :hover {
  }
`;
export const DatekPickerNewHeaderStyles = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 12px;
  width: 90%;
`;
export const DatePickerNewWeekDaysStyles = styled.div`
  color: var(--color-theme-600);
  display: flex;
  font-size: 12px;
  font-weight: 500;
  gap: 4px;

  div {
    align-items: center;
    display: flex;
    height: 26px;
    justify-content: center;
    width: 26px;
  }
`;
export const DatePickerNewWeekRangeStyles = styled.div`
  display: flex;
  gap: 4px;
`;
export const DatePickerNewSingleDayStyles = styled.div<{ $disabled?: boolean }>`
  align-items: center;
  background-color: transparent;
  background-color: white;
  border-radius: 50%;
  box-sizing: border-box;
  color: var(--color-theme-900);
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  height: 26px;
  justify-content: center;
  margin: 0;
  width: 26px;
  z-index: 1;
`;
export const DatePickerNewFooterStyles = styled.div`
  align-items: center;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid var(--border-primary);
  display: flex;
  flex: 1 0;
  justify-content: space-between;
  overflow: hidden;
  padding: 16px;
`;
export const DatekPickerNewMonthsWrapper = styled.div`
  color: var(--color-theme-100);
  column-gap: 26px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px 0 16px 0;
  row-gap: 4px;
`;

interface DatePickerNewSingleMonthProps {
  active?: boolean;
  thisMonth: boolean;
}

export const DatePickerNewSingleMonth = styled.div<DatePickerNewSingleMonthProps>`
  align-items: center;
  background-color: ${(props: any) =>
    props.active ? "purple" : "transparent"};
  border-radius: 50%;
  color: ${(props: any) =>
    !props.active && props.thisMonth
      ? "green"
      : props.active
      ? "orange"
      : "black"};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  height: 48px;
  justify-content: center;
  width: 48px;
  &:hover {
    background-color: var(--color-primary-200);
    color: var(--color-theme-900);
  }
`;

export const IconContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

export const CalendarStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  margin: 0 auto;
  padding: 16px 24px 16px 16px;
`;
