import { Country, LangOptions } from "../../../types";
import { FancyPlaceholder } from "../../dumb-components/flags/FancyPlaceholder";
import { FlagText } from "../../dumb-components/flags/FlagText";
import { bearerAuth, color, url } from "../../../config";
import { customTheme } from "../../../functions/customTheme";
import { handleError } from "../../../functions/handleErrors";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import styled from "styled-components";
import styles from "react-select";

// styles

const DivFlagText = styled.div`
  display: flex;
  align-items: center;
`;
export const DivFlagBiggerText = styled(DivFlagText)`
  font-size: 22px;
`;
export const DivFlagBiggerTextTable = styled(DivFlagBiggerText)`
  margin-right: 1.5em;
  font-size: 18px;
  font-weight: 600;
  align-items: flex-start;

  & > img {
    font-size: 50px;
  }
`;
const DivSelect = styled.div`
  color: ${color.black};
  width: 95%;
  margin: 0 auto;
  text-align: left;
`;

// props

type Props = {
  onChange: (newValue: Country) => void;
  option: (data: LangOptions) => void;
  value: LangOptions | null;
  border: string;
};

// component

const SelectBox = (props: Props) => {
  const [options, setOptions] = useState<readonly Country[]>([]);
  const alert = useAlert();

  useEffect(() => {
    const fetchCountries = () => {
      axios
        .get(url.countries, bearerAuth)
        .then((res) => {
          setOptions(res.data);
        })
        .catch((err) => handleError(err, alert));
    };

    fetchCountries();
  }, []);

  const langOptions = options.map((object) => {
    return {
      ...object,
      label: (
        <DivFlagText>
          <FlagText countryCode={object.value} country={object.label} />
        </DivFlagText>
      ),
      country: object.label,
    };
  });

  return (
    <DivSelect>
      <Select
        options={langOptions}
        theme={customTheme}
        placeholder={<FancyPlaceholder />}
        isSearchable
        onChange={(data: LangOptions | null) => {
          if (!data) {
            return;
          }
          const selectedValue = {
            value: data.value,
            label: data.label,
            country: "",
          };

          props.onChange({ value: data.value, label: data.country });
          props.option(selectedValue);
        }}
        value={props.value}
        styles={{
          ...styles,
          control: (base) => ({
            ...base,
            border: `${props.border}`,
          }),
        }}
      />
    </DivSelect>
  );
};

export default SelectBox;
