import { Button } from "../../../main-app/CleevioApp";
import { Country, Errors, Formular, LangOptions } from "../../../types";
import { DatePicker } from "./DatePicker";
import { OnDateChangeProps } from "@datepicker-react/styled";
import { RadioButtons } from "./RadioButtons";
import { ReactComponent as TickSVG } from "../../../assets/tick.svg";
import { bearerAuth, color, url } from "../../../config";
import { formatDate } from "../../../functions/formatDate";
import { handleError } from "../../../functions/handleErrors";
import { useAlert } from "react-alert";
import { validate } from "../../../functions/validateForm";
import React, { useState } from "react";
import SelectBox from "./SelectBox";
import axios from "axios";
import styled from "styled-components";

// styles

const DivInfo = styled.div`
  padding: 20px;
  background-color: ${color.ghostWhite};
  width: 50%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 1024px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;

const DivCovid = styled(DivInfo)`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;
`;

const DivButton = styled(DivCovid)`
  background: none;
`;

const DivDate = styled(DivInfo)`
  margin-bottom: 2em;
`;

const DivSelectBox = styled(DivDate)``;

const DivForm = styled.div`
  margin: 0 auto 1em auto;
  width: 100%;

  & > div {
    width: 95%;
    margin: 0 auto;
  }
  & > div > label > div {
    top: 12px;
    left: 10px;
  }
  & > div > label > div + input {
    @media (max-width: 768px) {
      margin-left: 1em;
    }
  }
  & > div > label + div {
    z-index: 99;
  }
`;

const I = styled.i`
  color: ${color.red};
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 90%;
  transition: all 0.2s ease-in-out;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-input-placeholder {
    font-size: 15px;
  }
  &:-ms-input-placeholder {
    font-size: 15px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1em;
  text-align: left;
`;

const LabelCovid = styled(Label)`
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

export const SpanSVG = styled.span`
  line-height: 0;
`;

export const SpanTextButton = styled.span`
  padding-left: 5px;
`;

const Strong = styled.strong`
  color: ${color.black};
`;

// props

type Props = {
  readonly onCreate: () => void;
};

// state

const initialState = {
  start_date: "",
  end_date: "",
  company_name: "",
  address: {
    street: "",
    street_num: 0,
    city: "",
    country: "",
    zip: "",
  },
  covid: false,
  covid_test_date: "",
};

// error state

const errorState = {
  startDateError: false,
  endDateError: false,
  companyNameError: false,
  streetError: false,
  streetNumError: false,
  cityError: false,
  countryError: false,
  zipError: false,
  covidDateError: false,
};

// component

const CleevioForm = (props: Props) => {
  const [form, setForm] = useState<Formular>(initialState);
  const [errors, setErrors] = useState<Errors>(errorState);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [covidDate, setCovidDate] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<LangOptions | null>(
    null
  );
  const alert = useAlert();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled === true) return;

    setErrors(errorState);

    const isValid = validate(form, setErrors);

    if (isValid) {
      setDisabled(true);
      const sendForm = () => {
        axios
          .post(url.trip, form, bearerAuth)
          .then(() => {
            alert.success("Saved!");
            setForm(initialState);
            setStartDate(null);
            setEndDate(null);
            setCovidDate(null);
            setSelectedOption(null);
            setDisabled(false);
            props.onCreate();
          })
          .catch((err) => handleError(err, alert));
      };

      sendForm();
      setErrors(errorState);
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   *  handle select box
   */

  const selectBoxOnChange = (data: Country) => {
    setForm((p) => ({
      ...p,
      address: {
        ...p.address,
        country: data.value,
      },
    }));
  };

  const handleOption = (data: LangOptions) => {
    setSelectedOption({
      label: data.label,
      value: data.value,
      country: "",
    });
  };

  /**
   *  handle start date picker
   */

  const startDateOnChange = (data: OnDateChangeProps) => {
    const formattedInputDate: string = formatDate(data);

    setStartDate(data.date);
    setForm((p) => ({ ...p, start_date: formattedInputDate }));
  };

  /**
   *  handle end date picker
   */

  const endDateOnChange = (data: OnDateChangeProps) => {
    const formattedInputDate = formatDate(data);

    setEndDate(data.date);
    setForm((p) => ({ ...p, end_date: formattedInputDate }));
  };

  /**
   *  handle covid date picker
   */

  const covidDateOnChange = (data: OnDateChangeProps) => {
    const formattedInputDate = formatDate(data);

    setCovidDate(data.date);
    setForm((p) => ({ ...p, covid_test_date: formattedInputDate }));
  };

  /**
   *  handle radio button
   */

  const radioOnChange = (data: string) => {
    let covid = false;
    if (data !== "yes") covid = true;
    setForm((p) => ({ ...p, covid }));
  };

  /**
   *  handle text input
   */

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "company":
        setForm((p) => ({
          ...p,
          company_name: e.target.value,
        }));
        break;
      case "city":
        setForm((p) => ({
          ...p,
          address: { ...p.address, city: e.target.value },
        }));
        break;
      case "street":
        setForm((p) => ({
          ...p,
          address: { ...p.address, street: e.target.value },
        }));
        break;
      case "street-number":
        setForm((p) => ({
          ...p,
          address: { ...p.address, street_num: +e.target.value },
        }));
        break;
      case "zip":
        setForm((p) => ({
          ...p,
          address: { ...p.address, zip: e.target.value },
        }));
        break;
    }
  };

  // render red outline on error

  const startBorder: string =
    errors.startDateError !== false ? "2px solid red" : "none";
  const endBorder: string =
    errors.endDateError !== false ? "2px solid red" : "none";
  const covidBorder: string =
    errors.covidDateError !== false ? "2px solid red" : "none";
  const selectBorder: string =
    errors.countryError !== false ? "2px solid red" : "none";

  // view

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DivSelectBox>
          <DivForm>
            <Label htmlFor="country">
              Where do you want to go?{" "}
              {errors.countryError !== false ? <I>required</I> : ""}
            </Label>
            <SelectBox
              onChange={selectBoxOnChange}
              value={selectedOption}
              option={handleOption}
              border={selectBorder}
            />
          </DivForm>
        </DivSelectBox>
        <DivDate>
          <DivForm>
            <Label htmlFor="start">
              Start date{" "}
              {errors.startDateError !== false ? <I>required</I> : ""}
            </Label>
            <DatePicker
              onChange={startDateOnChange}
              date={startDate}
              border={startBorder}
            />
          </DivForm>
          <DivForm>
            <Label htmlFor="end">
              End date {errors.endDateError !== false ? <I>required</I> : ""}
            </Label>
            <DatePicker
              onChange={endDateOnChange}
              date={endDate}
              border={endBorder}
            />
          </DivForm>
        </DivDate>
        <DivInfo>
          <DivForm>
            <Label htmlFor="company">
              Company name{" "}
              {errors.companyNameError !== false ? <I>required</I> : ""}
            </Label>
            <Input
              id="company"
              type="text"
              value={form.company_name}
              placeholder="Type here..."
              onChange={handleTextInput}
              style={
                errors.companyNameError !== false
                  ? { border: "2px solid red" }
                  : { border: "" }
              }
            />
          </DivForm>
          <DivForm>
            <Label htmlFor="city">
              City {errors.cityError !== false ? <I>required</I> : ""}
            </Label>
            <Input
              id="city"
              type="text"
              value={form.address.city}
              placeholder="Type here..."
              onChange={handleTextInput}
              style={
                errors.cityError !== false
                  ? { border: "2px solid red" }
                  : { border: "" }
              }
            />
          </DivForm>
          <DivForm>
            <Label htmlFor="street">
              Street {errors.streetError !== false ? <I>required</I> : ""}
            </Label>
            <Input
              id="street"
              type="text"
              value={form.address.street}
              placeholder="Type here..."
              onChange={handleTextInput}
              style={
                errors.streetError !== false
                  ? { border: "2px solid red" }
                  : { border: "" }
              }
            />
          </DivForm>
          <DivForm>
            <Label htmlFor="street-number">
              Street number{" "}
              {errors.streetNumError !== false ? <I>required</I> : ""}
            </Label>
            <Input
              id="street-number"
              type="number"
              value={
                form.address.street_num !== 0 ? form.address.street_num : ""
              }
              placeholder="Type here..."
              onChange={handleTextInput}
              style={
                errors.streetNumError !== false
                  ? { border: "2px solid red" }
                  : { border: "" }
              }
            />
          </DivForm>
          <DivForm>
            <Label htmlFor="zip">
              Zip code {errors.zipError !== false ? <I>required</I> : ""}
            </Label>
            <Input
              id="zip"
              type="text"
              value={form.address.zip}
              placeholder="Type here..."
              onChange={handleTextInput}
              style={
                errors.zipError !== false
                  ? { border: "2px solid red" }
                  : { border: "" }
              }
            />
          </DivForm>
        </DivInfo>
        <DivCovid>
          <LabelCovid>
            Have you been recently tested for <Strong>COVID-19</Strong>?
          </LabelCovid>
          <RadioButtons onChange={radioOnChange} />
        </DivCovid>
        {form.covid === true ? (
          <DivDate>
            <DivForm>
              <Label>
                Date of receiving test results{" "}
                {errors.covidDateError !== false ? <I>required</I> : ""}
              </Label>

              <DatePicker
                onChange={covidDateOnChange}
                date={covidDate}
                border={covidBorder}
              />
            </DivForm>
          </DivDate>
        ) : (
          ""
        )}

        <DivButton>
          <Button type="submit">
            <SpanTextButton>Save</SpanTextButton>
            <SpanSVG>
              <TickSVG />
            </SpanSVG>
          </Button>
        </DivButton>
      </form>
    </>
  );
};

export default CleevioForm;
