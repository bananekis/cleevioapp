import { DivLoader } from "../CleevioApp";
import loader from "../assets/loader.gif";

// component

const Loader = () => {
  return (
    <DivLoader>
      <img src={loader} alt="loading..." />
    </DivLoader>
  );
};

export default Loader;
