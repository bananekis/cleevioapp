import * as React from "react";
import { color } from "../../../config";

import { blueGrey } from "@mui/material/colors";

import Radio from "@mui/material/Radio";
import styled from "styled-components";

// styles

const DivRadio = styled.div`
  width: 10%;
  padding: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: ${color.white};
  &:not(:last-child) {
    margin-right: 1em;
  }

  @media (max-width: 768px) {
    width: 15%;
  }

  @media (max-width: 480px) {
    width: 18%;
  }
`;
const DivRadioWrapper = styled.div`
  display: flex;
  margin-left: 2%;
`;

// props

type Props = {
  onChange: (data: string) => void;
};

// component

export const RadioButtons = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState("no");

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
            color: blueGrey[900],
            "&.Mui-checked": {
              color: blueGrey[900],
            },
          }}
        />
      </DivRadio>
      <DivRadio>
        No
        <Radio
          {...controlProps("no")}
          sx={{
            color: blueGrey[900],
            "&.Mui-checked": {
              color: blueGrey[900],
            },
          }}
        />
      </DivRadio>
    </DivRadioWrapper>
  );
};
