import { positions, transitions } from "react-alert";

// URL config

export const url = {
  countries: `${process.env.REACT_APP_URL_COUNTRIES}`,
  trip: `${process.env.REACT_APP_URL_TRIP}`,
};

// Bearer token auth config

export const bearerAuth = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
    Accept: "application/json",
  },
};

export const color = {
  khaki: "#f8d964",
  gold: "#fec527",
  black: "#000",
  lightBlack: "#97999B",
  white: "#fff",
  navy: "#2b303a7d",
  deepOcean: "#282c34",
  red: "#ff0000",
  ghostWhite: "#f9f9fa",
};

// alert config

export const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};
