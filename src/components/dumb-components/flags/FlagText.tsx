import { height } from "@mui/system";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";

// props

type Props = {
  countryCode: string;
  country: string;
};

// styles

export const SpanFlagText = styled.div`
  margin-left: 0.5em;
`;

// component

export const FlagText = (props: Props) => {
  return (
    <>
      <ReactCountryFlag
        countryCode={props.countryCode}
        title={props.countryCode}
        svg
      />
      <SpanFlagText> {props.country}</SpanFlagText>
    </>
  );
};
