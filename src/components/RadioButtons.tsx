import * as React from "react";
import { DivRadio, DivRadioWrapper } from "../CleevioApp";
import { yellow } from "@mui/material/colors";
import Radio from "@mui/material/Radio";

// props

type Props = {
  onChange: (data: string) => void;
};

export const RadioButtons = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState("yes");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    props.onChange(selectedValue);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <DivRadioWrapper>
      <DivRadio>
        Yes
        <Radio
          {...controlProps("yes")}
          sx={{
            color: yellow[800],
            "&.Mui-checked": {
              color: yellow[600],
            },
          }}
        />
      </DivRadio>
      <DivRadio>
        No
        <Radio
          {...controlProps("no")}
          sx={{
            color: yellow[800],
            "&.Mui-checked": {
              color: yellow[600],
            },
          }}
        />
      </DivRadio>
    </DivRadioWrapper>
  );
};
