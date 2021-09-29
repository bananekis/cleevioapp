export type Trip = {
  id: string;
  start_date: string;
  address: {
    city: string;
    country: string;
    zip: string;
    street_num: number;
    street: string;
  };
  covid_test_date: string;
  end_date: string;
  company_name: string;
  covid: boolean;
}[];

export type Formular = {
  start_date: string;
  end_date: string;
  company_name: string;
  address: {
    street: string;
    street_num: number;
    city: string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covid_test_date: string;
};

export type Country = {
  readonly value: string;
  readonly label: string;
};

export type LangOptions = {
  label: JSX.Element;
  value: string;
  country: string;
};

export type Errors = {
  startDateError: boolean;
  endDateError: boolean;
  companyNameError: boolean;
  streetError: boolean;
  streetNumError: boolean;
  cityError: boolean;
  countryError: boolean;
  zipError: boolean;
  covidDateError: boolean;
};
