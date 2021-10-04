import styled from "styled-components";

// styles

const SpanFancy = styled.span`
  font-family: system-ui, -apple-system;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  font-size: 15px;
`;

// component

export const FancyPlaceholder = () => {
  return (
    <>
      <span className="fa fa-globe"></span>{" "}
      <SpanFancy>Select country</SpanFancy>
    </>
  );
};
