import { DateSingleInput } from "@datepicker-react/styled";
import { OnDateChangeProps } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";
import { color } from "../config";
import { useReducer } from "react";
import moment from "moment";

// props

type Props = {
  date: Date | null;
  onChange: (data: OnDateChangeProps) => void;
  border: string;
};

const initialState = {
  showDatepicker: false,
};

// component

export const DatePicker = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeProvider
      theme={{
        breakpoints: ["32em", "48em", "64em"],
        reactDatepicker: {
          daySize: [36, 40],
          fontFamily: "system-ui, -apple-system",
          colors: {
            accessibility: `${color.gold}`,
            selectedDay: `${color.gold}`,
            selectedDayHover: `${color.gold}`,
            primaryColor: `${color.gold}`,
          },
          inputPadding: "5px",
          inputWidth: "90%",
          inputLabelBorderRadius: "5px",
          inputCalendarIconColor: `${color.black}`,
          inputPlaceholderFontWeight: "400",
          inputMinHeight: "37px",
          inputCalendarIconWidth: "13px",
          inputCalendarIconHeight: "13px",
          inputFontSize: "15px",
          dayHoverColor: `${color.white}`,
          dayHoverBackground: `${color.deepOcean}`,
          inputLabelBorder: `${props.border}`,
        },
      }}
    >
      <DateSingleInput
        onDateChange={(data) => {
          props.onChange(data);
        }}
        onFocusChange={(focusedInput) => {
          dispatch({ type: "focusChange", payload: focusedInput });
        }}
        date={props.date}
        showDatepicker={state.showDatepicker}
        displayFormat="yyyy-MM-dd"
        minBookingDate={moment().toDate()}
      />
    </ThemeProvider>
  );
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "focusChange":
      return { ...state, showDatepicker: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}
