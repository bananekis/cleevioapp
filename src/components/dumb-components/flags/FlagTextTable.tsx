import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";

import { SpanFlagText } from "./FlagText";

// props

type Props = {
  countryCode: string;
  country: string;
  company: string;
};

//styles

const SpanFlagTextComp = styled.span`
  font-weight: 400;
  margin-left: 0.5em;
`;

// component

export const FlagTextTable = (props: Props) => {
  return (
    <>
      <ReactCountryFlag
        countryCode={props.countryCode}
        title={props.countryCode}
        style={{
          borderRadius: "50%",
        }}
        svg
      />
      <div>
        <SpanFlagText> {props.country}</SpanFlagText>
        <SpanFlagTextComp> {props.company}</SpanFlagTextComp>
      </div>
    </>
  );
};
