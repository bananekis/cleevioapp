import { SpanFlagText } from "../CleevioApp";
import ReactCountryFlag from "react-country-flag";

// props
type Props = {
  countryCode: string;
  country: string;
};

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
