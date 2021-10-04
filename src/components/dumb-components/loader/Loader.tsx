import loader from "../../../assets/loader.gif";
import styled from "styled-components";

// styles

const DivLoader = styled.div`
  text-align: center;
`;

// component

const Loader = () => {
  return (
    <DivLoader>
      <img src={loader} alt="loading..." />
    </DivLoader>
  );
};

export default Loader;
