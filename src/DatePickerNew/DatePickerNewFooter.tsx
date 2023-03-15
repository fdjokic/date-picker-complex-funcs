import React from "react";
import { DatePickerNewFooterStyles, IconContainer } from "./Styles";

interface DatePickerNewFooterProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClear: () => void;
}

export const DatePickerNewFooter = ({
  setOpen,
  handleClear,
}: DatePickerNewFooterProps) => {
  return (
    <DatePickerNewFooterStyles>
      <IconContainer>
        <button onClick={() => setOpen(false)}>x</button>
      </IconContainer>
      <button onClick={handleClear}>Clear</button>
    </DatePickerNewFooterStyles>
  );
};
