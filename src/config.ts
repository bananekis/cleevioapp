import { positions, transitions } from "react-alert";

// URL config

export const url = {
  countries: "https://task-devel.cleevio-vercel.vercel.app/api/country",
  trip: "https://task-devel.cleevio-vercel.vercel.app/api/trip",
};

// Bearer token auth config

export const bearerAuth = {
  headers: {
    Authorization: "Bearer GtbcdUCZqkkjtDqlCGLB",
    Accept: "application/json",
  },
};

export const color = {
  khaki: "#f8d964",
  gold: "#fec527",
  black: "#000",
  lightBlack: "#000000a9",
  white: "#fff",
  navy: "#2b303a7d",
  deepOcean: "#282c34",
  red: "#ff0000",
};

// alert config

export const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};
