import { Errors, Formular } from "../types";

/**
 *  validate form
 */

export const validate = (
  form: Formular,
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  if (form.address.country === "") {
    setErrors((p) => ({ ...p, countryError: true }));
    return false;
  } else if (form.start_date === "") {
    setErrors((p) => ({ ...p, startDateError: true }));
    return false;
  } else if (form.end_date === "") {
    setErrors((p) => ({ ...p, endDateError: true }));
    return false;
  } else if (form.company_name === "") {
    setErrors((p) => ({ ...p, companyNameError: true }));
    return false;
  } else if (form.address.city === "") {
    setErrors((p) => ({ ...p, cityError: true }));
    return false;
  } else if (form.address.street === "") {
    setErrors((p) => ({ ...p, streetError: true }));
    return false;
  } else if (form.address.street_num === 0) {
    setErrors((p) => ({ ...p, streetNumError: true }));
    return false;
  } else if (form.address.zip === "") {
    setErrors((p) => ({ ...p, zipError: true }));
    return false;
  } else if (form.covid_test_date === "") {
    setErrors((p) => ({ ...p, covidDateError: true }));
    return false;
  }

  return true;
};
